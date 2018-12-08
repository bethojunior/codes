viewController.setObserver("chat-trip",function () {

    const chatTripController = new ChatTripController();

    const chatTripSocket = new WebSocketPusher(keyChatTrip);

    chatTripSocket.setChannel("chat-channel");

    const trip = Session.get("tripDriver");

    chatTripSocket.stopWebSocket(trip.tripReference);

    const userLogged = Session.get("user");

    const elementProperty = new ElementProperty();

    elementProperty.addEventInElement(".close-chat-trip", "onclick", closeChat);
    elementProperty.addEventInElement(".btn-send-message", "onclick", sendMessage);

    clearMessage();


    chatTripSocket.observerSocket(trip.tripReference, result => {
        console.log(result);
        addMessage(result.message.message,
            DateCustom.getTimeNow(result.message.date),
            result.message.userId === userLogged.idUser);
    });

    chatTripController.getMessages(trip.tripReference, result => {
        if (!result.status) {
            return;
        }

        clearMessage();

        result.data.map(item => {
            addMessage(item.message,
                DateCustom.getTimeNow(item.date),
                item.userId === userLogged.idUser);
        });
    });

    elementProperty.visibleElements([".container-chat-trip"]);

    elementProperty.getElement(".name-establishment-chat", element => {
        element.innerHTML = trip.customerName;
    });

    elementProperty.getElement(".phone-hotel-client", element => {
        element.innerHTML = trip.customer.phone;
    });

    function closeChat() {
        window.history.back();
    }

    function sendMessage() {
      //  document.getElementById("continer-messages").style.height = "115vw";
        const trip = Session.get("tripDriver");

        elementProperty.getElement("#messageTripDriver", element => {
            if (element.value.trim().length === 0)
                return;

            chatTripController.sendMessage(trip.tripReference, element.value, userLogged.idUser, result => {
            });
            element.value = "";

            element.focus();
        });
    }

    function addMessage(message, date, isDriver) {

        const whoSent = isDriver ? "message-driver" : "message-client";

        elementProperty.getElement("#messagesDriver", element => {
            element.innerHTML += (`<li class="${whoSent}">
                        <div class="container-message">
                            <div class="time-message">${date}</div>
                            <div class="message">${message}</div>
                        </div>
                    </li>`);
            $("#continer-messages").scrollTop($("#messagesDriver").height());
        });
    }

    function clearMessage() {
        elementProperty.getElement("#messagesDriver", element => {
            element.innerHTML = "";
        });
    }

    elementProperty.addEventInElement(".back-page", "onclick",comeBackIndex);

    viewController.onBack(function(){
        chatTripSocket.stopWebSocket(trip.tripReference);
    });

    function comeBackIndex() {
        chatTripSocket.stopWebSocket(trip.tripReference);
        Route.backPage()
    }

});
function upScroll() {
    setTimeout(function(){
        $("#continer-messages").scrollTop($("#messagesDriver").height());
    },500)
    //document.getElementById("continer-messages").style.height = "50vw";
}