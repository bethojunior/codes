Route.waitView().then(() => {

    $('.modal').modal();
    //cordova.plugins.backgroundMode.setDefaults({hidden: false, silent: true});
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.on('activate', function () {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });

    window.plugins.insomnia.keepAwake();

    const userLogged = Session.get("user");

    const tripQuestion = new TripQuestion();

    const positionLocation = new Position();

    const elementProperty = new ElementProperty();

    const driverController = new DriverController();

    const locationController = new LocationController();

    const searchTripProgress = new Progress();

    const initTripStatus = "in_progress";

    const STATUS_FINISH_TRIP = "finished";

    const mapService = new MapService();

    const eventToucher = new EventTouche();

    const tripSocket = new WebSocketPusher(keyTrip);

    const networkConnection = new NetworkConnection();

    const chatNotification = new ChatNotification();

    PreloaderCustomer.show();

    networkConnection.obeserverConnection(() => {
        initMapPosition();
        sendTripOffline();
        Log.prepareToSendLog();
    }, () => {
        // searchTripProgress.stopProgress();
    });

    const push = new Push();

    const returns = new ChangeReturn();

    const moveLeft = -150;
    const moveRight = 150;

    const controllerMeter = {maxMetersMove: 5, minMetersMove: 3};

    let timeRequestPosition;

    function initMapPosition() {
        Position.getCurrentMap().then(position => {
            mapService.requestAndInitMap(position, function () {
                returns.initEventReturn();
                sendTripOffline();
                getPositionDriver();
            });
        }).catch(error => {
            clearTimeout(timeRequestPosition);

            timeRequestPosition = setTimeout(function () {
                initMapPosition();
            }, 300);
        });

    }

    initMapPosition();

    push.eventPush(data => {

        switch (data.additionalData.action) {
            case "changeStatusDriver" :
                updateTripDriver();
                break;
            case "pendencelink" :
                openUrl(data.additionalData.url);
                break;
            case "update" :
                checkVersion(data);
                break;
        }

    });

    function openUrl(url) {
        location.href = url;
    }

    function sendTripOffline() {
        const tripFinish = Session.get("tripFinish");

        if (tripFinish.length !== 0) {
            driverController.finishTripOffline(tripFinish.tripReference,
                {
                    date: tripFinish.dateFinish,
                    location: {
                        latitude: tripFinish.position.lat,
                        longitude: tripFinish.position.lng
                    }
                })
                .then(result => {
                    if (result.status) {
                        Session.delete("tripFinish");
                    }

                    updateTripDriver();
                });
            return;
        }
        updateTripDriver();
    }

    function checkVersion(data) {
        Materialize.toast(data.message, 1000);
        setTimeout(function () {
            location.href = "https://play.google.com/store/apps/details?id=br.com.taxireturn.driver";
            Session.delete("user");
        }, 1000);
    }

    function updateTripDriver() {
        driverController.find(userLogged.idDriver).then(result => {
            Session.delete("tripDriver");

            if (result.data.trip !== undefined) {
                Session.set("tripDriver", result.data.trip);
            }

            userLogged.stationId = result.data.stationId;
            userLogged.status = result.data.status;
            userLogged.driverRegisterStatusId = result.data.driverRegisterStatusId;
            userLogged.reasons = result.data.reasons;

            Session.set("user", userLogged);

            PreloaderCustomer.hidden();

            if (mapService.isMapActive()) {
                backInitZoom();
                statusDriver();
            }
        });
    }

    eventToucher.addEventDistanceHorizontal("#btnStatusDriver", moveLeft, moveRight,
        function (distance, parent, direction) {

            elementProperty.getElement("#toggleStatusDriver", element => {

                if (element.checked === (direction !== "left"))
                    return;

                element.checked = direction !== "left";

                setStatusDriver(element.checked);

                checkStatusDriver(parseInt(userLogged.driverRegisterStatusId), element.checked).then(() => {
                    searchTripProgress.stopProgress();

                    driverController.toggleStatus(userLogged.idDriver).then(result => {
                        userLogged.status = result.data.status;
                        Session.set("user", userLogged);

                        if (element.checked) {
                            checkTrip();
                        }
                    }).catch(() => {
                        element.checked = !element.checked;

                        setStatusDriver(element.checked);

                        searchTripProgress.stopProgress();

                        SwalCustom.messageDialog("Ocorreu um error ao tentar alterar status motorista", "Atenção");
                    })
                }).catch(() => {
                    elementProperty.getElement("#toggleStatusDriver", element => {
                        searchTripProgress.stopProgress();
                        element.checked = false;
                        setStatusDriver(element.checked);
                    });
                });

            });
        });

    function checkStatusDriver(driverRegisterStatusId, isStatus) {
        return new Promise((resolve, reject) => {
            StatusDriver.verifyStatusDriver(driverRegisterStatusId, isStatus)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }

    function setStatusDriver(status) {
        elementProperty.getElement("#textTripToggle", elementText => {

            elementProperty.getElement("#footerArrow", upArrow => {
                upArrow.classList.remove("stop");
                if (status)
                    upArrow.classList.add("stop");

            });

            if (status) {
                elementText.innerHTML = "Pronto pra receber corrida";
                return;
            }
            elementText.innerHTML = "Ative para começar a receber corridas.";
        });
    }

    function getPositionDriver() {
        positionLocation.getCurrent(position => {

            showDetails(position);

            Session.set("lastPosition", position);

            const trip = Session.get("tripDriver");

            if (!mapService.isMapActive())
                return;

            sendPositionDriver(position);

            if (trip.length === 0)
                mapService.removeRoute();
        }, () => {
            console.log("error");
        });

    }

    function sendPositionDriver(position) {
        const trip = Session.get("tripDriver");

        const meters = positionLocation.getDistanceFromLatLonInMeters();

        if (meters > controllerMeter.minMetersMove)
            mapService.setPositionDriver(position);

        if (trip.length !== 0)
            updateNavigateRoute(position);

        if (meters > controllerMeter.maxMetersMove) {
            locationController.insert({
                "latitude": position.lat,
                "longitude": position.lng,
                "deviceId": "",
                "deviceModel": "",
                "created_at": DateCustom.getNow(),
                "driverId": parseInt(userLogged.idDriver),
                "tripReference": null
            }, () => {
            });
        }
    }

    function showDetails(position) {
        elementProperty.getElement("#gps", element => {
            element.innerHTML = `
                    Longitude = ${position.lat} </br>
                    Latitude = ${position.lng} </br>
                    Velocidade (M/s) = ${position.speed === null ? 0 : position.speed} </br>
                    Angulo = ${position.heading === null ? 0 : position.heading} deg</br>
             `;
        });
    }

    elementProperty.addEventInElement(".apps-hotel", "onclick", function () {
        Route.redirectDynamic("Establishment", "Filter");
    });

    elementProperty.addEventInElement("#cancelTrip", "onclick", () => {
        elementProperty.visibleElements([".container-cancel-trip"]);
    });

    elementProperty.addEventInElement("#openChat", "onclick", function () {
        Route.redirectDynamic("Driver", "Chat");
        clearNotification();
    });

    eventToucher.addEventDistanceHorizontal("#btnChangeStatusTrip", 90, 0, (distance, element, direction) => {
        if (direction !== "left") {
            return;
        }

        const trip = Session.get("tripDriver");

        element.classList.add("active");

        const result = checkStatusTrip(trip);

        result.callback(trip);

        if (!element.classList.contains("signal")) {
            element.classList.add("signal");
            return;
        }
        element.classList.remove("signal")
    });

    elementProperty.addEventInElement(".close-trip-finish", "onclick", function () {
        elementProperty.visibleElements(['.modal-finish'], false);
        elementProperty.getElement(".steering-wheel-animation", element => {
            element.classList.remove("stop");

            clearDataTrip();
        });
    });

    function clearDataTrip() {
        elementProperty.getElement("#btnChangeStatusTrip", element => {
            element.classList.remove("signal")
        });

        userLogged.status = "disponivel";

        Session.set("user", userLogged);

        Session.delete("tripDriver");

        statusDriver();

        elementProperty.visibleElements(['.toggle-status-driver'], true);

        elementProperty.visibleElements(['.data-trip', '.status-running'], false);

        elementProperty.getElement(".container-menu-options", element => {
            element.classList.remove("active");
        });

        elementProperty.getElement(".menu-close", element => {
            element.classList.remove("open");
        });

        elementProperty.getElement(".footer-race", element => {
            element.classList.remove("active");
        });

        elementProperty.getElement(".footer-arrow", element => {
            element.style.display = "block";
        });
        elementProperty.getElement(".status-running", element => {
            element.style.display = "none";
        });
        elementProperty.getElement(".map", element => {
            element.classList.remove("active");
        });

        Route.goHomeBack();

        chatNotification.closeChat();

        mapService.removeRoute();

    }

    function checkStatusTrip(trip) {

        switch (trip.status) {
            case "accepted": {
                return {callback: informArrival, message: "Sinalizar chegada", status: "Buscando passageiro"};
            }
            case "boarding": {
                return {callback: initTrip, message: "Iniciar corrida", status: "Buscando passageiro"};
            }
            case "in_progress": {
                return {callback: finishTrip, message: "Finalizar corrida", status: "Em viagem"};
            }
            case "finished" : {
                return {callback: false, message: false};
            }
        }
    }

    function errorChangeStatus(message = true) {

        const trip = Session.get("tripDriver");

        const objectStatus = checkStatusTrip(trip);

        if (!message) {
            changeStatusNameTrip(objectStatus.message, objectStatus.status);
            return;
        }

        SwalCustom.messageDialog(`Ops... ocorreu um error ao tentar '${objectStatus.message}'`, "Atenção", () => {
            changeStatusNameTrip(objectStatus.message, objectStatus.status);
        }, "info");
    }

    function informArrival(trip) {

        const meter = new Position().getDistanceLocation(Session.get("lastPosition"),
            {lat: parseFloat(trip.origin.latitude), lng: parseFloat(trip.origin.longitude)})

        if (meter > 100) {
            SwalCustom.dialogConfirm("Atenção, Você esta sinalizando chegada longe do" +
                " seu cliente, Tem certeza que deseja sinalizar chegada ?", "",
                status => {
                    if (!status) {
                        errorChangeStatus(false);
                        return;
                    }
                    showArrivalDriver(trip);
                });
            return;
        }
        showArrivalDriver(trip);

    }

    function showArrivalDriver(trip){
        driverController.informArrival(trip.tripReference).then((result)=>{
            if(!result.status)
                throw result.message;

            InfoClientTrip.showArrivalClient(trip);
            responseStatusTrip(result);
        }).catch(errorChangeStatus);
    }

    function initTrip(trip) {
        driverController.initTrip(trip.tripReference).then(responseStatusTrip).catch(errorChangeStatus);
        mapService.removeRoute();
        updateRoute(true);
    }

    function finishTrip(trip) {
        const meter = new Position().getDistanceLocation(Session.get("lastPosition"),
            {lat: parseFloat(trip.destination.latitude), lng: parseFloat(trip.destination.longitude)})

        if (meter > 30) {
            SwalCustom.dialogConfirm("Atenção, Você ainda não chegou ao destino," +
                " Tem certeza que deseja finalizar a viagem ?", "", status => {
                if (!status) {
                    errorChangeStatus(false);
                    return;
                }

                driverController.finishTrip(trip.tripReference).then(responseStatusTrip).catch(finishTripOffline);
            });

            return;
        }

        driverController.finishTrip(trip.tripReference).then(responseStatusTrip).catch(finishTripOffline);
    }

    function finishTripOffline() {
        const trip = Session.get("tripDriver");

        trip.status = STATUS_FINISH_TRIP;

        trip.position = Session.get("lastPosition");

        trip.dateFinish = DateCustom.getNow();

        Session.set("tripFinish", trip);

        modalFinishTrip();
    }

    const responseStatusTrip = result => {
        const trip = Session.get("tripDriver");

        if (!trip.status) {
            return;
        }

        if (!result.status) {
            SwalCustom.messageDialog(result.message, "Atenção", clearDataTrip);
            return;
        }

        trip.status = result.data.status;

        Session.set("tripDriver", trip);

        const objectStatus = checkStatusTrip(trip, true);

        if (!objectStatus.callback) {

            modalFinishTrip();

            return;
        }

        changeStatusNameTrip(objectStatus.message, objectStatus.status);
    };

    function modalFinishTrip() {
        elementProperty.visibleElements([".modal-finish"], true);

        backInitZoom();

        elementProperty.getElement(".steering-wheel-animation", element => {
            element.classList.add("stop");
        });

        changeStatusNameTrip("", "Corrida finalizada");

        Session.delete("tripDriver");

        userLogged.status = "disponivel";

        Session.set("user", userLogged);
    }

    function changeStatusNameTrip(name, status, zindex = 200) {
        elementProperty.getElement("#btnChangeStatusTrip", element => {
            element.innerHTML = name;
            element.classList.remove("active");
        });

        elementProperty.getElement("#statusDriverTrip", element => {
            element.innerHTML = status;
        });

        elementProperty.getElement(".status-running", element => {
            element.style.zIndex = zindex;
        });
    }

    function statusDriver() {
        elementProperty.getElement("#toggleStatusDriver", element => {
            elementProperty.getElement("#preloadLogin", element => {
                element.style.display = "none";
            });

            elementProperty.getElement(".footer-race", element => {
                element.style.display = "block";
            });

            if (userLogged.status === "corrida") {
                showDataTrip();
                return;
            }

            element.checked = (userLogged.status === "disponivel");

            setStatusDriver(element.checked);

            if (element.checked) {
                checkTrip();
            }

            checkStatusDriver(parseInt(userLogged.driverRegisterStatusId), element.checked).catch(() => {
                elementProperty.getElement("#toggleStatusDriver", element => {
                    searchTripProgress.stopProgress();
                    element.checked = false;
                    setStatusDriver(element.checked);
                });
            });
        });
    }

    function showDataTrip() {
        if (!mapService.isMapActive()) {
            return;
        }

        const trip = Session.get("tripDriver");

        if (trip.length === 0) {
            return;
        }

        const hideElements = [
            ".toggle-status-driver",
        ];

        const showElements = [
            ".data-trip",
            ".status-running"
        ];

        chatNotification.observerNotification(trip, () => {
            Route.redirectDynamic("Driver", "Chat");
            clearNotification();
        });

        tripSocket.setChannel("trip-channel");

        tripSocket.observerSocket(trip.tripReference, result => {

            if ((typeof result.trip) === "string") {
                result.trip = JSON.parse(result.trip);
            }

            if (result.trip.status === "canceled") {

                if (result.trip.canceledBy !== "driver") {
                    SwalCustom.messageDialog("Viagem cancelada pelo cliente", "Atenção", () => {
                    }, "error");
                }
                clearDataTrip();

                tripSocket.stopWebSocket(result.trip.tripReference);
            }
        });

        elementProperty.getElement(".footer-race", element => {
            if (!element.classList.contains("active"))
                element.classList.add("active");
        });
        elementProperty.getElement(".footer-arrow", element => {
            element.style.display = "none";
        });

        elementProperty.visibleElements(hideElements, false);

        elementProperty.visibleElements(showElements, true);

        elementProperty.getElement(".match", element => {
            element.innerHTML = trip.origin.address;
        });
        elementProperty.getElement(".destiny", element => {
            element.innerHTML = trip.destination.name;
        });
        elementProperty.getElement("#tripPaymentForm", element => {
            element.innerHTML = trip.tripPaymentForm;
        });
        elementProperty.getElement("#nameClient", element => {
            element.innerHTML = trip.customer.name;
        });
        elementProperty.getElement("#nameClient", element => {
            element.innerHTML = trip.customer.name;
        });
        elementProperty.getElement("#nameClientFinish", element => {
            element.innerHTML = trip.customer.name;
        });

        elementProperty.getElement(".value-trip", element => {
            element.innerHTML = "R$ " + Mask.maskMoney(parseFloat(trip.price));
        });

        elementProperty.addEventInElement(".data-client","onclick",function () {
            InfoClientTrip.showDataClientTrip(trip);
        });

        if (mapService.isMapActive())
            updateRoute();

        const objectStatus = checkStatusTrip(trip);

        changeStatusNameTrip(objectStatus.message, objectStatus.status);
    }

    function updateRoute(initTrip = false) {
        const endPosition = getLastPosition(initTrip);
        const startPosition = Session.get("lastPosition");

        updateNavigateRoute(startPosition, initTrip);

        if (initTrip)
            mapService.removeRoute();

        if (!mapService.existTrip)
            mapService.calculateAndDisplayRoute(startPosition, endPosition);
    }

    function updateNavigateRoute(position) {

        const endPosition = getLastPosition();

        elementProperty.getElement(".apps-route", element => {
            element.setAttribute("href", `http://maps.google.com/maps?saddr=${position.lat},${position.lng}&daddr=${endPosition.lat},${endPosition.lng}`)
        });
    }


    function getLastPosition(initTrip) {
        const trip = Session.get("tripDriver");

        if (trip.length === 0) {
            return {};
        }

        const isStartTrip = (trip.status === initTripStatus || initTrip);

        const endPosition = {
            lat: parseFloat(trip.origin.latitude),
            lng: parseFloat(trip.origin.longitude)
        };

        if (isStartTrip) {
            endPosition.lat = parseFloat(trip.destination.latitude);
            endPosition.lng = parseFloat(trip.destination.longitude);
        }

        return endPosition;
    }

    function checkTrip() {

        searchTripProgress.stopProgress();

        if (!networkConnection.existConnection)
            return;

        searchTripProgress.progressUndefined(time => {
            const listTripsDenied = getTripDenied();

            if (userLogged.status !== "disponivel") {
                searchTripProgress.stopProgress();
                return;
            }

            const location = Session.get("lastPosition");

            driverController.searchTrip(parseInt(userLogged.idDriver), listTripsDenied,
                {latitude: location.lat, longitude: location.lng}).then(result => {

                if (!result.status) {
                    searchTripProgress.stopProgress();
                    //SwalCustom.messageDialog(result.message,"Atenção",()=>{},"info");
                    updateTripDriver();
                    return;
                }


                if (result.data.length > 0) {
                    searchTripProgress.stopProgress();

                    window.plugins.bringtofront();

                    let object = result.data[0];

                    Session.set("trip", object);

                    tripQuestion.setDetail(getDetailDriver);
                }
            }).catch(() => {
                searchTripProgress.stopProgress();
                setTimeout(checkTrip, 1000);
            });

        });
    }

    function getTripDenied() {
        const SECONDS_MAX = 90;

        const list = Session.get("tripsDeniedDriver").filter(trip => {
            const dateReject = new Date(trip.date);
            const dateNow = new Date();

            return (Math.abs((dateReject.getTime() - dateNow.getTime()) / 1000) < SECONDS_MAX);
        });

        Session.set("tripsDeniedDriver", list)

        return list.map(trip => {
            return trip.tripReference;
        });
    }

    function getDetailDriver(accept) {

        if (!accept) {
            checkTrip();
            switch (Session.get("tripError")) {
                case "indisponivel" : {
                    Materialize.toast('Ops, Viagem indisponivel', 2500);
                    break;
                }
                case "recursada" : {
                    Materialize.toast('Voce recusou a viagem', 2500);
                    break;
                }
            }

            return;
        }

        userLogged.status = "corrida";

        Session.set("user", userLogged);

        showDataTrip();

    }

    elementProperty.getElement("#includeContainer1", element => {
        element.setAttribute("style",
            "position: relative;\n" +
            "    width: 100%;\n" +
            "    float: left;\n" +
            "    height: calc(100% - 17vw);\n" +
            "    overflow: hidden;")
    });

    elementProperty.addEventInElement(".logo-return", "ondblclick", function () {
        document.getElementById("panelDetail").style.display =
            document.getElementById("panelDetail").style.display === "block" ?
                "none" : "block";
    });

    elementProperty.addEventInElement(".footer-arrow", "onclick", function () {
        elementProperty.getElement(".footer-race", element => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
                return;
            }
            element.classList.add("active");
        });
    });

    new EventTouche().addEventDistanceVertical('.footer-arrow', (distance) => {
        const pushUp = -50;
        const pushDown = 50;

        elementProperty.getElement(".footer-race", element => {
            if (distance < pushUp) {
                element.classList.add("active");
            }

            if (distance > pushDown) {
                element.classList.remove("active");
            }
        });
    });

    Route.pageDynamic();

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown(e) {
        e.preventDefault();
        Route.backPage();
    }

    function clearNotification() {
        elementProperty.getElement(".amount-msg", element => {
            element.innerHTML = '';
        });
    }

    elementProperty.addEventInElement("#zoomMap", "onclick", function () {
        elementProperty.getElement(".map", map => {
            elementProperty.getElement(".footer-race", footer => {

                if (map.classList.contains("active")) {
                    footer.classList.remove("zoom");
                    map.classList.remove("active");
                    mapService.zoomInDriver();
                    return;
                }
                map.classList.add("active");
                footer.classList.add("zoom");

                mapService.zoomBetweenPoints()
            });
        });
    });


    function backInitZoom() {
        elementProperty.getElement(".map", map => {
            elementProperty.getElement(".footer-race", footer => {
                if (!map.classList.contains("active"))
                    return;

                footer.classList.remove("zoom");
                map.classList.remove("active");
                mapService.zoomInDriver();
            });
        });
    }
});