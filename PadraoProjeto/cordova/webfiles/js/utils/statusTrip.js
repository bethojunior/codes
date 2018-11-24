const STATUS_SEARCHING = "searching";
const STATUS_ACCEPTED = "accepted";
const STATUS_BOARDING = "boarding";
const STATUS_IN_PROGRESS = "in_progress";
const STATUS_FINISHED = "finished";
const STATUS_CANCELED = "canceled";
const TYPE_RETURN_ID = "1";

function showStatusTrip(status) {
    viewController.elementProperty.getElement(".description-title", element => {
        switch (status) {
            case STATUS_BOARDING : {
                element.innerHTML = "Seu carro estar te aguardando";
                break;
            }
            case STATUS_IN_PROGRESS : {
                element.innerHTML = "Você estar no percuso do seu destino";
                break;
            }
        }
    })
}