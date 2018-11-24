<?php  

    
class UserController{
    

    public function actionAuthenticate(){

        $login = $_POST['email'];
        $pass  = $_POST['pass'];
        $userDao = new UserDao();
        $return = $userDao->getUser($login , $pass);
        $token = self::updateTokenUser($login , $pass ,base64_encode(rand(1 , 150)));

        if($return){
            echo $token;
        }

    }

    public function actionInsertUser(){

        $check = ValidateRequest::checkPermission($_POST);

        $token =  base64_encode(rand (1 , 150));

        if($check){
            $name     = $_POST['name'];
            $email    = $_POST['email'];
            $pass     = $_POST['pass'];

            if(!self::checkEmail($email)){
                $userDao = new UserDao();
                $return = $userDao->insertUser($name , $email , $pass , $token ,true);
                echo $return;
                return;
            }
            echo json_encode(['result' => false, 'message' => 'Email existe']);
            return;
        }

        echo json_encode(['result' => false, 'message' => 'Token inválido']);


    }

    static public function checkEmail($email){
        $userDao = new UserDao();
        $return = $userDao->checkEmail($email);
        return $return;
    }

    static private function updateTokenUser($email , $pass ,  $token){
        $userDao = new UserDao();
        $return = $userDao->updateTokenUser($email , $pass ,$token);
        return $return;
    }


}