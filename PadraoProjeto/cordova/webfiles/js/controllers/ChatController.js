class ChatController{
    static sendMessage(tripReference, message, userId , callback){
        ConnectionServer.sendRequest("ChatTrip/SendMessage" , "POST",
            {tripReference,message,userId },callback);
    }
    static getMessages(tripReference,callback){
        ConnectionServer.sendRequest('ChatTrip/GetMessages','POST',{tripReference},callback);
    }
}