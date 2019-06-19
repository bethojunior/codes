viewController.setObserver("viewProfile", function () {

    const userData = Session.get("user");
    const elementProperty = new ElementProperty();
    let dataEdited = {};

    elementProperty.addEventInElement("#imageUserProfile" , "onclick" , editImageProfile);
    elementProperty.addEventInElement("#btnFooter" , "onclick" , editProfile);
    elementProperty.addEventInElement("#btnSave" , "onclick" , editProfile);

    window.addEventListener('keyboardDidShow', function () {
        elementProperty.getElement("#btnSave" , element => {
            element.style.display = "none";
        });
        elementProperty.getElement("#btnFooter" , element => {
            element.style.display = "block";
        });
    });

    window.addEventListener('keyboardDidHide', function () {
        elementProperty.getElement("#btnSave" , element => {
            element.style.display = "block";
        });
        elementProperty.getElement("#btnFooter" , element => {
            element.style.display = "none";
        });
    });

    if(userData.profileImage !== null){
        elementProperty.getElement("#imageUserProfile" , data => {
            data.src = PATH_IMAGE_PROFILE + userData.profileImage
        });
    }

    elementProperty.getElement('#nameProfileUser' , element => {
        element.value = userData.nickname;
    });

    elementProperty.getElement('#emailProfileUser' , element => {
        element.value = userData.email;
    });

    elementProperty.getElement('#phoneProfileUser' , element => {
        element.value = userData.phone;
    });

    function editProfile() {

        elementProperty.getElement('#nameProfileUser' ,  valueName => {
            dataEdited.name = valueName.value;
        });

        elementProperty.getElement('#emailProfileUser' , valueEmail => {
            dataEdited.email = valueEmail.value;
        });

        elementProperty.getElement('#phoneProfileUser' , valuePhone => {
            dataEdited.phone = valuePhone.value;
        });

        elementProperty.getElement('#passProfileUser'  ,  passValue => {
            if(passValue.value !== ""){
                dataEdited.password = passValue.value;
            }
        });

        dataEdited.idUser = userData.idUser;

        CustomerController.updateDataCustomer(dataEdited).then(res => {
           if(res.status){
               toastr.success('Dados atualizados com sucesso');
               return;
           };
           toastr.error('Erro ao atualizar dados');
        });

    }

    function editImageProfile() {
        const _that = this;
        startCamera(function (path) {
            FileUpload.getFile(path).then(file => {
                CustomerController.updatePhoto(userData.idCustomer, file).then(resolve => {
                    if (!resolve.status) {
                        swal("" , "Houve um erro ao enviar foto" , "info");
                        return;
                    }
                    elementProperty.getElement("#imageUserMenu" , data => {
                        data.src = PATH_IMAGE_PROFILE + resolve.data;
                    });
                    console.log(Session.get("user"));
                    Session.setAttribute('user', 'profileImage', resolve.data);
                    document.getElementById("imageUserProfile").src = PATH_IMAGE_PROFILE + resolve.data;
                    toastr.success('Foto de perfil atualizada com sucesso');
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

    elementProperty.addEventInElement(".go-back" , 'onclick' , function(){
        Route.backPage();
    });

    Route.pageDynamic();
});