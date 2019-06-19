class ChatTripController{

    init(tripReference,callback){
        ConnectionServer.sendRequest('ChatTrip/Init','POST',{tripReference},callback);
    }

    sendMessage(tripReference,message,userId,callback){
        ConnectionServer.sendRequest('ChatTrip/SendMessage','POST',{tripReference,message,userId},callback);
    }

    getMessages(tripReference,callback){
        ConnectionServer.sendRequest('ChatTrip/GetMessages','POST',{tripReference},callback);
    }
}