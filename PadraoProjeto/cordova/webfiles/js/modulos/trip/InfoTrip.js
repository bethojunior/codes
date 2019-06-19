class InfoTrip {
    static showArrivalDriver(){
        viewController.elementProperty.addClass(".modal-signaling-arrival","active");

        viewController.elementProperty.getElement("#songCallTaxi",element=>{
            element.play();
        });

        viewController.elementProperty.addEventInElement(".close-modal-arrival", "onclick", function(){
            InfoTrip.closeArrivalDriver();
        });
    }

    static closeArrivalDriver(){
        viewController.elementProperty.getElement("#songCallTaxi",element=>{
            element.pause();
        });

        viewController.elementProperty.removeClass(".modal-signaling-arrival","active");
    }
}