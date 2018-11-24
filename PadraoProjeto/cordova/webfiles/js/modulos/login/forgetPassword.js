const elementProperty = new ElementProperty();
let codeVerify;
let email;

elementProperty.addEventInElement('#checkEmail', 'onclick', event => {
    optionPreload.show();
    email = document.getElementById("email").value;

    CustomerController.ForgotPassword(email).then(res => {
        if(res.status){
            codeVerify = res.data.code;
            secondPass();
            return;
        }
        optionPreload.hidde();
        swal("ops" , "Email inválido" , "error");
    })

});

function secondPass() {
    optionPreload.hidde();
    document.getElementById("passCheckEmail").style.display = "none";
    document.getElementById("secondPass").style.display = "block";
}

function thirdPass() {
    optionPreload.hidde();
    document.getElementById("secondPass").style.display = "none";
    document.getElementById("thirdPass").style.display = "block";
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

document.getElementById("code3").addEventListener("input" , function() {
    if(this.value.length >= 1){
        checkCode();
        return;
    }
    swal("Ops" , "Código inválido" , "error");
});

elementProperty.addEventInElement("#checkCode" , "onclick" , function(){
    checkCode();
});

elementProperty.addEventInElement("#savePassword" , "onclick" , function(){
    let passOne = document.getElementById("passwordOne").value;
    let passTwo = document.getElementById("passwordTwo").value;

    if(passOne !== passTwo){
        swal("ops" , "As senhas não coincidem" , "info");
        return;
    }

    changePasword(passOne);
});

function checkCode() {
    optionPreload.show();
    let code = document.getElementById("code0").value;
    code += document.getElementById("code1").value;
    code += document.getElementById("code2").value;
    code += document.getElementById("code3").value;

    if(parseInt(code) === parseInt(codeVerify)){
        thirdPass();
        return;
    }
    optionPreload.hidde();
    swal("ops" , "Código inserido incorreto" , "error");
}

function changePasword(password) {
    optionPreload.show();
    data = {password , email};
    CustomerController.ChangePassword(data).then(resolve => {
        optionPreload.hidde();
        if(resolve.status){
            swal("" , resolve.message , "success");
            setTimeout(function(){
                window.location.href = "index.html";
            },3000);
            return;
        }
        swal("ops" , resolve.message , "error");
    });
}