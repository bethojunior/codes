class sendNotification {

    static CreateNotification(title , icon , text){
        Notification.requestPermission();
        new Notification(title, {
            icon: icon,
            body: text,
        });
    }       
       
}