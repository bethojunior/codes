viewController.setObserver("chat-trip", function () {

    const chatTripSocket = new WebSocket(keyChat);

    chatTripSocket.setChannel("chat-channel");

    const trip = Storaged.get("tripChat");

    chatTripSocket.stopWebSocket(trip.tripReference);

    const userLogged = Session.get("user");

    const elementProperty = new ElementProperty();

    elementProperty.addEventInElement(".close-chat-trip", "onclick", closeChat);
    elementProperty.addEventInElement(".btn-send-message", "onclick", sendMessage);

    clearMessage();

    stopNotificationChat();

    chatTripSocket.observerSocket(trip.tripReference, result => {
        console.log(result);
        addMessage(result.message.message,
            DateCustom.getTimeNow(result.message.date),
            result.message.userId === userLogged.idUser);
    });

    ChatController.getMessages(trip.tripReference, result => {
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

   // elementProperty.visibleElements([".container-chat-trip"]);


    elementProperty.getElement(".name-establishment-chat", element => {
        element.innerHTML = trip.driver.nickname;
    });

    function closeChat() {
        window.history.back();
    }

    function sendMessage() {
        //  document.getElementById("continer-messages").style.height = "115vw";
        elementProperty.getElement("#messageTripDriver", element => {
            if (element.value.trim().length === 0)
                return;

            ChatController.sendMessage(trip.tripReference, element.value, userLogged.idUser, result => {
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
            $(".info-client").scrollTop($("#messagesDriver").height());
        });
    }

    function clearMessage() {
        elementProperty.getElement("#messagesDriver", element => {
            element.innerHTML = "";
        });
    }

    elementProperty.addEventInElement(".back-page", "onclick",function(){
        //location.href = HOST_PWA;
        chatTripSocket.stopWebSocket(trip.tripReference);
        stopNotificationChat();
        Route.backPage();
    });


    viewController.onBack(function(){
        chatTripSocket.stopWebSocket(trip.tripReference);
        stopNotificationChat();
    });

    function stopNotificationChat() {
        elementProperty.getElement("#chatClient", element => {
            element.classList.remove("active");
        })
    }
});