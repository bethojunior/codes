<?php


class UserController{

    private $validate;
    public $log;

    const LEVEL_CRITICAL    = 1;
    const LEVEL_MEDIUM      = 2;
    const LEVEL_LIGHT       = 3;
    const LEVEL_INFORMATION = 4;

    function __construct(){
        $initValidate   = new ValidateRequest();
        $this->validate = $initValidate->checkPermission();
        if(!$initValidate->checkPermission())
            throw new Exception(ValidateRequest::AccessDenied());
    }

    public function actionAuthenticate(){
        $logC = new LogController();
        $login = $_POST['email'];
        $pass  = $_POST['pass'];
        $userDao = new UserDao();
        $return = $userDao->getUser($login , $pass);
        $token = self::updateTokenUser($login , $pass ,base64_encode(rand(1 , 150)));

        if($return){
            if($token){
                $logC->logHere($login , self::LEVEL_INFORMATION ,"Usuário logou");
                echo $token;
                return false;
            }
            $logC->logHere($login , self::LEVEL_MEDIUM ,"Usuário não conseguiu logar");
            echo $token;
        }
        echo $return;

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