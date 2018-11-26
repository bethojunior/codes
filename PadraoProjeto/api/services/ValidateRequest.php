<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 24/11/2018
 * Time: 18:46
 */

class ValidateRequest
{
    public $id;
    public $token;

    function __construct(){

        if(isset(getallheaders()['id']))
            $this->id = getallheaders()['id'];

        if(isset(getallheaders()['token']))
            $this->token = getallheaders()['token'];

    }

    public function checkPermission(){
        $verify = self::checkUser($this->id , $this->token);
        if($verify)
            return true;
        return false;
    }

    public static function checkUser($id , $token){

        $userDao = new UserDao();
        $return = $userDao->checkUser($id);

        $idUser    = $return[0]['id'];
        $tokenUser = $return[0]['token'];

        if($id === $idUser)
            if($token === $tokenUser)
                return true;

        return false;
    }

    static public function AccessDenied(){
        return json_encode(['result' => false, 'message' => 'Token inválido']);
    }

}