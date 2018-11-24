<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 24/11/2018
 * Time: 18:46
 */

class ValidateRequest
{
    static public function checkPermission($data){
        $id    = $data["iduser"];
        $token = $data["token"];
        $verify = self::checkUser($id , $token);

        if($verify)
            return true;
    }

    static function checkUser($id , $token){

        $userDao = new UserDao();
        $return = $userDao->checkUser($id);

        $idUser    = $return[0]['id'];
        $tokenUser = $return[0]['token'];

        if($id === $idUser)
            if($token === $tokenUser)
                return true;

        return false;
    }



}