class MapService {
    constructor() {
        this.directionsService = null;
        this.directionsDisplay = null;
        this.directionsServiceDriver = null;
        this.directionsDisplayDriver = null;
        this.map = null;
        this.locationClient = null;
        this.locationDestination = null;
        this.infoOrigin = null;
        this.infoDestination = null;
        this.pointDriver = null;
        this.locationClientTrip = null;
        this.iconDriver = {
            path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
            scale: .5,
            strokeColor: '#9a5e00',
            strokeOpacity: 1,
            strokeWeight: .5,
            fillOpacity: 1,
            fillColor: '#ff9a00',
            offset: '5%',
            // rotation: parseInt(heading[i]),
        };
        this.futurePosition = null;
        this.currentPosition = null;
        this.timeOut = null;
        this.numDeltas = 100;
        this.delay = 5; //milliseconds
        this.index = 0;
        this.deltaLat = 0;
        this.deltaLng = 0;
        this.isImportMap = false;
    }

    importScriptWithPlaces(executeResolve = false) {
        const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzYKn0wp3Gl8dcoW3xhLNI7xtufpGIYXk&libraries=places";
        const id = "scriptMapLibraries";
        return new Promise(resolve => {
            if (document.getElementById(id) !== null) {
                if (executeResolve) {
                    resolve();
                }
                return;
            }


            const script = document.createElement('script');

            script.setAttribute('src', url);

            script.setAttribute('id', id);

            script.async = true;

            script.defer = true;

            document.body.appendChild(script);


            script.addEventListener('load', resolve);
        });

    }

    initMap(id, position, callback = undefined) {
        const _that = this;
        if (this.directionsService !== null) {
            this.map.setCenter(position);
            return;
        }

        try {

            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer({
                map: this.map,
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: "#ffd187",
                    strokeWeight: 5
                }
            });
            this.directionsServiceDriver = new google.maps.DirectionsService();
            this.directionsDisplayDriver = new google.maps.DirectionsRenderer({
                map: this.map,
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: "#ffd187",
                    strokeWeight: 5
                }
            });

            this.iconDriver.anchor = new google.maps.Point(10, 25);

            this.map = new google.maps.Map(document.getElementById(id), {
                center: position,
                zoom: 14,
                disableDefaultUI: true,
                clickableIcons: false,
                styles: [
                    {
                        "featureType": "poi",
                        "stylers": [
                            {"visibility": "off"}
                        ]
                    }
                ]
            });

            this.map.addListener('center_changed', function () {
                _that.directionsDisplayDriver.setOptions({
                    suppressMarkers: true,
                    preserveViewport: true
                });
            });

            this.isImportMap = true;

            this.map.setOptions({
                draggable: true,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            });

            this.directionsDisplay.setMap(this.map);

            callback();
        } catch (err) {
            setTimeout(function () {
                _that.initMap(position, callback);
            }, 500);

        }
    }

    addPointClient(position) {

        if (this.locationClient !== null) {
            this.locationClient.setMap(null);

            this.map.setCenter(position)
        }

        this.locationClient = this.makeMarker(position, this.map, HOST + "webfiles/img/icon/start-point.png")

    }

    addPointClientWait(position) {

        if (this.locationClientTrip !== null) {
            this.locationClientTrip.setPosition(position);
            return;
        }

        this.locationClientTrip = this.makeMarker(position, this.map, HOST + "webfiles/img/icon/point-client.png")
    }

    updateRouteInMap(positionWait, positionDriver,callback) {
        //this.zoomBetweenPoints(positionDriver, positionWait);

        this.showRouteDriver(positionDriver, positionWait).then(callback);

        if (this.pointDriver === null) {
            this.pointDriver = this.makeMarker(positionDriver, this.map, this.iconDriver);
            this.currentPosition = positionDriver;
            return;
        }

        if (this.getDistanceFromLatLonInMeters(this.currentPosition, positionDriver) < 5)
            return;

        this.futurePosition = positionDriver;

        this.transition();
    }

    transition() {
        clearTimeout(this.timeOut);

        this.index = 0;
        this.deltaLat = (this.futurePosition.lat - this.currentPosition.lat) / this.numDeltas;
        this.deltaLng = (this.futurePosition.lng - this.currentPosition.lng) / this.numDeltas;

        this.moveMarker();
    }

    moveMarker() {

        this.currentPosition.lat = this.currentPosition.lat + this.deltaLat;
        this.currentPosition.lng = this.currentPosition.lng + this.deltaLng;

        const latlng = new google.maps.LatLng(this.currentPosition.lat, this.currentPosition.lng);

        const last = this.pointDriver.getPosition();

        this.pointDriver.setPosition(latlng);

        this.iconDriver.rotation = google.maps.geometry
            .spherical.computeHeading(last, this.pointDriver.getPosition());

        this.pointDriver.setIcon(this.iconDriver);

        if (this.index !== this.numDeltas) {
            this.index++;
            const _that = this;

            this.timeOut = setTimeout(function () {
                _that.moveMarker();
            }, _that.delay);

            return;
        }

        clearTimeout(this.timeOut);
        this.timeOut = null;
    }

    addPointDestination(position) {
        if (this.locationDestination !== null) {
            this.locationDestination.setMap(null);
        }
        this.locationDestination = this.makeMarker(position, this.map, HOST + "webfiles/img/icon/end-point.png")
    }

    makeMarker(position, map, icon) {
        return new google.maps.Marker({
            position, map, icon
        });
    }

    getAddressByLatLng(position) {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({'location': position}, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        resolve(results[0])
                    }
                }
            });
        });
    }

    addSearchInInput(input, callback) {
        const searchBox = new google.maps.places.SearchBox(input);
        searchBox.addListener('places_changed', function () {
            const places = searchBox.getPlaces();

            if (places[0])
                callback(places[0], input);
        });
    }

    showRoute(origin, destination, callback) {
        const _that = this;

        return new Promise((resolve, reject) => {

            _that.directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING',
                avoidTolls: true,
                provideRouteAlternatives: true,
            }, function (response, status) {
                if (status === 'OK') {

                    resolve(response.routes[0].legs[0]);

                    setTimeout(function () {

                        _that.directionsDisplay.setDirections(response);
                        _that.directionsDisplay.setMap(_that.map);
                        //_that.directionsDisplay.setOptions({
                        //suppressMarkers: true,
                        //preserveViewport: true
                        //});
                        /*const bounds = new google.maps.LatLngBounds();

                        bounds.extend(origin);

                        bounds.extend(destination);

                        _that.map.fitBounds(bounds);*/

                    }, 1500)
                } else {
                    reject();
                    swal("Atenção", "Não foi possivel criar uma rota !", "warning");
                }
            });
        })
    }


    showRouteDriver(origin, destination) {
        const _that = this;

        /*if (this.getDistanceFromLatLonInMeters(origin, destination) < 5) {
            if (this.directionsDisplayDriver !== null)
                this.directionsDisplayDriver.setMap(null);
            return;
        }*/

        return new Promise(resolve => {
            _that.directionsServiceDriver.route({
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING',
                avoidTolls: true,
                provideRouteAlternatives: true,
            }, function (response, status) {
                if (status === 'OK') {
                    _that.directionsDisplayDriver.setDirections(response);
                    _that.directionsDisplayDriver.setMap(_that.map);
                    resolve(response);
                }
            });
        });
    }

    addLegends(route) {
        initPop();


        this.infoOrigin = new Popup(
            this.locationClient.getPosition(),
            `<div class="container-origin popup-bubble-content">
                            <div class="local">${document.getElementById("origin").value}</div>
                        </div>`
        );

        this.infoDestination = new Popup(
            this.locationDestination.getPosition(),
            `<div class="container-destination popup-bubble-content">
                        <span>
                        <span class="time">${DateCustom.getMinuteBySecunds(route.duration.value)}</span>
                        <span class="minute">min</span>
                        </span>
                        <div class="local">${document.getElementById("destination").value}</div>
                    </div>`
        );
        this.infoOrigin.setMap(this.map);
        this.infoDestination.setMap(this.map);
        return new Promise((resolve) => {
            setTimeout(resolve, 500)
        });
    }

    removeRoute() {
        if (this.locationClient !== null) {
            this.locationClient.setMap(null);
            this.locationClient = null;
        }
        if (this.directionsDisplay !== null) {
            this.directionsDisplay.setMap(null);
        }

        if (this.locationDestination !== null)
            this.locationDestination.setMap(null);

        if (this.infoOrigin !== null) {
            this.infoOrigin.setMap(null);
            this.infoOrigin = null;
        }

        if (this.infoDestination !== null) {
            this.infoDestination.setMap(null);
            this.infoDestination = null;
        }

    }

    removeDetalheMap() {
        if (this.directionsDisplay !== null) {
            this.directionsDisplay.setMap(null);
        }
        if (this.directionsDisplayDriver !== null) {
            this.directionsDisplayDriver.setMap(null);
        }

        if (this.locationDestination !== null)
            this.locationDestination.setMap(null);

        if (this.infoOrigin !== null) {
            this.infoOrigin.setMap(null);
            this.infoOrigin = null;
        }

        if (this.infoDestination !== null) {
            this.infoDestination.setMap(null);
            this.infoDestination = null;
        }

        if (this.pointDriver !== null) {
            this.pointDriver.setMap(null);
            this.pointDriver = null;
        }

        if (this.locationClient !== null) {
            this.locationClient.setMap(null);
            this.locationClient = null;
        }
        if (this.locationClientTrip !== null) {
            this.locationClientTrip.setMap(null);
            this.locationClientTrip = null;
        }

    }

    removeOnlyRoute() {
        this.directionsDisplay.setMap(null);
        this.infoOrigin.setMap(null);
        this.infoDestination.setMap(null);
        this.infoOrigin = null;
        this.infoDestination = null;
    }

    removePointClient() {
        this.locationClient.setMap(null);
    }

    removePointDestination() {
        this.locationDestination.setMap(null);
    }

    zoomBetweenPoints(...points) {
        const bounds = new google.maps.LatLngBounds();

        points.map(point => {
            bounds.extend(point);
        });

        this.map.fitBounds(bounds);
    }

    getDistanceFromLatLonInMeters(lastPosition, currentPosition) {

        let deg2rad = function (deg) {
                return deg * (Math.PI / 180);
            },
            R = 6371,
            dLat = deg2rad(lastPosition.lat - currentPosition.lat),
            dLng = deg2rad(lastPosition.lng - currentPosition.lng),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(currentPosition.lat))
                * Math.cos(deg2rad(currentPosition.lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseInt((R * c * 1000).toFixed());
    }

    focusInRoute() {
        this.directionsDisplayDriver.setOptions({
            suppressMarkers: false,
            preserveViewport: false
        });
        this.zoomBetweenPoints(this.locationClientTrip.getPosition(), this.pointDriver.getPosition());
    }

    getImgMapTrip(origin, destination, id) {
        fetch('https://maps.googleapis.com/maps/api/directions/json?' +
            `origin=${origin.lat},${origin.lng}` +
            `&destination=${destination.lat},${destination.lng}&mode=driving&key=AIzaSyDzYKn0wp3Gl8dcoW3xhLNI7xtufpGIYXk`)
            .then(response => response.json()).then(result => {
            const elementProperty = new ElementProperty();

            elementProperty.getElement(id, element => {
                element.src = "https://maps.googleapis.com/maps/api/staticmap" +
                    "?size=500x300&path=weight:3%7Ccolor:black%7Cenc:" + result.routes[0].overview_polyline.points +
                    "&key=AIzaSyDzYKn0wp3Gl8dcoW3xhLNI7xtufpGIYXk";
            });
        })
    }
}