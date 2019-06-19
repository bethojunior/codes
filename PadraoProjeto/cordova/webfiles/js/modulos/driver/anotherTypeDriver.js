function selectAnotherTypeDriver(managerTrip, user) {

    return new Promise(resolve => {
        viewController.elementProperty.removeClass(".preloader-search-trip", "active");

        preload(true);

        new CustomerController().actionCancel(managerTrip.tripCurrent.tripReference, user.idUser, DateCustom.getNow())
            .then(function ({status, data}) {
                preload(false);
                if (!status) {
                    SwalCustom.messageDialog("Ocorreu um erro ao tentar cancelar viagem", "Atenção", undefined, "warning");
                    return;
                }

                showAnotherPrice(managerTrip);

                resolve();

            }).catch(function () {
            preload(false);
            SwalCustom.messageDialog("Ocorreu um erro ao tentar cancelar viagem", "Atenção", undefined, "warning");
        });
    });
}

function showAnotherPrice(managerTrip) {

    viewController.elementProperty.getElement("#typeOtherReturn", element => {
        element.innerHTML = managerTrip.prices
            .filter(item => item.tripTypeId !== managerTrip.tripCurrent.tripTypeId).map(item => {
                return `<li class="trip-another-type" value='${JSON.stringify(item)}'>
                    <img src="${HOST}webfiles/img/logo/return-${item.tripTypeId}.png">
                    <p><span>R$</span>${Mask.maskMoney(item.price)}</p>
                    </li>`
            });
    });

    viewController.elementProperty.addClass(".modal-switch-type-return", "active");
    viewController.elementProperty.getElement("#typeTaxiSelected", element => {
        element.innerHTML = managerTrip.typeTaxi.priceName;
    });

    viewController.elementProperty.addEventInElement("#cancelAnotherTrip", "onclick", function () {
        viewController.elementProperty.removeClass(".modal-switch-type-return", "active");
    });

    viewController.elementProperty.addEventInElement(".trip-another-type", "onclick", function () {
        viewController.elementProperty.removeClass(".modal-switch-type-return", "active");

        const type = JSON.parse(this.getAttribute("value"));

        const trip = Session.get("lastTrip");

        trip.price = type.price;
        trip.tripTypeId = type.tripTypeId;

        initNewTrip(trip);
    });
}