function validateFormPersonalData(dataDriver) {


    if (!ValidateForm.validateNameComplete(dataDriver.driver.name)) {
        SwalCustom.messageDialog("Informe o nome do usuario completo", "Atenção", () => {
        }, "warning");
        return false;
    }
    if (!ValidateForm.validateCpf(dataDriver.driver.document.replace(/\D/g, ''))) {
        SwalCustom.messageDialog("Cpf informado inválido", "Atenção", () => {
        }, "warning");
        return false;
    }
    if (!ValidateForm.validateEmail(dataDriver.driver.email)) {
        SwalCustom.messageDialog("E-mail inválido", "Atenção", () => {
        }, "warning");
        return false;
    }
    if (!ValidateForm.validatePhone(dataDriver.driver.phone)) {
        SwalCustom.messageDialog("Telefone inválido", "Atenção", () => {
        }, "warning");
        return false;
    }

    if (dataDriver.driver.gender.length === 0) {
        SwalCustom.messageDialog("Selecione um gênero", "Atenção", () => {
        }, "warning");
        return false;
    }

    getVerifyCode(dataDriver);
    clearCode();

    return true;
}

function getVerifyCode(dataDriver) {
    const driverController = new DriverController();

    driverController.sendConfirmationCode(dataDriver.driver.phone).then(result => {
        document.getElementById("verifyCode").value = result.data.sms;
    });
}

function clearCode() {
    const elementProperty = new ElementProperty();

    elementProperty.getElement(".code-phone", element => {
        element.value = "";
    });
}

function verifyCode(validateForm) {
    if (validateForm.verifyCode.toString() === validateForm.confirmationCode ||
        Session.get("codeSupport") === validateForm.confirmationCode) {
        return true;
    }

    SwalCustom.messageDialog("Codigo invalido", "Atenção", () => {
    }, "info");
    return false;
}


function verifyPassword(dataDriver) {

    if (document.getElementById("repassowrd").value !== dataDriver.driver.password || dataDriver.driver.password.length === 0) {
        SwalCustom.messageDialog("As senhas não conferem", "Atenção", () => {
        }, "warning");
        return false;
    }
    return true;
}

function verifyCompany(dataDriver){
    if(dataDriver.driver.cityId === null){
        SwalCustom.messageDialog("Selecione uma cidade", "Atenção", () => {
        }, "warning");
        return false;
    }

    if(dataDriver.driver.stationId === null){
        SwalCustom.messageDialog("Selecione uma estação", "Atenção", () => {
        }, "warning");
        return false;
    }

    if(dataDriver.station.stationTypeId === null){
        SwalCustom.messageDialog("Selecione o tipo do ponto", "Atenção", () => {
        }, "warning");
        return false;
    }
    if(dataDriver.station.name.length === 0){
        SwalCustom.messageDialog("Informe o nome do ponto", "Atenção", () => {
        }, "warning");
        return false;
    }
    if(dataDriver.station.address.length === 0){
        SwalCustom.messageDialog("Informe o endereço do ponto", "Atenção", () => {
        }, "warning");
        return false;
    }
    return true;
}

function verifyDocument(dataDriver){
    if(dataDriver.image.CNH === null){
        SwalCustom.messageDialog("Retire uma foto  do seu CNH", "Atenção", () => {
        }, "warning");
        return false;
    }

    if(dataDriver.image.CRLV === null){
        SwalCustom.messageDialog("Retire uma foto do seu CRLV", "Atenção", () => {
        }, "warning");
        return false;
    }

    if(dataDriver.image.ALVARA === null){
        SwalCustom.messageDialog("Retire uma foto do seu ALVARA", "Atenção", () => {
        }, "warning");
        return false;
    }

    if(dataDriver.image.PROFILE === null){
        SwalCustom.messageDialog("Retire uma foto do seu rosto", "Atenção", () => {
        }, "warning");
        return false;
    }
    return true;
}