viewController.setObserver("transference", function () {

    $('.modal').modal();

    const elementProperty = new ElementProperty();

    const driverController = new DriverController();
    const withdrawController = new WithdrawController();
    const createAccount = new CreateAccount();

    const userLogged = Session.get("user");

    const touch = new EventTouche();

    const dataBank = {
        idBankAccount: ''
    };

    let balanceDrive = 0;

    let isTransfered = false;

    Mask.setMoneyField("#valueTransference");
    Mask.setMaxValue("#valueTransference", 2000);

    clearData();
    updateInfoDriver();

    PreloaderCustomer.show();

    window.addEventListener('keyboardDidShow', function () {
        elementProperty.getElement("#imgTransference", element => {
            element.style.display = "none";
        });

        elementProperty.getElement(".container-value-transference", element => {
            element.classList.add("active");
        });
    });

    window.addEventListener('keyboardDidHide', function () {
        elementProperty.getElement("#imgTransference", element => {
            element.style.display = "";
        });

        elementProperty.getElement(".container-value-transference", element => {
            element.classList.remove("active");
        });
    });

    elementProperty.addEventInElement(".back-to", "onclick", function () {
        Route.backPage();
    });

    elementProperty.getElement("#nameCPFTransference", element => {
        element.innerHTML = userLogged.document;
    });

    elementProperty.getElement("#nameClientTransference", element => {
        element.innerHTML = userLogged.name;
    });


    touch.addEventDistanceVertical("#btnIconMoney", (distance, element) => {
        if (distance > 150) {
            if (isTransfered)
                return;

            console.log(1);

            isTransfered = true;

            elementProperty.getElement("#valueTransference", input => {
                const valueTransference = Mask.removeMaskMoney(input.value);

                if (valueTransference <= 0) {
                    SwalCustom.messageDialog("Informe o valor de transferência", "Atenção", () => {
                        isTransfered = false;
                        element.classList.remove("active");
                    }, "info");
                    return;
                }

                if (balanceDrive < valueTransference) {
                    SwalCustom.messageDialog("Valor solicitado ultrapassa o saldo atual", "Atenção", () => {
                        isTransfered = false;
                        element.classList.remove("active");
                    }, "info");
                    return;
                }

                element.classList.add("active");

                setTimeout(function () {
                    requestTransference(valueTransference);
                }, 1200);
            });
        }
    });

    elementProperty.addEventInElement(".close-modal-transference", "onclick", function () {
        elementProperty.getElement("#containerReceiptTransference", element => {
            element.classList.remove("active");
        });
    });

    elementProperty.getElement("#dateTransference", element => {
        element.innerHTML = DateCustom.formatDate(DateCustom.getBusinessDay());
    });

    function updateInfoDriver() {
        driverController.findWithAccountInfo(userLogged.idDriver).then(({status, data}) => {
            PreloaderCustomer.hidden();
            if (!status) {
                createAccount.createSignUpAccount(updateInfoDriver);
                return;
            }

            dataBank.idBankAccount = parseInt(data.idBankAccount);

            elementProperty.getElement(".name-client-data", element => {
                element.innerHTML = data.holderName;
            });
            elementProperty.getElement(".transference-cpf", element => {
                element.innerHTML = data.document;
            });
            elementProperty.getElement(".name-bank-transference", element => {
                element.innerHTML = data.bankName;
            });
            elementProperty.getElement(".date-account-transference", element => {
                element.innerHTML = `${data.agency} ${data.op} ${data.numberAccount} ${data.numberAccountDigit}`;
            });
            elementProperty.getElement(".value-balance", element => {
                balanceDrive = parseFloat(data.balance);
                element.innerHTML = "R$"+Mask.maskMoney(balanceDrive);
            });
            elementProperty.getElement("#valueTransference", element => {
                element.value = Mask.maskMoney(parseFloat(data.balance));
            });
        });
    }

    function clearData() {
        elementProperty.getElement(".name-client-data", element => {
            element.innerHTML = "-";
        });
        elementProperty.getElement(".transference-cpf", element => {
            element.innerHTML = "-";
        });
        elementProperty.getElement(".name-bank-transference", element => {
            element.innerHTML = "-";
        });
        elementProperty.getElement(".date-account-transference", element => {
            element.innerHTML = `-`;
        });
        elementProperty.getElement(".value-balance", element => {
            balanceDrive = parseFloat(0);
            element.innerHTML = "-";
        });
        elementProperty.getElement("#valueTransference", element => {
            element.value = "0,00"
        });
    }

    function requestTransference(value) {
        withdrawController.actionNew(parseInt(userLogged.idDriver), parseFloat(value))
            .then(({message, status, data, errors}) => {
                isTransfered = false;

                elementProperty.getElement("#btnIconMoney", modal => {
                    modal.classList.remove("active");
                });

                updateInfoDriver();

                if (!status) {
                    SwalCustom.showMessageError(errors,"Valor Minimo : R$ "+Mask.maskMoney(data.minimunValue));
                    return;
                }

                showReceipt(value, data);

            });
    }

    function showReceipt(value, code) {
        elementProperty.getElement(".period-transference", element => {
            const dateTimeArray = DateCustom.formatDateTime().split(" ");
            element.innerHTML = `${dateTimeArray[0]}, às ${dateTimeArray[1]}`;
        });

        elementProperty.getElement(".value-integer", element => {
            element.innerHTML = parseInt(value);
        });

        elementProperty.getElement(".value-rest", element => {
            const rest = ((value - parseInt(value)) * 100);

            if (rest <= 0) {
                element.innerHTML = ",00";
                return;
            }

            element.innerHTML = "," + Mask.digitsToTheLeft(2, rest.toString());
        });
        elementProperty.getElement(".number-register-transference", element => {
            element.innerHTML = "Nº do recibo: " + CodeSecurity.clearConfirmationCode(code);
        });

        elementProperty.getElement("#containerReceiptTransference", modal => {
            modal.classList.add("active");
        });

        elementProperty.getElement(".name-client-data", element => {
            const content =
                `Ola ${element.innerHTML}.\nUma transfêrencia foi solicitada para sua conta.\n Em brever enviaremos o comprovate da mesma.\n`;

            codeSecutiry = CodeSecurity.clearConfirmationCode(code);
            elementProperty.addEventInElement("#shareReceipt", "onclick", function () {
                WithdrawController.actionFind(codeSecutiry).then(res => {
                    loadReceived(res , code);
                });
            });
        });
    }

    elementProperty.addEventInElement(".edit-account-bank", "onclick", function () {
        createAccount.createSignUpAccount(updateInfoDriver, true, dataBank.idBankAccount);
    });

    function loadReceived(res , code){

        window.plugins.socialsharing.shareWithOptions({
            message: "Comprovante de transferência",
            subject: 'TaxiReturn',
            url: `${HOST_SITE}document/receipt/${code}`,
        }, (result)=>{}, (error)=>{});

        // $('#modalReceivedTransfer').modal('open');

        // elementProperty.getElement('#codeVerify' , that => {
        //     that.innerHTML = code;
        // });
        //
        // elementProperty.getElement('#valueTranference' , that => {
        //     that.innerHTML = "R$ "+FormatNumber.cash(res.data.value);
        // });
        //
        // elementProperty.getElement('#agencia' , that => {
        //     that.innerHTML = res.data.agency;
        // });
        //
        // elementProperty.getElement('#account' , that => {
        //     that.innerHTML = res.data.numberAccount;
        // });
        //
        // elementProperty.getElement('#nameUser' , that => {
        //     that.innerHTML = res.data.name;
        // });

    }

});
