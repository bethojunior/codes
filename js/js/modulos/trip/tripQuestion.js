class TripQuestion {

    constructor() {

        this.elementProperty = new ElementProperty();

        this.position = new Position();

        this.socket = new WebSocketPusher(keyTrip);

        this.initEvent();

    }

    setDetail(callback = undefined) {
        const _that = this;

        this.elementProperty.getElement(".view-driver-call",element=>{
            element.style.display = "";
        });

        this.trip = Session.get("trip");

        this.statusAccept = false;

        const tripReference = _that.trip.tripReference;

        this.socket.setChannel("trip-channel");

        this.socket.observerSocket(tripReference, data => {
            _that.closeQuestion();
            _that.triggerCallback(false);
        });

        this.userLogged = Session.get("user");

        this.callback = callback;

        _that.vibrateIn();

        this.elementProperty.getElement("#songCallTaxi",element=>{
            element.play();
        });

        this.elementProperty.getElement(".container-hush", element => {
            setTimeout(function () {
                try {
                    //navigator.notification.beep(1);

                    // element.style.display = "block";
                    element.classList.add("active");
                } catch (e) {
                    console.log(e);
                }
            }, 500);
        });

        this.elementProperty.getElement(".name-hotel", element => {
            element.innerHTML = this.trip.establishmentName;
        });
        this.elementProperty.getElement(".address", element => {

            const andress = this.trip.estimative.destination.split(",");

            element.innerHTML = `${andress[0]},${andress[1]}`;
        });

        this.position.currentPosition = Session.get("lastPosition");

        this.position.lastPosition = {
            lat: parseFloat(this.trip.startLatitude),
            lng: parseFloat(this.trip.startLongitude)
        };

        this.elementProperty.getElement("#tripPaymentFormQuestion", element => {
            element.innerHTML = _that.trip.tripPaymentForm;
        });

        this.elementProperty.getElement(".distace-in-km", element => {
            element.innerHTML = _that.trip.estimative.distance.text+" - "+_that.trip.estimative.duration.text;
        });
        this.elementProperty.getElement("#priceTrip", element => {
            element.innerHTML = "R$ "+Mask.maskMoney(parseFloat(_that.trip.price));
        });
    }


    initEvent() {

        const _that = this;

        new EventTouche().addEventDistanceTop(".container-info-return", -30, () => {
            _that.acceptTrip();
        });

        _that.elementProperty.addEventInElement("#acceptTrip","onclick",()=>{
            _that.acceptTrip();
        });

        document.getElementById("reject-run").onclick = function () {

            const trips = Session.get("tripsDeniedDriver");

            new DriverController().refuseTrip(_that.userLogged.idDriver, _that.trip.tripReference);

            Session.set("tripError", "recursada");

            trips.push({
                tripReference : _that.trip.tripReference,
                date: new Date()
            });

            Session.set("tripsDeniedDriver", trips);

            _that.triggerCallback(false);

        };
    }

    acceptTrip(){
        const _that = this;

        if(_that.statusAccept)
            return;

        _that.statusAccept = true;
        //document.getElementById("container-hush").className = "container-hush accept";

        _that.elementProperty.getElement(".container-info-return", element => {
            element.classList.add("active");
        });

        const tripReference = _that.trip.tripReference;

        _that.socket.stopWebSocket(tripReference);

        new DriverController().acceptTrip(_that.trip.tripReference,
            _that.userLogged.idDriver)
            .then(result => {
                if (result.status) {
                    _that.closeQuestion();
                    Session.set("tripDriver", result.data);
                    _that.triggerCallback(true);
                    Route.goHomeBack();
                    return;
                }
                Session.set("tripError", "indisponivel");

                _that.triggerCallback(false);
            })
            .catch((error) => {
                _that.closeQuestion();
                _that.triggerCallback(false);
                SwalCustom.messageDialog(`${error}`, "Atenção");
            })
    }

    closeQuestion() {
        Session.delete("trip");
        Session.delete("tripError");
        this.statusAccept  = false;
        this.elementProperty.getElement(".container-hush", element => {
            element.classList.remove("active");
        });

        this.elementProperty.getElement(".container-info-return", element => {
            element.classList.remove("active");
        });

        this.elementProperty.getElement("#songCallTaxi",element=>{
            element.pause();
        });
    }

    triggerCallback(status) {
        this.elementProperty.getElement(".container-hush", element => {
            element.classList.remove("active");
        });

        this.elementProperty.getElement(".container-info-return", element => {
            element.classList.remove("active");
        });

        this.elementProperty.getElement("#songCallTaxi",element=>{
            element.pause();
        });

        if (this.callback !== undefined)
            this.callback(status);
    }

    vibrateIn(time = 0) {
        const _that = this;
        navigator.vibrate(300);
        setTimeout(function () {
            try {
                if (time < 3)
                    _that.vibrateIn(time + 1);
            }catch (e) {
                console.log(e)
            }
        }, 600);
    }
}