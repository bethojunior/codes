viewController.setObserver("login", function () {
    const elementProperty = new ElementProperty();
    const customerController = new CustomerController();
    const WIDTH = screen.width;

    let userGoogle;
    let statusLoginGoogle = false;

    if (Session.get('user').length > 0) {
        window.location = HOST + "call";
    }

    const dataLogin = {
        email: '',
        password: '',
        deviceToken: Session.get("token")
    };

    elementProperty.addEventInElement('.verify-email', 'onclick', () => {
        dataLogin.email = document.getElementById('email').value;
        checkEmail(dataLogin.email)
    });

    elementProperty.addEventInElement('#email', 'onkeypress', event => {

        const email = document.getElementById('email').value;
        dataLogin.email = email;

        Handle.handleEnter(event)
            .then(() => checkEmail(email))

    });

    elementProperty.addEventInElement('#password', 'onkeypress', (event) => {
        dataLogin.password = document.getElementById('password').value;
        dataLogin.email = document.getElementById('email').value;

        Handle.handleEnter(event)
            .then(() => auth(dataLogin))
    });

    function checkEmail(email) {
        customerController.checkEmail(email).then(result => {
            if (result.status) {
                dataLogin.email = email;
                showPassword()
                document.getElementById('password').focus()
                return
            }
            swal("ops", "Usuário e/ou senha inválidos", "info");
        }).catch((message)=>{
            swal(message,"","warning")
        })
    }


    function auth(dataLogin) {
        customerController.authenticate(dataLogin).then(result => {
            if (!result.status) {
                swal("ops", "Usuário e/ou senha inválidos", "info");
                return;
            }
            Session.set('user', result.data);
            window.location = HOST;
        }).catch((message)=>{
            swal(message,"","warning")
        })
    }

    function showPassword() {
        elementProperty.getElement('.data-login', (element, index) => {
            if (index === 0) {
                element.style.display = "none";
            }
            if (index === 1) {
                element.style.display = "block";
            }
        });
    }

    function resolution() {
        if (WIDTH > 991) {
            document.getElementById("menuLogin").style.display = "block";
        }
    }

    resolution();

    elementProperty.addEventInElement('.authenticate-user', 'onclick', () => {
        dataLogin.password = document.getElementById('password').value;
        dataLogin.email = document.getElementById('email').value;


        auth(dataLogin)
    });

    function signFacebook() {

        optionPreload.show();

        window.fbAsyncInit = function () {

            FB.init({
                appId: ID_FACEBOOK,
                xfbml: true,
                version: 'v2.5'
            });

            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    getInfo(false);
                    return;
                }
                connectFacebook();
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        function connectFacebook() {
            FB.login(function (response) {
                if (response.status === 'connected') {
                    getInfo(true);
                    return;
                }
            }, {scope: 'email'});

        }

        function getInfo(scop) {

            FB.api('/me', 'GET', {
                locale: 'pt_BR',
                fields: 'first_name,last_name,name,email,picture'
            }, function (response) {

                optionPreload.hidde();

                let name = response.name;
                let email = response.email;
                let nickname = response.first_name;
                let dataUser = {email, name, nickname};

                customerController.authenticateSocial(dataUser).then(res => {
                    if (res.status) {
                        Session.set('user', res.data);
                        window.location = HOST;
                    }
                });

            });
        }

    }

    function signGoogle(googleUser) {

        let profile = googleUser.getBasicProfile();

        let name = profile.getName();
        let nickname = profile.getGivenName();
        let email = profile.getEmail();

        userGoogle = {email, name, nickname};

        /* if(userGoogle !== null){
             SwalCustom.dialogConfirm("Olá " + name , "você está logado pelo Google, deseja continuar assim?" , function(data){
                 if(data){
                     loginGoogle();
                     return;
                 }
             });
         }*/

        if (statusLoginGoogle) {
            customerController.authenticateSocial(userGoogle).then(res => {
                if (res.status) {
                    Session.set('user', userGoogle);
                    window.location = HOST;
                }
            });
        }

    }

    function loginGoogle() {

        statusLoginGoogle = true;

        customerController.authenticateSocial(userGoogle).then(res => {
            if (res.status) {
                Session.set('user', userGoogle);
                window.location = HOST;
            }
        });
    }


    Route.pageDynamic();
});