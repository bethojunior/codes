<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 24/11/2018
 * Time: 19:33
 */

class EncodeController
{
    static public function encodeThis($value){
        $return = base64_encode($value);
        return $return;
    }

    static public function decodeThis($value){
        $return = base64_decode($value);
        return $return;
    }
}