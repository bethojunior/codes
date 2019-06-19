$(document).ready(function () {

    $('select').material_select();

    let isFormFinish = false, isValidateEmail = false;

    Mask.setMaskPhone("#phone");
    Mask.setMaskCpf("#cpf");

    const elementProperty = new ElementProperty();
    const driverController = new DriverController();
    const estateController = new EstateController();
    const cityController = new CityController();
    const stationTypeController = new StationTypeController();
    const stationController = new StationController();
    const suportController = new SupportController();
    const cooperativeController = new CooperativeController();
    const userController = new UserController();

    const formGroup = new FormGroup(".group-signup");

    formGroup.validate = {
        PERSONAL_DATA: false,
        VALIDATE_NUMBER: false,
        SAFETY: false,
        COMPANY: false,
        DOCUMENT: false,
        TERMS: false
    };

    const validateForm = {
        verifyCode: "",
        confirmationCode: ""
    };

    const dataDriver = {
        driver: {
            name: "",
            nickname: "",
            phone: "",
            password: "",
            document: "",
            gender: "",
            email: "",
            stationId: "",
            cityId: "",
            estateId: "",
            cooperativeId: "",
            cnh: "",
            created_at: "",
            hasCardReader: false
        },
        image: {
            CNH: null,
            CRLV: null,
            ALVARA: null,
            PROFILE: null
        },
        station: {
            name: "",
            stationTypeId: null,
            cityId: null,
            latitude: null,
            longitude: null,
            address: ""

        }
    };

    suportController.getHelpCode().then(({status,data})=>{
        if(!status)
            return;
        Session.set("codeSupport",data);
    });

    elementProperty.addEventInElement(".btn-next-signup", "onclick", formPass);

    elementProperty.addEventInElement("#email", "onblur", function () {
        elementProperty.getElement("#preloadLogin", element => {
            element.style.display = "block";
            element.style.marginTop = "0";
            element.style.top = "0";
            element.style.backgroundColor = "rgba(0,0,0,0.5)";

            driverController.checkEmail(this.value).then(result => {
                isValidateEmail = !result.status;
                element.style.display = "none";
            })
        });
    });

    elementProperty.addEventInElement(".back-to", "onclick", function () {
        if (!formGroup.beforeGroup() || isFormFinish)
            Route.redirect("Main");
    });

    function formPass() {
        if (!validateData())
            return;
        if (!formGroup.nextGroup()) {
            elementProperty.getElement(".preload-return", element => {
                element.style.display = "block";
            });

            driverController.register(dataDriver).then(result => {
                elementProperty.getElement(".preload-return", element => {
                    element.style.display = "none";
                });

                if (!result.status) {
                    isFormFinish = false;
                    SwalCustom.messageDialog(result.message, "Atenção", () => {
                    }, "warning");
                    formGroup.beforeGroup();
                    return;
                }

                isFormFinish = true;

                elementProperty.getElement(".group-signup-finish", element => {
                    element.classList.add("active");
                });

                elementProperty.addEventInElement(".finish-form", "onclick", function () {
                    Route.redirect("Main");
                });
            });
        }
    }

    function isCompletePersonalData(){
        const inputs = [
            document.getElementById("name"),
            document.getElementById("cpf"),
            document.getElementById("email"),
            document.getElementById("phone")
        ];

        for (let i in inputs){
            const input = inputs[i];

            if(input.value.length === 0){
                input.focus();
                return false;
            }
        }

        return true;
    }

    function validateData() {
        if (!formGroup.validate.PERSONAL_DATA) {

            if(!isCompletePersonalData())
                return;

            if (!isValidateEmail) {
                SwalCustom.messageDialog("E-mail já esta sendo utilizado", "Atenção", () => {
                }, "warning");
                return false;
            }

            dataDriver.driver.name = document.getElementById("name").value;
            dataDriver.driver.nickname = dataDriver.driver.name.split(" ")[0];
            dataDriver.driver.phone = document.getElementById("phone").value;
            dataDriver.driver.email = document.getElementById("email").value;
            dataDriver.driver.gender = document.getElementById("gender").value;
            dataDriver.driver.document = document.getElementById("cpf").value;

            formGroup.validate.PERSONAL_DATA = validateFormPersonalData(dataDriver);

            return formGroup.validate.PERSONAL_DATA;
        }
        if (!formGroup.validate.VALIDATE_NUMBER) {

            validateForm.verifyCode = document.getElementById("verifyCode").value;

            formGroup.validate.VALIDATE_NUMBER = verifyCode(validateForm);

            return formGroup.validate.VALIDATE_NUMBER;
        }
        if (!formGroup.validate.SAFETY) {

            elementProperty.getElement("#password", element => {
                dataDriver.driver.password = element.value;
            });

            formGroup.validate.SAFETY = verifyPassword(dataDriver);

            return formGroup.validate.SAFETY;
        }
        if (!formGroup.validate.COMPANY) {

            dataDriver.station.name = document.getElementById("nameStation").value;

            formGroup.validate.COMPANY = verifyCompany(dataDriver);

            return formGroup.validate.COMPANY;
        }

        if (!formGroup.validate.DOCUMENT) {

            dataDriver.driver.hasCardReader = document.getElementById("hasCardReader").value;

            formGroup.validate.DOCUMENT = verifyDocument(dataDriver);

            return formGroup.validate.DOCUMENT;
        }

        if (!formGroup.validate.TERMS) {

            elementProperty.getElement("#useTerm", element => {
                formGroup.validate.TERMS = element.checked;
                if (!element.checked) {
                    SwalCustom.messageDialog("Aceite os termos de condições do aplicativo para poder continuar ", "Atenção", () => {
                    }, "warning");
                }
            });

            return formGroup.validate.TERMS;
        }


        return true;
    }

    document.addEventListener("backbutton", function () {
        if (!formGroup.beforeGroup() || isFormFinish)
            Route.redirect("Main");
    });

    const inputCodes = document.getElementsByClassName("code-phone");

    elementProperty.addEventInElement(".code-phone", "oninput", function () {
        if (this.value.length === 0)
            return;

        const indexNextInput = parseInt(this.getAttribute("title")) + 1;

        validateForm.confirmationCode = `${inputCodes.item(0).value}${inputCodes.item(1).value}${inputCodes.item(2).value}${inputCodes.item(3).value}`;

        if (indexNextInput > inputCodes.length - 1) {
            formPass();
            return;
        }

        inputCodes[indexNextInput].focus();
    });

    estateController.getAll().then(result => {
        elementProperty.getElement("#ufWork", element => {
            element.innerHTML += `<option value="" disabled selected>UF</option>`;
            result.data.map(estate => {
                element.innerHTML += `<option value="${estate.id}">${estate.sigla}</option>`;
            });
            $('select').material_select();
        });
    });

    elementProperty.addEventInElement("#ufWork", "onchange", function () {

        dataDriver.driver.estateId = this.value;

        cityController.getAll(this.value).then(result => {
            const autocompleteCity = new Autocomplete();
            autocompleteCity.initAutocomplete("#cityWork", result.data, "nome", ["nome"]);

            autocompleteCity.getItemSelected(city => {
                dataDriver.driver.cityId = city.id;
                dataDriver.station.cityId = city.id;
            });
        })
    });

    stationTypeController.getAll().then(result => {
        elementProperty.getElement("#typeStation", element => {
            element.innerHTML += `<option value="" disabled selected>Ponto de origem</option>`;
            result.data.map(type => {
                element.innerHTML += `<option value="${type.idStationType}">${type.name}</option>`;
            });
            $('select').material_select();
        });
    });

    elementProperty.addEventInElement("#typeStation", "onchange", function () {
        dataDriver.station.stationTypeId = this.value;
        //stationController.getByCity(dataDriver.driver.cityId, this.value).then(showStation);
    });

    const showStation = result => {
        //const autocompleteStation = new Autocomplete();
        //autocompleteStation.initAutocomplete("#nameStation", result.data, "name", ["name"]);
        //autocompleteStation.getItemSelected(showCooperative);
    };

    elementProperty.getElement("#localReturn", element => {
        new MapService().importScriptWithPlaces().then(() => {
            const searchBox = new google.maps.places.SearchBox(element);

            searchBox.addListener('places_changed', function () {
                const places = searchBox.getPlaces();
                const place = places[0];

                dataDriver.station.address = element.value;
                dataDriver.station.longitude = place.geometry.location.lng();
                dataDriver.station.latitude = place.geometry.location.lat();
            });
        })
    });

    elementProperty.addEventInElement("#localReturn", "onfocus", function () {
        elementProperty.getElement("#groupReturnDriver", element => {
            setTimeout(function () {
                element.scrollTo(0, element.scrollHeight);
            }, 300)
        });
    });

    elementProperty.addEventInElement("#email", "onfocus", function () {
        elementProperty.getElement(".group-signup", element => {
            setTimeout(function () {
                element.scrollTo(0, element.scrollHeight);
            }, 300)
        });
    });



    const showCooperative = station => {
        dataDriver.driver.stationId = station.idStation;

        cooperativeController.getByStation(station.idStation).then(result => {
            const autocompleteCooperative = new Autocomplete();
            autocompleteCooperative.initAutocomplete("#cooperative", result.data, "name", ["name"]);
            autocompleteCooperative.getItemSelected(cooperative => {
                dataDriver.driver.cooperativeId = cooperative.idCooperative;
            })
        });
    };

    elementProperty.addEventInElement(".toggle-collapsible", "onclick", function () {
        const _that = this;

        elementProperty.getElement(this.getAttribute("href"), element => {
            if (element.classList.contains("active")) {
                disableAllCollapsible();
                return;
            }
            disableAllCollapsible();
            _that.innerHTML = "expand_less";
            element.classList.add("active");
        });
    });

    function disableAllCollapsible(){
        elementProperty.getElement(".body-collapsible",element=>{
            element.classList.remove("active");
        });
        elementProperty.getElement(".toggle-collapsible",element=>{
            element.innerHTML = "expand_more";
        });
    }

    elementProperty.addEventInElement(".btn-open-camera", "onclick", function () {
        const _that = this;
        startCamera(function (path) {

            FileUpload.getFile(path).then(file => {
                dataDriver.image[_that.getAttribute("value")] = file;
            });

            console.log(dataDriver);

            nextImage();
        });
    });


    function nextImage() {
        elementProperty.getElement(".body-collapsible", element => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
                element.parentElement.classList.add("checked")
            }
        });
    }

    function startCamera(callback) {
        openCamera(callback);
    }

    function setOptions(srcType) {
        return {
            // Some common settings are 20, 50, and 100
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true  //Corrects Android orientation quirks
        };
    }

    function openCamera(callback) {
        const srcType = Camera.PictureSourceType.CAMERA;
        const options = setOptions(srcType);
        options.targetHeight = 500;
        options.targetWidth = 500;

        navigator.camera.getPicture(callback, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    }


    window.addEventListener('keyboardDidShow', function () {
        elementProperty.getElement(".btn-next-signup", element => {
            element.classList.add("active");
        });
        elementProperty.getElement(".bottom-button", element => {
            element.classList.add("active");
        });
        elementProperty.getElement(".container-signup", element => {
            element.classList.add("active");
        });
    });

    window.addEventListener('keyboardDidHide', function () {
        elementProperty.getElement(".btn-next-signup", element => {
            element.classList.remove("active");
        });
        elementProperty.getElement(".bottom-button", element => {
            element.classList.remove("active");
        });
        elementProperty.getElement(".container-signup", element => {
            element.classList.remove("active");
        });
    });

});