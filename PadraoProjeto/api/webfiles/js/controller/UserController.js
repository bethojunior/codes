class UserController{

    static getUser(email , pass , callback) {
        Connect.sendRequest("User/Authenticate" , "POST" , {"email" : email , "pass" : pass} , (data)=> {
            callback(data);
        })
    }

}