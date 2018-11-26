<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 26/11/2018
 * Time: 14:42
 */

class ApiResponse
{
    public static function getResponse($bool , $message){
        if($bool)
            return json_encode(['result' => true, 'message' => $message]);
        return json_encode(['result' => false, 'message' => $message]);
    }
}