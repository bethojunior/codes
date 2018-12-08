$(document).ready(function () {

    const dataUser = Session.get('user');
    const elementProperty = new ElementProperty();
    const idUser = dataUser.idUser;
    const idDriver = dataUser.idDriver;
    console.log(dataUser);
    if (dataUser.profileImage !== null)
        document.getElementById("openCameraProfile").src = PATH_IMAGE + dataUser.profileImage;
    document.getElementById("name").value = dataUser.nameUser;
    document.getElementById("email").value = dataUser.email;
    document.getElementById("phone").value = dataUser.phone;

    elementProperty.addEventInElement('#phone' , 'oninput' , function(){
        Mask.setMaskPhone(phone);
    });

    elementProperty.addEventInElement(".showSave", "onclick", function () {
        document.getElementById("btnSalvar").style.display = "block";
    });

    elementProperty.addEventInElement('#email' , 'onblur' , () => {
        validateEmail();
    });

    function validateEmail(){
        elementProperty.getElement('#email' , field => {
            if(!ValidateForm.validateEmail(field.value)){
                swal("Email inválido" , "Digite um email válido" , "info");
            }
        });
    }

    elementProperty.addEventInElement("#btnSalvar", "onclick", function () {

        if(!validateEmail()){
            return;
        }

        let dataDriver = {};

        dataDriver.driverId = idDriver;
        dataDriver.name = document.getElementById("name").value;
        dataDriver.email = document.getElementById("email").value;
        dataDriver.phone = document.getElementById("phone").value;

        let password = document.getElementById("password").value;

        if (password !== "") {
            dataDriver.password = password;
        }



        DriverController.updateDataDriver(dataDriver).then(resolve => {
            document.getElementById("btnSalvar").style.display = "none";
            if (!resolve.status) {
                Materialize.toast("Desculpe, tente novamente mais tarde", 1000);
                return;
            }
            Materialize.toast("Dados alterados com sucesso", 1000);
        });

    });

    elementProperty.addEventInElement("#openCameraProfile", "onclick", editImageProfile);
    elementProperty.addEventInElement("#btnEditPhoto", "onclick", editImageProfile);

    function editImageProfile() {
        const _that = this;
        startCamera(function (path) {
            FileUpload.getFile(path).then(file => {
                DriverController.updatePhoto(idDriver, file).then(resolve => {
                    if (!resolve.status) {
                        Materialize.toast("Houve um erro ao enviar foto", 6000);
                        return;
                    }
                    Session.setAttribute('user', 'profileImage', resolve.data);
                    console.log(dataUser['profileImage']);
                    document.getElementById("openCameraProfile").src = PATH_IMAGE + resolve.data;
                    Materialize.toast("Foto atualizada", 6000);
                });
            });

        });
    }


    function startCamera(callback) {
        const srcType = Camera.PictureSourceType.CAMERA;
        const options = setOptions(srcType);
        options.targetHeight = 500;
        options.targetWidth = 500;

        navigator.camera.getPicture(callback, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    }


    function setOptions(srcType) {
        return {
            // Some common settings are 20, 50, and 100
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true  //Corrects Android orientation quirks
        };
    }


});

function comeBackIndexChat() {
    Route.backPage();
}