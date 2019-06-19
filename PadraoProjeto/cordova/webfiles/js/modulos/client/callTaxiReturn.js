Route.waitView().then(function () {

    const userLogged = Session.get("user");

    const minMaxSearchTaxi = 60 * 5;

    const mapService = new MapService();

    const tripPaymentFormController = new TripPaymentFormController();
    const searchTripProgress = new Progress();
    const customerController = new CustomerController();

    const socketTrip = new WebSocket(keyTrip);

    socketTrip.setChannel(channelTrip);

    const trip = {
        origin: null,
        destination: null,
    };

    getZones();

    updateLocation();

    const elementProperty = new ElementProperty();

    function initLoadMap() {
        const position = Session.get("location");

        if (position.length === 0) {
            setTimeout(initLoadMap, 3000);
            return;
        }

        initMap(position);
    }

    function initMap(position) {
        mapService.initMap("mapaClient", position, function () {
            elementProperty.getElement("#preload-return", element => {
                element.style.display = "none";
            });
            initEvents();
        });
    }

    function getAddressCurrent(address) {
        elementProperty.getElement("#origin", element => element.value = address.formatted_address);
    }

    function initEvents() {

        elementProperty.getElement(".search-address-location", element => {
            mapService.addSearchInInput(element, localSelected)
        });

        elementProperty.addEventInElement(".clear-input", "onclick", clearFieldAddress);
        elementProperty.addEventInElement(".search-address-location", "oninput", verifyFieldAddress);
        elementProperty.addEventInElement(".search-address-location", "onfocus", showPanelHistoryTrip);
        elementProperty.addEventInElement(".btn-call-trip", "onclick", toggleCallOrCancel);
        elementProperty.addEventInElement(".payment-trip", "onclick", openPaymentForm);
        elementProperty.addEventInElement(".close-payment-form", "onclick", closePaymentForm);
        elementProperty.addEventInElement(".option-trip", "onclick", toogleOptionMenu);
        elementProperty.addEventInElement(".btn-search-trip", "onclick", function () {
            initNewTrip();
        });
        elementProperty.addEventInElement("#cancelTrip", "onclick", cancelSearchTrip);
        elementProperty.addEventInElement(".chat-client", "onclick", function(){
            openChat(managerTrip.tripCurrent)
        });
        elementProperty.addEventInElement(".phone-client", "onclick", function(){
            callDriver(managerTrip.tripCurrent)
        });
        elementProperty.addEventInElement("#cancelTrip", "onclick", function () {
            SwalCustom.dialogConfirm("Atenção", "Deseja cancelar a corrida ?", "warning")
                .then(cancelSearchTrip);
        });
        elementProperty.addEventInElement("#chatClient", "onclick", openChat);
        elementProperty.addEventInElement("#zoomInRoute", "onclick", function () {
            mapService.focusInRoute();
        });

        getPaymentForm();
    }

    window.initNewTrip = function(travelAgain = false) {
        const newTrip = (!travelAgain) ? {
            userId: parseInt(userLogged.idUser),
            tripTypeId: managerTrip.typeTaxi.tripTypeId,
            tripPaymentFormId: managerTrip.paymentFormIdSelected,
            origin: {
                address: document.getElementById("origin").value,
                latitude: trip.origin.lat,
                longitude: trip.origin.lng
            },
            destination: {
                address: document.getElementById("destination").value,
                latitude: trip.destination.lat,
                longitude: trip.destination.lng
            },
            price: managerTrip.typeTaxi.price
        } : travelAgain;

        Session.set("lastTrip", newTrip);

        preload(true);

        initTrip(newTrip).then(({message, status, data}) => {
            preload(false);
            if (!status) {
                SwalCustom.messageDialog(message, "Atenção", undefined, "warning");
                return;
            }

            Session.set("tripReference",data.tripReference);
            Session.set("dateInitTrip", DateCustom.getNow());

            observerTrip(data);

            initSearchTrip(data);
        }).catch((error) => {
            preload(false);
            if (error) {
                SwalCustom.dialogConfirm("Ocorreu um error ao tentar inicia busca de viagem",
                    "tentar novamente ?"
                    , "warning").then(function () {
                    initNewTrip()
                });
                return;
            }

            SwalCustom.messageDialog("", "Sem conexão com internet");
        });
    };

    function clearFieldAddress() {
        trip[this.getAttribute("for")] = null;

        elementProperty.getElement("#" + this.getAttribute("for"),
            element => {
                const pathTrip = element.getAttribute("id");

                element.value = "";
                element.focus();

                trip[pathTrip] = null;

                switch (pathTrip) {
                    case "origin" : {
                        mapService.removePointClient();
                        break;
                    }
                    case "destination" : {
                        mapService.removePointDestination();
                        break;
                    }
                }
            });
    }

    function verifyFieldAddress() {
        if (this.value.length === 0) {
            showPanelHistoryTrip();
            return;
        }

        removePanelHistoryTrip();
    }

    function showPanelHistoryTrip() {
        elementProperty.getElement(".history-trips", element => {
            //element.classList.add("active");
        })
    }

    function removePanelHistoryTrip() {
        elementProperty.getElement(".history-trips", element => {
            element.classList.remove("active");
        })
    }

    function toggleCallOrCancel() {

        initCloseTrip();

        this.classList.add("active");

        elementProperty.getElement("#callRunning", element => {

            if (element.classList.contains("active")) {
                element.classList.remove("active");
                return;
            }

            localCurrent();

            element.classList.add("active");
        })
    }

    function localCurrent() {

        trip.origin = Session.get("location");

        mapService.addPointClient(trip.origin);

        mapService.getAddressByLatLng(trip.origin).then(getAddressCurrent);

    }

    function localSelected(place, input) {
        getPoint(place, input.getAttribute("id"));
    }

    function getPoint(place, pathTrip) {
        const position = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        trip[pathTrip] = position;

        switch (pathTrip) {
            case "origin" : {
                mapService.addPointClient(position);
                break;
            }
            case "destination" : {
                mapService.addPointDestination(position);
                break;
            }
        }

        if (trip.destination !== null && trip.origin !== null) {
            Keyboard.hide();

            removePanelHistoryTrip();

            document.getElementById("origin").disabled = true;
            document.getElementById("destination").disabled = true;

            managerTrip.paymentFormIdSelected = showPaymentForm();

            showPriceTrip(trip.origin, trip.destination).then(getPaymentFormDefault);
        }
    }

    function getPaymentFormDefault(data) {
        data.prices.map(object => {
            if (object.tripTypeId === TYPE_RETURN_ID) {
                managerTrip.typeTaxi.tripTypeId = object.tripTypeId;
                managerTrip.typeTaxi.price = object.price;
                managerTrip.typeTaxi.priceName = object.priceName;
            }
        });

        managerTrip.prices = data.prices;

        elementProperty.addEventInElement(".trip-type", "onclick", getTaxiType);

        showRoute();
    }

    function showRoute() {
        initCloseTrip();

        elementProperty.getElement(".container-logo", element => {
            element.classList.add("remove");
        });
        elementProperty.getElement(".map-client", element => {
            element.classList.add("active");
        });
        elementProperty.getElement(".btn-cancel-processing-trip", element => {
            element.classList.add("active");
        });
        elementProperty.getElement(".footer-container-trip", element => {
            element.classList.add("active");
        });

        mapService.showRoute(trip.origin, trip.destination).then((route) => {
            mapService.addLegends(route).then(() => {
                elementProperty.addEventInElement(".container-destination", "onclick", changeDestination);
                elementProperty.addEventInElement(".container-origin", "onclick", changeOrigin);
            });
        });
    }

    function initCloseTrip() {
        elementProperty.addEventInElement(".menu-close", "onclick", initProcessingCallTrip);

        elementProperty.getElement(".menu-close", element => {
            element.classList.add("open");
        });
    }

    function getTaxiType() {
        const object = JSON.parse(this.getAttribute("value"));

        managerTrip.typeTaxi.price = parseFloat(object.price);
        managerTrip.typeTaxi.tripTypeId = parseFloat(object.tripTypeId);

        elementProperty.getElement(".trip-type", element => element.classList.remove("active"));

        this.classList.add("active");
    }

    function initProcessingCallTrip() {
        hiddenNotificationInBackground();

        elementProperty.removeClass(".history-trips", "active");
        elementProperty.removeClass(".container-logo", "active");
        elementProperty.removeClass(".footer-payment-form", "active");
        elementProperty.removeClass(".footer-container-trip", "active");
        elementProperty.removeClass(".map-client", "active", "in-trip");
        elementProperty.removeClass(".btn-cancel-processing-trip", "active");
        elementProperty.removeClass(".container-logo", "active");
        elementProperty.removeClass(".btn-call-trip", "active");
        elementProperty.removeClass(".trip-client", "active");

        document.getElementById("origin").disabled = false;
        document.getElementById("destination").disabled = false;

        mapService.removeDetalheMap();

        elementProperty.getElement(".search-address-location", element => {
            element.value = "";
            trip[element.getAttribute("id")] = null;
        });

        managerTrip.typeTaxi.price = null;
        managerTrip.typeTaxi.tripTypeId = null;
        managerTrip.inTrip = false;

        activeMenu();
    }

    function activeMenu() {
        elementProperty.getElement(".menu-close", element => {
            element.classList.remove("open");

            element.onclick = function () {
                if (this.classList.contains("open")) {
                    this.classList.remove("open");
                    showMenu(false);
                    return;
                }

                showMenu();
                this.classList.add("open");
            };

            function showMenu(result = true) {
                elementProperty.getElement(".container-menu-options", element => {
                    if (result) {
                        element.classList.add("active");
                        return;
                    }
                    element.classList.remove("active");
                });
            }

        });
    }

    function enableInputAddress() {
        elementProperty.getElement("#destination", element => element.disabled = false);
        elementProperty.getElement("#origin", element => element.disabled = false);
    }

    function changeOrigin() {
        enableInputAddress();
        backInfoDestination();
        mapService.removePointClient();
        elementProperty.getElement("#origin", element => {
            trip.origin = null;
            element.value = "";
            element.focus();
        })
    }

    function changeDestination() {
        enableInputAddress();
        backInfoDestination();
        mapService.removePointDestination();
        elementProperty.getElement("#destination", element => {
            trip.destination = null;
            element.value = "";
            element.focus();
        })
    }

    function backInfoDestination() {
        elementProperty.getElement("#callRunning", element => {
            element.setAttribute("class", "container-logo active");
        });
        elementProperty.getElement(".footer-container-trip", element => {
            element.classList.remove("active");
        });
        elementProperty.getElement(".map-client", element => {
            element.classList.remove("active");
        });
        elementProperty.getElement(".footer-payment-form", element =>
            element.classList.remove("active"));
        initCloseTrip();
        mapService.removeOnlyRoute();
    }


    function getPaymentForm() {
        tripPaymentFormController.getAll().then(({status, data}) => {
            if (!status)
                return;

            elementProperty.getElement(".list-payment-forms", element => {
                element.innerHTML = data.map(payment => {
                    return `<li class="payment-form-trip" 
                            value="${payment.idTripPaymentForm}" 
                            payment='${JSON.stringify(payment)}'>
                        <i class="fa fa-money"></i>
                        <p>${payment.name}</p>
                     </li>`;
                }).join("");

                elementProperty.addEventInElement(".payment-form-trip", "onclick", function () {
                    managerTrip.paymentFormIdSelected = getPaymentFormSelect(this);
                })
            });
        }).catch(getPaymentForm);
    }

    const managerTrip = {
        zones: null,
        paymentFormIdSelected: null,
        typeTaxi: {
            tripTypeId: null,
            price: null
        },
        tripCurrent: null,
        timeOut: null,
        inTrip: false,
        prices: []
    };

    function getZones() {
        ZoneController.getAll().then(function ({status, data}) {
            if (!status)
                return;
            managerTrip.zones = data;
            getUpdateTrip();
            verifyTrip();
            mapService.importScriptWithPlaces().then(initLoadMap);
        }).catch(function () {

            SwalCustom.messageDialog("", "Sem conexão com internet", getZones)
        });
    }


    function initSearchTrip(data) {
        managerTrip.tripCurrent = data;

        activeMenu();

        elementProperty.getElement(".preloader-search-trip", element => {
            element.classList.add("active");
        });

        elementProperty.getElement(".time-search-trip", element => {
            element.innerHTML = "00:00";
        });

        elementProperty.getElement(".car-return", element => {
            element.src = `${HOST}webfiles/img/logo/return-${data.tripTypeId}-d.png`
        });


        let zoneCurrent = managerTrip.zones[0];

        if (Session.get("dateInitTrip").length === 0)
            Session.set("dateInitTrip", DateCustom.getNow());

        searchTripProgress.progressUndefined(time => {
            elementProperty.getElement(".time-search-trip", element => {
                element.innerHTML = time.timeSpent;
            });

            if (parseInt(time.seconds) >= minMaxSearchTaxi) {
                selectAnotherTypeDriver(managerTrip, userLogged).then(()=>{
                    initProcessingCallTrip();
                });
                searchTripProgress.stopProgress();
                return;
            }

            zoneCurrent = increaseZone(time, zoneCurrent);
        }, Session.get("dateInitTrip"));

        initEventSearch();
    }



    function observerTrip(trip) {
        socketTrip.stopWebSocket(trip.tripReference);
        socketTrip.observerSocket(trip.tripReference, function ({trip}) {

            if (trip.status === STATUS_ACCEPTED) {
                managerTrip.inTrip = true;
                initRace(trip);
                mapService.focusInRoute();
                return;
            }
            if (trip.status === STATUS_BOARDING) {
                InfoTrip.showArrivalDriver();
                managerTrip.inTrip = true;
                mapService.focusInRoute();
                return;
            }
            if (trip.status === STATUS_IN_PROGRESS) {
                InfoTrip.closeArrivalDriver();
                managerTrip.inTrip = true;
                mapService.directionsDisplayDriver.setOptions({
                    suppressMarkers: false,
                    preserveViewport: false
                });
                return;
            }

            Session.delete("tripReference");

            if (trip.status === STATUS_FINISHED) {
                finishTrip(trip);
                managerTrip.inTrip = false;
                initProcessingCallTrip();
                return;
            }
            if (trip.status === STATUS_CANCELED) {
                clearTimeout(managerTrip.timeOut);
                managerTrip.timeOut = null;
                initProcessingCallTrip();
                if (trip.canceledBy !== "customer")
                    SwalCustom.messageDialog("Viagem cancelada", "Atenção", undefined, "warning");
            }
        });
    }

    function increaseZone(time, zoneCurrent) {
        let zoneSelect = null;

        for (const index in managerTrip.zones) {
            const zone = managerTrip.zones[index];
            if (parseInt(zone.time) <= parseInt(time.seconds)) {
                zoneSelect = zone;
            }
        }

        if (zoneCurrent !== zoneSelect) {
            zoneCurrent = zoneSelect;
            TripController.increaseArea(managerTrip.tripCurrent.tripReference, zoneCurrent.idZone, () => {
            });
        }
        return zoneCurrent;
    }

    function initEventSearch() {
        elementProperty.addEventInElement(".cancel-search-trip", "onclick", cancelSearchTrip);
    }

    function cancelSearchTrip() {
        preload(true);

        customerController.actionCancel(managerTrip.tripCurrent.tripReference, userLogged.idUser, DateCustom.getNow())
            .then(function ({status, data}) {
                preload(false);
                if (!status) {
                    SwalCustom.messageDialog("Ocorreu um erro ao tentar cancelar viagem", "Atenção", undefined, "warning");
                    return;
                }
                stopProgressTrip();
            }).catch(() => {
            preload(false);
            SwalCustom.messageDialog("Ocorreu um erro ao tentar cancelar viagem", "Atenção", undefined, "warning");
        });
    }

    function stopProgressTrip() {
        searchTripProgress.stopProgress();
        elementProperty.getElement(".preloader-search-trip", element => {
            element.classList.remove("active");
        });
        managerTrip.tripCurrent = null;
    }

    function initRace(trip) {
        stopProgressTrip();

        managerTrip.tripCurrent = trip;

        elementProperty.getElement(".info-trip", element => {
            if (trip.status !== STATUS_ACCEPTED) {
                element.style.display = "none";
                return;
            }
            element.style.display = "flex";
        });

        elementProperty.getElement(".footer-container-trip", element => {
            element.classList.remove("active");
        });
        elementProperty.getElement(".trip-client", element => {
            element.classList.add("active");
        });
        elementProperty.getElement(".footer-container-trip", element => {
            element.classList.remove("active");
        });
        elementProperty.getElement(".map-client", element => {
            element.classList.remove("active");
            element.classList.add("in-trip");
        });
        elementProperty.getElement(".footer-payment-form", element =>
            element.classList.remove("active"));

        elementProperty.getElement(".name-driver-trip", element => {
            element.innerHTML = trip.driver.nickname;
        });

        if (!Array.isArray(trip.driver.car)) {
            elementProperty.getElement(".car-plate-driver", element => {
                element.innerHTML = trip.driver.car.plate;
            });
            elementProperty.getElement(".car-brand-driver", element => {
                element.innerHTML = trip.driver.car.brand + "/" + trip.driver.car.model;
            });
        }
        elementProperty.getElement(".image-profile-driver", element => {
            element.src = PATH_PROFILE_DRIVER + trip.driver.profileImage;
        });
        mapService.removeRoute();

        const positionWait = getDestination(trip);

        showStatusTrip(managerTrip.tripCurrent.status);

        if (mapService.isImportMap) {
            mapService.addPointClientWait(positionWait);
            updateMapTripDriver();
        }

        managerTrip.timeOut = setTimeout(verifyTrip, 3000);
        // driverInDriver.progressTime(3,checkStatusTrip);
    }

    function updateMapTripDriver() {

        const positionDriver = {
            lat: parseFloat(managerTrip.tripCurrent.driver.latitude),
            lng: parseFloat(managerTrip.tripCurrent.driver.longitude),
        };

        const positionWait = getDestination(managerTrip.tripCurrent);

        mapService.updateRouteInMap(positionWait, positionDriver, response => statusInTrip(response, managerTrip.tripCurrent))
    }

    function getDestination(trip) {
        if (trip.status === STATUS_ACCEPTED || trip.status === STATUS_BOARDING)
            return {
                lat: parseFloat(managerTrip.tripCurrent.origin.latitude),
                lng: parseFloat(managerTrip.tripCurrent.origin.longitude)
            };
        if (trip.status === STATUS_IN_PROGRESS)
            return {
                lat: parseFloat(managerTrip.tripCurrent.destination.latitude),
                lng: parseFloat(managerTrip.tripCurrent.destination.longitude)
            };
    }

    function getUpdateTrip() {
        customerController.find(userLogged.idUser).then(({message, status, data}) => {
            if (!status) {
                SwalCustom.messageDialog(message, "Atenção", undefined, "warning");
                return;
            }

            elementProperty.getElement("#balanceClient", element => {
                element.innerHTML = `(R$ ${Mask.maskMoney(parseFloat(data.tripBalance))})`;
            });
        });
    }

    function verifyTrip() {
        const tripReference = Session.get("tripReference");

        if(tripReference.length === 0)
            return;

        TripController.get(tripReference).then(({message, status, data}) => {
            elementProperty.getElement(".container-connection-internet", element => element.classList.remove("active"));
            if (!status) {
                SwalCustom.messageDialog(message, "Atenção", undefined, "warning");
                return;
            }

            if (data !== null) {
                checkStatusTrip(data);
            }
        }).catch(() => {
            elementProperty.getElement(".container-connection-internet", element => element.classList.add("active"));
            setTimeout(verifyTrip, 3000);
        });
    }

    function checkStatusTrip(trip) {

        prepareScreenTrip();

        observerTrip(trip);

        if (trip.status === STATUS_SEARCHING) {
            initSearchTrip(trip);
            return;
        }

        if (trip.status === STATUS_ACCEPTED ||
            trip.status === STATUS_BOARDING ||
            trip.status === STATUS_IN_PROGRESS) {
            initRace(trip);
            return;
        }

        Session.delete("tripReference");

        if (trip.status === STATUS_FINISHED) {
            finishTrip(trip);
            managerTrip.inTrip = false;
            initProcessingCallTrip();
            return;
        }

        if (trip.status === STATUS_CANCELED) {
            clearTimeout(managerTrip.timeOut);
            managerTrip.timeOut = null;
            initProcessingCallTrip();
            if (trip.canceledBy !== "customer")
                SwalCustom.messageDialog("Viagem cancelada", "Atenção", undefined, "warning");
        }


    }

    function prepareScreenTrip() {
        elementProperty.getElement(".btn-call-trip", element => element.classList.add("active"));
        elementProperty.getElement("#callRunning", element => element.classList.add("remove"));
    }

    function updateLocation() {
        Position.getPosition(position => {
            Session.set("location", {lat: position.coords.latitude, lng: position.coords.longitude});
        });
    }

    function toogleOptionMenu() {
        if (this.classList.contains("active")) {
            this.classList.remove("active");
            return;
        }
        this.classList.add("active");
    }

    Route.pageDynamic();
});