if(Notification.permission != "granted"){
    document.getElementById("navNotification").style.display = "block";
}else{
    document.getElementById("navNotification").style.display = "none";
}

if(document.getElementById("requestPermissionNotifications") !== null){
    document.getElementById("requestPermissionNotifications").onclick = function(){
        PushNotification.sendRequest("Olá" , "2");
        document.getElementById("navNotification").style.display = "none";
    }
}

class PushNotification{
    static sendRequest(title , icon , textBody){
        Notification.requestPermission();
        new Notification(title, {
            icon: HOST+icon,
            body: textBody,
        });
    } 
 }