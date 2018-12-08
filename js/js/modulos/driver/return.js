class ChangeReturn {

    constructor() {

        this.stationTypeController = new StationTypeController();
        this.stationController = new StationController();
        this.driverController = new DriverController();
        this.elementProperty = new ElementProperty();
        this.userLogged = Session.get("user");

        this.timePressButton = undefined;
        this.time = undefined;
        this.isInitSearch = false;
        this.limitReturn = 3;
        this.place = {
            latitude: null,
            longitude: null
        };

        this.verifyReturn();

        const _that = this;

        this.stationTypeController.getAll().then(({status, data}) => {
            if (!status)
                return;

            _that.elementProperty.getElement("#stationType", element => {
                element.innerHTML = `<option disabled selected>Selecione um tipo de posto</option>`
                    .concat(data.map(stationType => {
                        return `<option value="${stationType.idStationType}">${stationType.name}</option>`;
                    }).join());

                $('select').material_select();
            })
        });

    }

    validateStation(station) {
        if (station.name.length === 0) {
            SwalCustom.messageDialog("Informe o nome da retorno", "Atenção", () => {
            }, "warning");
            return false;
        }
        if (isNaN(station.stationTypeId)) {
            SwalCustom.messageDialog("Selecione um tipo de retorno", "Atenção", () => {
            }, "warning");

            return false;
        }

        if (station.address.length === 0) {
            SwalCustom.messageDialog("Informe o endereço de retorno", "Atenção", () => {
            }, "warning");

            return false;
        }

        return true;
    }

    verifyReturn() {

        const _that = this;

        this.stationController.getByDriver(_that.userLogged.idDriver).then(({status, data}) => {

            let lista = "";
            for (let index = 0; index < _that.limitReturn; index++) {
                if (data[index] !== undefined) {
                    lista += `<li class="${_that.userLogged.stationId === data[index].stationId
                        ? "change-return active" : "change-return"}" value='${JSON.stringify(data[index])}'>
                         <div>${data[index]['name']}</div>
                    </li>`;
                    continue;
                }

                lista += `<li class="add-return">
                        <div><i class="material-icons">add</i></div>
                    </li>`;
            }

            _that.elementProperty.getElement("#listReturn", element => {
                element.innerHTML = lista;
            });
            _that.clearForm();
        });
    }

    initEventReturn() {

        const _that = this;

        this.elementProperty.getElement("#addressReturn", element => {
            _that.initSearch(element);
        });

        _that.elementProperty.addEventInElement(".close-modal-return", "onclick", function () {
            _that.elementProperty.getElement(".modal-signup-return", element => element.classList.remove("active"));
        });

        _that.elementProperty.addEventInElement(".add-return", "onclick", function () {
            _that.elementProperty.getElement(".modal-signup-return", element => element.classList.add("active"));

            _that.elementProperty.addEventInElement("#btnSaveReturn", "onclick", function () {

                _that.elementProperty.getObjectByForm("#formReturnDriver").then(station => {
                    station['stationTypeId'] = parseInt(station.stationTypeId);
                    station['latitude'] = _that.place.latitude;
                    station['longitude'] = _that.place.longitude;
                    station['driverId'] = parseInt(_that.userLogged.idDriver);

                    if (!_that.validateStation(station))
                        return;
                    _that.elementProperty.getElement(".modal-signup-return", element => element.classList.remove("active"));

                    _that.stationController.insertByDriver(station).then(({status}) => {
                        if (!status) {
                            SwalCustom.messageDialog("Ocorreu um erro ao tentar inserir um retorno", "Atenção", () => {
                            }, "warning");
                            return;
                        }
                        _that.verifyReturn();
                    });
                });
            });

            _that.elementProperty
                .getElement("#nameReturnTitle",
                    element => element.innerHTML = 'Novo ponto de retorno');

            //_that.elementProperty.getElement("#btnSaveReturn",element=> element.disabled = true);

        });

        _that.elementProperty.addEventInElement(".change-return", "onclick", function () {
            _that.elementProperty.getElement(".change-return", element => element.classList.remove("active"));

            this.classList.add("active");

            const station = JSON.parse(this.getAttribute("value"));

            const {stationId} = station;

            _that.driverController.defaultStation(parseInt(_that.userLogged.idDriver), stationId)
                .then(({status}) => {
                    if (status)
                        return;

                    SwalCustom.messageDialog("Não foi possivel alterar seu posto de retorno", "Atenção",
                        () => {
                            _that.elementProperty.getElement(".change-return", element => {
                                element.classList.remove("active");

                                if (element.getAttribute("value") === userLogged.stationId)
                                    element.classList.add("active");

                            });

                        }, "warning");

                })
        });

        _that.elementProperty.addEventInElement(".change-return", "ontouchstart", function () {
            const station = JSON.parse(this.getAttribute("value"));
            clearInterval(_that.time);

            _that.time = setInterval(function () {
                _that.timePressButton += 1;
                _that.verifyTime(station);
            }, 500);
        });

        _that.elementProperty.addEventInElement(".change-return", "ontouchend", function () {
            clearInterval(_that.time);
            _that.timePressButton = 0;
        });

        /*_that.elementProperty.addEventInElement("#addressReturn","oninput",function(){
            _that.elementProperty.getElement("#btnSaveReturn",element=> element.disabled = true)
        });*/
    }

    verifyTime(station) {
        const _that = this;
        if (_that.timePressButton > 1) {
            clearInterval(_that.time);
            _that.timePressButton = 0;
            this.elementProperty.getElement(".modal-signup-return", element => {
                if(!element.classList.contains("active"))
                    _that.editStation(station);
            });
        }
    }

    editStation(station) {
        const _that = this;

        this.elementProperty.getElement(".modal-signup-return", element => element.classList.add("active"));

        //this.elementProperty.getElement("#btnSaveReturn",element=> element.disabled = true);

        this.elementProperty
            .getElement("#nameReturnTitle",
                element => element.innerHTML = 'Alterar ponto de retorno');
        this.elementProperty.getElement("#nameReturn", element => element.value = station.name);
        this.elementProperty.getElement("#addressReturn", element => element.value = station.address);
        this.elementProperty.getElement("#stationType", element => element.value = station.stationTypeId);

        const stationId = station.stationId;

        this.elementProperty.addEventInElement("#btnSaveReturn", "onclick", function () {
            _that.elementProperty.getObjectByForm("#formReturnDriver").then(station => {
                station['idStation'] = parseInt(stationId);
                station['stationTypeId'] = parseInt(station.stationTypeId);
                station['latitude'] = _that.place.latitude;
                station['longitude'] = _that.place.longitude;
                station['driverId'] = parseInt(_that.userLogged.idDriver);

                console.log(station);

                if (!_that.validateStation(station))
                    return;
                _that.elementProperty.getElement(".modal-signup-return", element => element.classList.remove("active"));

                _that.stationController.edit(station).then(({status}) => {
                    if (!status) {
                        SwalCustom.messageDialog("Ocorreu um erro ao tentar alterar o retorno", "Atenção", () => {
                        }, "warning");
                        return;
                    }
                    _that.verifyReturn();
                });
            });
        });

        $('select').material_select();

    }

    clearForm() {
        this.elementProperty.getElement("#nameReturn", element => element.value = '');
        this.elementProperty.getElement("#addressReturn", element => element.value = '');
    }

    initSearch(element) {
        const _that = this;
        if (this.isInitSearch)
            return;

        const searchBox = new google.maps.places.SearchBox(element);

        searchBox.addListener('places_changed', function () {
            const places = searchBox.getPlaces();

            _that.place.latitude = places[0].geometry.location.lat();
            _that.place.longitude = places[0].geometry.location.lng();

            _that.elementProperty.getElement("#btnSaveReturn",element=> element.disabled = false)
        });

        this.isInitSearch = true;
    }

}