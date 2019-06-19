viewController.setObserver("extract-financial",
    function ({driverInfo, transactions, paginate, userLogged, dateInterval, flow}) {
        const elementProperty = new ElementProperty();
        const paginateService = new PaginateService();
        const balanceController = new BalanceController();

        elementProperty.getElement("#nameClientExtract", element => {
            element.innerHTML = driverInfo.name;
        });

        elementProperty.getElement("#cpfClientExtract", element => {
            element.innerHTML = driverInfo.document;
        });

        elementProperty.getElement("#periodExtract", element => {
            element.innerHTML = driverInfo.period;
        });

        elementProperty.getElement(".value-balance", element => {
            element.innerHTML = Mask.maskMoney(parseFloat(driverInfo.balance));
        });

        elementProperty.getElement("#totalCredit", element => {
            element.innerHTML = Mask.maskMoney(parseFloat(driverInfo.total_credit));
        });
        elementProperty.getElement("#totalDebit", element => {
            element.innerHTML = Mask.maskMoney(parseFloat(driverInfo.total_debit));
        });
        elementProperty.getElement("#pendingBalanceWithdraw", element => {
            element.innerHTML = Mask.maskMoney(parseFloat(driverInfo.blockedBalance));
        });

        paginateService.setList(paginate, "#listTransactionsExtract", (transaction, element) => {
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
            initColors();
        });



        paginateService.setNewPage(transactions);
        paginateService.updatePage(page => {
            elementProperty.getElement("#preloadExtract",element=>{
                element.style.display = "block";
            });

            balanceController.driverTransactions(userLogged.idDriver, dateInterval, page, flow)
                .then(({status, data}) => {
                    paginateService.setNewPage(data.transactions);
                    elementProperty.getElement("#preloadExtract",element=>{
                        element.style.display = "none";
                    });
                });
        });

        elementProperty.addEventInElement(".back-to", "onclick", function () {
            Route.backPage();
            elementProperty.getElement("#listTransactionsExtract", element => {
                element.scrollTop = 0;
                element.innerHTML = '';
            });
        });

        function initColors(){
            elementProperty.getElement(".cicler-customer",elementCss=>{
                document.styleSheets[0].addRule(
                    `.body-account > ul > li > .cicler-customer.v${elementCss.getAttribute("classCustomer")}:before`,
                    `background-color: ${elementCss.getAttribute("color")}`);
            });
        }

        Route.pageDynamic();
    });