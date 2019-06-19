function showPriceTrip(originTrip, destinationTrip) {

    const priceController   = new PriceController();

    preload(true);

    const origin = {
        address: document.getElementById("origin").value,
        latitude: originTrip.lat,
        longitude: originTrip.lng
    };
    const destination = {
        address: document.getElementById("destination").value,
        latitude: destinationTrip.lat,
        longitude: destinationTrip.lng
    };

    return new Promise(resolve => {
        priceController.calculateAll(origin, destination).then(({message, status, data}) => {
            preload(false);

            if (!status) {
                document.getElementById("origin").disabled = false;
                document.getElementById("destination").disabled = false;
                SwalCustom.messageDialog(message, "Atenção", undefined, "warning");
                return;
            }
            viewController.elementProperty.getElement("#callRunning", element => {
                element.setAttribute("class", "container-logo");
            });

            viewController.elementProperty.getElement(".type-cars", element => {
                element.innerHTML = data.prices.map(object => {
                    let className = "";
                    if (object.tripTypeId === TYPE_RETURN_ID) {
                        className = "active";
                    }

                    return `<div class="trip-type ${className}"
                        value='${JSON.stringify(object)}'>
                    <img src="webfiles/img/logo/return-${object.tripTypeId}.png">
                    <p><span>R$</span>${Mask.maskMoney(object.price)}</p>
                </div>`;
                }).join("");
            });

            resolve(data);

        }).catch(errorCaculatePrice);
    });
}

function errorCaculatePrice() {
    preload(false);
    document.getElementById("origin").disabled = false;
    document.getElementById("destination").disabled = false;
    SwalCustom.messageDialog("","Ocorreu um error ao tentar calcular o preços da rota");
}