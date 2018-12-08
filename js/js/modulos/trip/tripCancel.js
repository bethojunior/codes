$(document).ready(function () {
    const userLogged = Session.get("user");

    const cancelTrip = {
        driverId : parseInt(userLogged.idDriver),
        tripReference: "",
        cancellationReasonsId : null
    };

    const elementProperty = new ElementProperty();
    const driverController = new DriverController();
    const cancellationReasonsController = new CancellationReasonsController();

    cancellationReasonsController.GetAll().then(result=>{
        elementProperty.getElement(".options-cancel-default",elementContainer=>{
            elementContainer.innerHTML = "";

            result.data.map(cancellation=>{
               elementContainer.innerHTML += `<li class="option-cancel" 
                    value="${cancellation.idCancellationReasons}">${cancellation.name}</li>`;
            });

            initEventSelectedCancellation();
        });
    }).catch(error=>{
        console.log(error)
    });

    function initEventSelectedCancellation(){
        elementProperty.addEventInElement(".option-cancel","onclick",function(){
            elementProperty.getElement(".option-cancel",element=> element.classList.remove("active"));

            this.classList.add("active");

            cancelTrip.cancellationReasonsId = parseInt(this.getAttribute("value"));
        });
    }

    elementProperty.addEventInElement(".btn-cancel-trip", "onclick", () => {
        const trip = Session.get("tripDriver");

        if(cancelTrip.cancellationReasonsId === null){
            SwalCustom.messageDialog("Selecione um motivo do cancelamento","Atenção");
            return;
        }

        cancelTrip.tripReference = trip.tripReference;

        driverController.cancelTrip(cancelTrip,result => {
        });
        elementProperty.visibleElements([".container-cancel-trip",".container-info-trip"],false);
        elementProperty.getElement(".option-cancel",element=> element.classList.remove("active"));
        cancelTrip.cancellationReasonsId = null;


    });
    elementProperty.addEventInElement(".close-cancel-trip", "onclick", () => {
        elementProperty.visibleElements([".container-cancel-trip"],false);
    });
});