<?php  

    
class UserController{

    private $validate;

    function __construct(){
        $initValidate   = new ValidateRequest();
        $this->validate = $initValidate->checkPermission();

        if(!$initValidate->checkPermission())
            throw new Exception(ValidateRequest::AccessDenied());
    }

    public function actionAuthenticate(){

        $login = $_POST['email'];
        $pass  = $_POST['pass'];
        $userDao = new UserDao();
        $return = $userDao->getUser($login , $pass);
        $token = self::updateTokenUser($login , $pass ,base64_encode(rand(1 , 150)));

        if($return){
            echo $token;
            return false;
        }

        echo $token;
    }

    public function actionInsertUser(){

        $token =  base64_encode(rand (1 , 150));

        $name     = $_POST['name'];
        $email    = $_POST['email'];
        $pass     = $_POST['pass'];

        if(!self::checkEmail($email)){
            $userDao = new UserDao();
            $return = $userDao->insertUser($name , $email , $pass , $token ,true);
            echo $return;
            return true;
        }

        echo ApiResponse::getResponse(false , "Email existe");
    }

    static public function checkEmail($email){
        $userDao = new UserDao();
        $return = $userDao->checkEmail($email);
        return $return;
    }

    static private function updateTokenUser($email , $pass ,  $token){
        $userDao = new UserDao();
        return $userDao->updateTokenUser($email , $pass ,$token);
    }


}