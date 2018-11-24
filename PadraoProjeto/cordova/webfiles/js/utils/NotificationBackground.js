function statusInTrip(response,trip){
    const managerMessege = {
        text: "",
        title: "Acompanhamento de viagem"
    };

    const time = response.routes[0].legs[0].duration.text;

    switch (trip.status) {
        case "accepted" : {
            viewController.elementProperty.getElement(".description-title", element => {
                element.innerHTML  = "Motorista aceitou sua viagem, chegará em "+time;
            });
            managerMessege.text = "Seu motorista deve chegar em " + time;
            break;
        }
        case  "boarding": {
            managerMessege.text = "Seu motorista está lhe aguardando !";
            break;
        }
        case "in_progress" : {
            managerMessege.text = "Você deve chegar ao seu destino em " + time;
            break;
        }
    }

    notificationInBackground(managerMessege.title,managerMessege.text);
}

function notificationInBackground(title,text) {
    cordova.plugins.backgroundMode.configure({
        title: title,
        text: text,
        resume: true,
        silent: false
    });
}

function hiddenNotificationInBackground(){
    cordova.plugins.backgroundMode.configure({
        silent: true
    });
}