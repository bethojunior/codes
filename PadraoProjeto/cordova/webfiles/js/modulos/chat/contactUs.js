viewController.setObserver("contact-us", function () {

    const elementProperty = new ElementProperty();
    const btnKey = document.getElementById("buttonKeyboard");
    const userData = Session.get("user");
//StatusBar.overlaysWebView(true);

    window.addEventListener('keyboardDidShow', function () {
        btnKey.style.display = "block";
        document.getElementById("buttonSend").style.display = "none";
    });

    window.addEventListener('keyboardDidHide', function () {
        btnKey.style.display = "none";
        document.getElementById("buttonSend").style.display = "block";
    });

    elementProperty.addEventInElement("#buttonKeyboard", "onclick", function () {
        sendMessage();
    });

    elementProperty.addEventInElement("#buttonSend", "onclick", function () {
        sendMessage();
    });

    elementProperty.addEventInElement(".go-back", "onclick", function () {
        Route.backPage();
    });

    function sendMessage() {

        const userId = userData.idUser;
        const bodyText = document.getElementById("textClient");
        let message = bodyText.value;

        if (bodyText.value.length < 10) {

            optionPreload.show();
            const data = {userId, message};

            CustomerController.sendEmail(data).then(res => {
                optionPreload.hidde();
                if (res.status) {
                    elementProperty.getElement("#sending" , data => {
                        data.innerHTML = "";
                    });
                    elementProperty.getElement("#textClient", data => {
                        data.value = "";
                    });
                    swal("", "Email enviado com sucesso", "success");
                    return;
                }
                optionPreload.hidde();
                swal("ops", "Você precisa escrever algum comentário", "info");
            });
        }

    }
});