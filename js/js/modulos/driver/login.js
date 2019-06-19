Route.waitView().then(function () {

    $('.modal').modal();

    const elementProperty = new ElementProperty();

    const driverController = new DriverController();

    const connection = new NetworkConnection();

    const KEY_ENTER = 13;

    const push = new Push();

    elementProperty.getElement(".title-menu", element => {
        element.innerHTML = 'Login'
    });
    
    elementProperty.addEventInElement("#authenticateUser", "onclick", autheticate);

    elementProperty.addEventInElement(".back-to", "onclick", function () {
        Route.redirect("Main");
    });

    window.addEventListener('keyboardDidShow', function () {
        elementProperty.getElement("#authenticateUser", element => {
            element.classList.add("active");
        });
    });

    window.addEventListener('keyboardDidHide', function () {
        elementProperty.getElement("#authenticateUser", element => {
            element.classList.remove("active");
        });
    });

    elementProperty.addEventInElement(".custom", "onkeypress", function (event) {
        if (event.keyCode === KEY_ENTER) {
            const inputs = elementProperty.getElements(".custom")

            for (let i in inputs) {
                const input = inputs[i];

                if(input.value.length === 0){
                    input.focus();
                    return;
                }
            }
            autheticate();
        }
    });

    function autheticate() {

        const user = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            deviceToken: push.token,
            connection: connection.existConnection
        };

        if(!ValidateForm.validateEmail(user.email)){
            SwalCustom.messageDialog("E-mail informado invalido", "Atenção", () => {}, "warning");
            return
        }
        if(user.password.length <= 0){
            document.getElementById("password").focus();
            return;
        }

        document.getElementById("form-login").style.display = "none";
        document.getElementById("preloadLogin").style.display = "block";

        Log.write("Tentando fazer login", level.INFORMACAO, logType.PROCESS, user);

        driverController.authenticate(user).then(result => {
            document.getElementById("preloadLogin").style.display = "none";
            document.getElementById("form-login").style.display = "block";

            if (!result.status) {
                SwalCustom.messageDialog(result.message, "Atenção", () => {
                }, "info");
                return;
            }

            cordova.getAppVersion.getVersionNumber().then(function (version) {

                if(result.data.appVersion === version){
                    Session.set('user', result.data);
                    Route.redirect("Driver");
                    return;
                }

                Materialize.toast("Desculpe, atualize sua versão do aplicativo" , 1000);
                setTimeout(function(){
                    location.href = "https://play.google.com/store/apps/details?id=br.com.taxireturn.driver";
                },1000);

            });

        }).catch(error => {
            document.getElementById("form-login").style.display = "block";
            document.getElementById("preloadLogin").style.display = "none";
            SwalCustom.messageDialog(`Falha na comunicação com servidor`, "Atenção");
        })
    }

    function forgetPassword() {
        console.log("ok");
    }

    function failConnection() {
        SwalCustom.messageDialog("Sem conexão com internet!", "Atenção", () => {
        }, "info");
    }

    connection.obeserverConnection();

});
var emailUpdate = "";
var codeVerify = "";


function preload(status) {
    if (status) {
        document.getElementById("preloadLogin").style.display = "block";
        return;
    }
    document.getElementById("preloadLogin").style.display = "none";
}

function displayElement(elemento, estilo) {
    document.getElementById(elemento).style.display = estilo;
}

function forgetPassword() {
    $('#modalForgetPassword').modal('open');
}

function getCodeVerify() {

    emailUpdate = document.getElementById("emailForget").value;

    if(!ValidateForm.validateEmail(emailUpdate)) {
        SwalCustom.messageDialog("E-mail inválido", "Atenção", () => {
        }, "warning");
        return;
    }

    if (emailUpdate !== "") {
        preload(true);
        displayElement("contentModalOne", "none");

        DriverController.getCodeVerify(emailUpdate).then(result => {
            preload(false);
            if (result.status) {
                codeVerify = result.data.sms;
                displayElement("contentModalTwo", "block");
                return;
            }
            displayElement("contentModalOne", "block");
            $('#modalForgetPassword').modal('close');
            Materialize.toast("Desculpe, tente novamente mais tarde", 5000);
        });

        return;
    }

    Materialize.toast("Digite um email válido", 4000);

}

if (document.getElementsByClassName("readCode") !== null) {
    let index = 0;
    for (let i in document.getElementsByClassName("readCode")) {
        document.getElementsByClassName("readCode")[i].oninput = function () {
            if (document.getElementsByClassName("readCode")[3].value.length > 0) {
                return;
            }
            if (this.value.length > 0) {
                index++;
                document.getElementsByClassName("readCode")[index].focus();
            }
        }
    }
}

function checkCode() {
    preload(false);
    displayElement("contentModalTwo", "none");
    displayElement("contentModalTwo", "block");

    codeInput = document.getElementById("code0").value;
    codeInput += document.getElementById("code1").value;
    codeInput += document.getElementById("code2").value;
    codeInput += document.getElementById("code3").value;

    if (codeInput != codeVerify) {
        preload(false);
        Materialize.toast("Código inválido, tente novamente.", 1000);
        document.getElementById("code0").focus();
        document.getElementById("code0").value = "";
        document.getElementById("code1").value = "";
        document.getElementById("code2").value = "";
        document.getElementById("code3").value = "";
        return false;
    }

    displayElement("contentModalTwo", "none");
    displayElement("contentModalThree", "block");

    return true;
}


function checkPassword() {

    let passwordOne = document.getElementById("passwordForgetPass0");
    let passwordTwo = document.getElementById("passwordForgetPass1");

    if (passwordOne.value !== passwordTwo.value) {
        Materialize.toast("As senhas não coincidem", 1000);
        passwordOne.value = "";
        passwordTwo.value = "";
        return;
    }

    displayElement("contentModalThree", "none");
    preload(true);

    DriverController.updatePasswordById(emailUpdate, passwordTwo.value).then(result => {
        preload(false);
        if (result.status) {
            Materialize.toast("Email modificado com sucesso", 600);
            $('#modalForgetPassword').modal('close');
            return;
        }
        Materialize.toast("Desculpe, tente novamente mais tarde");
    });

}


