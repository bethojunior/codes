class CashierController{

    static getRequestsByDay(){
        return new Promise((resolve,reject) => {
            Connect.sendRequest("Request/GetRequestByDay" , "POST" , {} , resolve)
        })
        
    }

    static getValueDay(callback){
        Connect.sendRequest("Request/getValueDay" , "POST" , {} , function(data){
            callback(data);
        });
    }

    static getValueWeek(callback){
        Connect.sendRequest("Request/GetValueWeek" , "POST" , {} , function(data){
            callback(data);
        });
    }

    static getValueMonth(callback){
        Connect.sendRequest("Request/getValueMonth" , "POST" , {} , function(data){
            callback(data);
        });
    }

}