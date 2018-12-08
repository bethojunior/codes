class InfoClientTrip{

    static showArrivalClient(trip){
        const elementProperty = new ElementProperty();
        elementProperty.getElement(".modal-signaling-arrival",element=>element.classList.add("active"));

        elementProperty.getElement(".name-client-trip",element=>{
            element.innerHTML = trip.customer.nickname;
        });
        elementProperty.getElement(".image-profile-driver",element=>{
            if(trip.customer.profileImage === null){
                element.src = 'webfiles/img/icon/default.jpg';
                return;
            }
            element.src = CLIENT_PROFILE + trip.customer.profileImage;
        });
        elementProperty.addEventInElement(".phone-driver","onclick",function(){
            location.href = "tel:"+trip.customer.phone;
        });
        elementProperty.addEventInElement(".chat-driver","onclick",function(){
            Route.redirectDynamic("Driver", "Chat");
            InfoClientTrip.closeArrivalClient();
        });
        elementProperty.addEventInElement(".close-modal-arrival","onclick",function(){
            InfoClientTrip.closeArrivalClient();
        });
    }

    static closeArrivalClient(){
        const elementProperty = new ElementProperty();
        elementProperty.getElement(".modal-signaling-arrival",element=>element.classList.remove("active"));
    }

    static showDataClientTrip(trip){
        const elementProperty = new ElementProperty();
        elementProperty.getElement(".modal-data-client",element=>element.classList.add("active"));

        elementProperty.getElement(".name-client-trip",element=>{
            element.innerHTML = trip.customer.nickname;
        });
        elementProperty.getElement(".origin-client",element=>{
            element.innerHTML = trip.origin.address;
        });
        elementProperty.getElement(".destination-client",element=>{
            element.innerHTML = trip.destination.name;
        });
        elementProperty.getElement(".image-profile-driver",element=>{
            if(trip.customer.profileImage === null){
                element.src = 'webfiles/img/icon/default.jpg';
                return;
            }
            element.src = CLIENT_PROFILE + trip.customer.profileImage;
        });
        elementProperty.addEventInElement(".image-profile-driver","onerror",function(){
            this.src = 'webfiles/img/icon/default.jpg';
        });
        elementProperty.getElement(".price-trip",element=>{
            element.innerHTML = `<span>R$</span>${Mask.maskMoney(parseFloat(trip.price))}`;
        });

        elementProperty.addEventInElement(".close-data-client","onclick",function(){
            InfoClientTrip.closeDataClient();
        });
        elementProperty.getElement(".payment-data-client",element=>{
            element.innerHTML = `Pagamento em ${trip.tripPaymentForm}`
        })
    }

    static closeDataClient(){
        const elementProperty = new ElementProperty();
        elementProperty.getElement(".modal-data-client",
                element=>element.classList.remove("active"));
    }
}