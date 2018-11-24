function initTrip(trip) {

    return new Promise((resolve,reject) => {
        if (!validateTrip(trip)){
            preload(false);
            return;
        }

        new CustomerController().actionNew({...trip}).then(resolve).catch(function(message,error){
            reject(error,message);
        });
    })
}

/**
 *
 * @param trip
 * @returns {boolean}
 */
function validateTrip(trip) {
    if (trip.userId === null) {
        SwalCustom.messageDialog("Error ao tentar confirmar corrida", "Atenção", undefined, "warning");
        return false;
    }
    if (trip.tripPaymentFormId === null) {
        SwalCustom.messageDialog("Informe a forma de pagamento", "Atenção", undefined, "warning");
        return false;
    }
    if (trip.tripTypeId === null) {
        SwalCustom.messageDialog("Informe o tipo da corrida", "Atenção", undefined, "warning");
        return false;
    }

    return true;
}