class CustomerController {
    loginPartner(user,callback){
        ConnectionServer.sendRequest('Customer/loginPartner','POST',user,callback);
    }

    getCurrentTrips(userId) {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Customer/GetCurrentTrips','POST',{userId},resolve);
        });
    }

    actionNew(object,callback){
        ConnectionServer.sendRequest('Customer/NewTrip','POST',object,callback);
    }
    getBalance(userId){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Customer/getBalance','POST',{userId},resolve);
        });
    }

    actionCancel(tripReference,userId,dateEnd,callback){
        ConnectionServer.sendRequest('Customer/CancelTrip','POST',{tripReference,userId,dateEnd},callback);
    }

    authenticateSocial(dataUser){
        return new Promise((resolve , reject) => {
            ConnectionServer.sendRequest('Customer/SocialLoginPartner' , 'POST' , dataUser , resolve , reject , false)
        });
    }

    getPartnerTrips(data){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('Customer/GetPartnerTrips' , 'POST' , {...data} , resolve)
        });
    }

    static editProfile(data){
        return new Promise((resolve , reject) => {
            ConnectionServer.sendRequest('CustomerPartner/EditProfile' , 'POST' , data , resolve , reject , true);
        });
    }

}