viewController.setObserver("account", function () {
    const userLogged = Session.get("user");

    const elementProperty = new ElementProperty();
    const balanceController = new BalanceController();

    PreloaderCustomer.show();

    balanceController.lastDriverTransactions(userLogged.idDriver).then(({data, status}) => {
        PreloaderCustomer.hidden();
        if (!status)
            return;

        elementProperty.getElement("#balanceDriver", element => {
            console.log(parseFloat(data.balance.balance),data.balance.balance)
            element.innerHTML = Mask.maskMoney(parseFloat(data.balance.balance));
        });

        elementProperty.getElement("#listLastTransactions", element => {

            element.innerHTML = '';

            const iconTransaction = {
                '6': 'type-red',
                '9': 'type-green',
                '10':'type-grey'
            };

            data.transactions.map(transaction => {

                element.innerHTML +=
                    `<li>
                    <div class="cicler-customer v${transaction.balanceFlowTypeId}" 
                    classCustomer="${transaction.balanceFlowTypeId}"
                        color="${transaction.color}"></div>
                    <div class="container-info-transition">
                        <div class="time-transition">${transaction.date}</div>
                        <div class="description-transition">${transaction.summary}</div>
                        <div class="value-transition">${Mask.maskMoney(parseFloat(transaction.value))}</div>
                    </div>
                </li>`;
            })

            elementProperty.getElement(".cicler-customer",elementCss=>{
                document.styleSheets[0].addRule(
                    `.body-account > ul > li > .cicler-customer.v${elementCss.getAttribute("classCustomer")}:before`,
                    `background-color: ${elementCss.getAttribute("color")}`);
            })

        })

    });

    elementProperty.addEventInElement(".back-to", "onclick", function () {
        Route.backPage();
    });

    elementProperty.addEventInElement("#filterExtract","onclick",function(){
        viewController.addParams("filter-extract",undefined);
        Route.redirectDynamic("Financial","FilterExtract");

    });

    elementProperty.addEventInElement("#filterBy","onclick",function(){
        viewController.addParams("filter-extract",undefined);
        Route.redirectDynamic("Financial","Filter")
    });
    elementProperty.addEventInElement("#btnTransference","onclick",function(){
        Route.redirectDynamic("Financial","Transference")
    });

    Route.pageDynamic();
});