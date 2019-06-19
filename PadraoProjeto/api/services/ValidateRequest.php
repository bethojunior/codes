<?php
/**
 * Created by PhpStorm.
 * User: hgomes
 * Date: 24/11/2018
 * Time: 18:46
 */

class ValidateRequest
{
    public $id;
    public $token;

    function __construct(){

        if(!isset(getallheaders()['id']) && !isset(getallheaders()['token'])){
            $this->checkPermission();
        }
        $this->id = getallheaders()['id'] ?? false;
        $this->token = getallheaders()['token'] ?? false;
    }

    public function checkPermission(){

        $thisRoute = Permission::checkIsPublicRoute();
        $verify = self::checkUser($this->id , $this->token);

        if($thisRoute){
            if($verify){
                return $verify;
            }
            return $thisRoute;
        }

        if(!$verify)
            return false;
        return true;

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
        return json_encode(['result' => false, 'message' => 'Acesso negado']);
    }

}