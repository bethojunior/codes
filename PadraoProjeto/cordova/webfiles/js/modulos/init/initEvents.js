document.addEventListener("deviceready", function () {
    const elementProperty = new ElementProperty();
    cordova.plugins.backgroundMode.enable();

    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
    }

    const push = new Push();

    push.eventPush(data => {
        if (data.additionalData.action)
            switch (data.additionalData.action) {
                case "notifyChat" : {
                    notifyChat();
                    break;
                }
                case "openAppOnDriverArrival": {
                    openAppOnDriverArrival();
                    break;
                }
            }

    });

    cordova.plugins.backgroundMode.setDefaults({silent: true});

    cordova.plugins.backgroundMode.on('activate', function () {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });

    function notifyChat() {
        elementProperty.getElement("#chatClient", element => {
            element.classList.add("active");
        });
    }

    function openAppOnDriverArrival() {
        window.plugins.bringtofront();
        setTimeout(function(){
            InfoTrip.showArrivalDriver();
        },5000)
    }

});

function showOptionsReturn() {
    new ElementProperty().getElement("#modalInfoReturn", element => {
        element.classList.add("active");
    });
}

function closeOptionsReturn() {
    new ElementProperty().getElement("#modalInfoReturn", element => {
        element.classList.remove("active");
    });
}