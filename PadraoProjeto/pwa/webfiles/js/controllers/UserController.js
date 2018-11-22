class UserController{

    checkEmail(email,callback){
        ConnectionServer.sendRequest('User/CheckEmail','POST',{email},callback);
    }

    autenticate(dataUser){
        return new Promise(resolve => {
            ConnectionServer.sendSimpleRequest('Customer/Authenticate','POST', dataUser, resolve)
        })
    }

}