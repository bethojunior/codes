class TripController{

    static actionNew(object,callback){
        ConnectionServer.sendRequest('Trip/New','POST',object,callback);
    }

    static actionGet(tripReference,callback){
        ConnectionServer.sendRequest('Trip/Get','POST',{tripReference},callback);
    }

    static actionCancel(tripReference,dateEnd,callback){
        ConnectionServer.sendRequest('Trip/Cancel','POST',{tripReference,dateEnd},callback);
    }

    static getTimeLineByTrip(tripReference){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Trip/GetWithTimeline' , 'POST' , {tripReference} , resolve)
        });
    }
}