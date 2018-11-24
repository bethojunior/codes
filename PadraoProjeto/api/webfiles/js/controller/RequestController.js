class RequestController {

    static getAllRequest(status , callback) {
        Connect.sendRequest("Request/GetAllRequests", "POST", {"status" : status}, function (data) {
            callback(data);
        });
    }

    static changeStatus(status , id , callback){
        Connect.sendRequest("Request/ChangeStatusRequest" , "POST" , {"status" : status , "id" : id} , function(data){
            callback(data);
        })
    }


}