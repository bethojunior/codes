if(!isMobile()){
    
    let status = Storaged.get("firstNotification");

    if(status === null){
        Storaged.set("firstNotification" , false);      
    }

    if(status === false){
        checkPermissionNotification();
    }
 
    console.log(Storaged.get("firstNotification"));
}

function checkPermissionNotification(){

    Storaged.set("firstNotification" , true);

    if(Notification.permission == "granted"){
        PushNotification.sendRequest("Ol�," , "Bem vindo ao Taxireturn");
        document.getElementById("navNotification").style.display = "none";    
        return;
    }
    
    document.getElementById("navNotification").style.display = "block";

    if(document.getElementById("requestPermissionNotifications") !== null){
        document.getElementById("requestPermissionNotifications").onclick = function(){
            PushNotification.sendRequest("Ol�," , "Bem vindo ao Taxireturn");
            document.getElementById("navNotification").style.display = "none";
        }
    }
}

if(document.getElementById("closeBtn") !== null){
    document.getElementById("closeBtn").onclick = function(){
        document.getElementById("navNotification").style.display = "none";
    };
};
