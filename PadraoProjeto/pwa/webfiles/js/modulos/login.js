const elementProperty = new ElementProperty();
const userController = new UserController();
const customerController = new CustomerController();
const WIDTH = screen.width;

let userGoogle = null;
let loggedfFacebook = false;
let statusLoginGoogle = false;

if (Session.getCookie('user') !== undefined) {
    window.location = HOST_PWA + "call";
}

const dataLogin = {
    email: '',
    password: ''
};
elementProperty.getElement("#checkMobile",element=>{
    element.style.display = "block";
})


elementProperty.addEventInElement('.verify-email', 'onclick', () => {
    dataLogin.email = document.getElementById('email').value;
    checkEmail(dataLogin.email)
});

elementProperty.addEventInElement('#email', 'onkeypress', event => {

    const email = document.getElementById('email').value
    dataLogin.email = email

    Handle.handleEnter(event)
        .then(() => checkEmail(email))

});

if (isMobile()) {
    elementProperty.addEventInElement(".input-login", "onfocus", function () {
        elementProperty.getElement(".btn-login", element => {
            element.classList.add("active");
        });
    });
    elementProperty.addEventInElement(".input-login", "onclick", function () {
        setTimeout(function () {
            window.scrollTo(0, document.body.scrollHeight);
        }, 500);
    })
}

elementProperty.addEventInElement('#password', 'onkeypress', (event) => {
    const inputPassword = document.getElementById('password')
    dataLogin.password = inputPassword.value

    Handle.handleEnter(event)
        .then(() => auth(dataLogin))
})

function checkEmail(email) {
    userController.checkEmail(email, result => {
        if (result.status) {
            showPassword()
            document.getElementById('password').focus()
            return
        }
        Materialize.Toast.removeAll();
        Materialize.toast('Email inválido', 3000)
    })
}

function auth(loginObj) {
    customerController.loginPartner(loginObj, result => {
        if (!result.status) {
            Materialize.Toast.removeAll();
            Materialize.toast(result.message, 3000);
            return;
        }
        Session.setCookie('user', result.data);

        window.location = HOST_PWA;
    })
}

function showPassword() {
    elementProperty.getElement('.data-login', (element, index) => {
        if (index === 0) {
            element.style.display = "none";
        }

        if (index === 1) {
            element.style.display = "block";
            element.focus();
            setTimeout(function () {
                window.scrollTo(0, document.body.scrollHeight);
            }, 500);
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
    const inputPassword = document.getElementById('password');
    dataLogin.password = inputPassword.value;

    auth(dataLogin)
});


function signFacebook() {

   //optionPreload.show();

    connectFacebook();

}

window.fbAsyncInit = function () {

    FB.init({
        appId: ID_FACEBOOK,
        xfbml: true,
        version: 'v2.5'
    });
};

function connectFacebook() {
    FB.login(function (response) {
        if (response.status === 'connected') {
            getInfo(true);
        }
    }, {scope: 'email'});

}

function getInfo(scop) {

    FB.api('/me', 'GET', {locale: 'pt_BR', fields: 'first_name,last_name,name,email,picture'}, function (response) {

        //optionPreload.hidde();

        //informar que está logando via facebook

        let name = response.name;
        let email = response.email;
        let nickname = response.first_name;
        let dataUser = {email, name, nickname};

        customerController.authenticateSocial(dataUser).then(res => {
            if (res.status) {
                Session.setCookie('user', res.data);
                window.location = HOST_PWA;
                return;
            }
            Materialize.toast(res.message, 8000);
        });

    });
}

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


function signGoogle(googleUser) {

    let profile = googleUser.getBasicProfile();

    let name = profile.getName();
    let nickname = profile.getGivenName();
    let email = profile.getEmail();

    userGoogle = {email, name, nickname};

    if (statusLoginGoogle) {
        loginGoogle();
        return;
    }

/*    if (userGoogle !== null) {

        SwalCustom.dialogConfirm("Olá " + name, "você está logado pelo Google, deseja continuar assim?", function (data) {
            if (!data)
                return;

            loginGoogle();
        });

    }*/
};

function loginGoogle() {

    statusLoginGoogle = true;

    customerController.authenticateSocial(userGoogle).then(res => {
        if (res.status) {
            Session.setCookie('user', res.data);
            window.location = HOST_PWA;
            return;
        }
        Materialize.toast(res.message, 8000);
    });

}