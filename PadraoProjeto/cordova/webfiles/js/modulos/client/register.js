viewController.setObserver("signup",function () {

    const elementProperty = new ElementProperty();
    const customerController = new CustomerController();

    const managerSignUp = {
        emailValidate :  false,
        codeValidate : ""
    };

    elementProperty.addEventInElement('#cpf-user' , 'onblur' , () => {
        console.log("reste");
        elementProperty.getElement('#cpf-user' , res => {
            let document = res.value;
            data = {document};
            CustomerController.checkDocument(data).then(resolve => {
                if(resolve.status){
                    swal('ops' , 'Cpf já possui cadastro' , 'info');
                    res.value = "";
                    return;
                }
            });
        });
    });

    clearForm();

    elementProperty.addEventInElement("#btn-user-info", "onclick", function () {

        const user = {
            name: document.getElementById("name-user").value,
            nickname: "",
            document: document.getElementById("cpf-user").value,
            phone: document.getElementById("phone-user").value,
            email: document.getElementById("email-user").value,
            password: document.getElementById("password-user").value
        };

        if (!validateDataUser(user))
            return;

        confirmationNumberUser(user)


    });

    function confirmationNumberUser(user){
        getCodeConfirmation(user);

        elementProperty.addEventInElement("#getAnotherCode","onclick",function(){
            getCodeConfirmation(user);
        });

        elementProperty.addClass(".modal-confirmation-code","active");

        elementProperty.getElement("#numberPhone",element=>element.innerHTML = user.phone);

        elementProperty.addEventInElement("#codeNumber","onkeyup",function(){
            if(this.value.length === 4){
                validateCode(this.value,user);
            }
        })
    }

    function getCodeConfirmation(user){
        preload(true);
        customerController.sendConfirmationCode(user.phone).then(({status,data})=>{
            preload(false);
            if(!status)
                return;

            managerSignUp.codeValidate = data.sms;
        });
    }

    function validateCode(value,user){
        if(managerSignUp.codeValidate === parseInt(value)){
            registerClient(user);
            return;
        }
        SwalCustom.messageDialog("","Codigo invalido",undefined,"warning");
        elementProperty.getElement("#codeNumber",element=>element.value = "");
    }

    function registerClient(user){
        preload(true);

        customerController.register(user).then(({status, data, message}) => {
            if (!status) {
                preload(false);
                SwalCustom.messageDialog(message, "Atenção", undefined, "warning");
                return;
            }

            authenticate(user);
        });
    }

    elementProperty.addEventInElement("#email-user","onfocusout",function(){
        customerController.checkEmailSignup(this.value).then(({status})=>{
            managerSignUp.emailValidate = !status;
        });
    });

    function authenticate(user){
        customerController.authenticate({
            email   : user.email,
            password: user.password,
            deviceToken: Session.get("token")
        }).then(result => {
            if(!result.status){
                window.location = HOST;
                return;
            }
            SwalCustom.messageDialog("Cadastro realizado com sucesso","Atenção",function(){
                Session.set('user',result.data);
                Route.redirect("Client")
            },"success")
        })
    }


    function validateDataUser(user) {
        if (user.name.length === 0) {
            swal('Atenção', "Informe o nome do usuario", 'warning');
            return false;
        }
        user.nickname = user.name.split(" ")[0];

        if (user.email.length === 0) {
            swal('Atenção', "Informe o email", 'warning');
            return false;
        }
        if (!managerSignUp.emailValidate) {
            swal('Atenção', "E-mail já esta sendo utilizado", 'warning');
            return false;
        }
        if (user.document.length === 0) {
            swal('Atenção', "Informe o cpf", 'warning');
            return false;
        }
        if (user.phone.length === 0) {
            swal('Atenção', "Informe o telefone", 'warning');
            return;
        }
        if (user.password.length < 5) {
            swal('Atenção', "A senha deve contém pelo menos 5 digitos", 'warning');
            return false;
        }

        if (document.getElementById("confirm-password-user").value !== user.password) {
            swal('Atenção', "Senha de confirmação não corresponde a senha", 'warning');
            return false;
        }

        if (!checkCPF(user.document)) {
            swal('Atenção', 'CPF inválido', 'warning')
                .then(() => document.getElementById('document-bank').focus())
            return false;
        }

        return true;
    }

    elementProperty.addEventInElement(".go-back","onclick",function(){
        Route.backPage()
    });

    getMaskDataUser();

    function getMaskDataUser() {
        Mask.setMaskPhone("#phone-user");
        $('#cpf-user').mask('000.000.000-00')
    }

    function clearForm(){
        document.getElementById("name-user").value = "";
        document.getElementById("cpf-user").value = "";
        document.getElementById("phone-user").value = "";
        document.getElementById("email-user").value = "";
        document.getElementById("password-user").value = "";
        document.getElementById("codeNumber").value = "";
        document.getElementById("confirm-password-user").value = "";

        elementProperty.removeClass(".modal-confirmation-code","active");
    }


});