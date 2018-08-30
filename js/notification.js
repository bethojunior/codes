class PushNotification{
    static sendRequest(title , icon , textBody){
        Notification.requestPermission();
        new Notification(title, {
            icon: HOST+icon,
            body: textBody,
        });
    } 
 }