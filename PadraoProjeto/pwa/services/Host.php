<?php
/**
 * Created by PhpStorm.
 * User: Fabrica704_Acer
 * Date: 16/02/2018
 * Time: 09:40
 */

class Host
{
    const HOME = "home";

    public static function getLocal()
    {
        return env('host');
    }

    public static function getHostReturn(){
       return env('return');
    }

    public static function getHostApiImage() {
        return env('image');
    }

    public static function getHostApi(){
        return env('api');
    }

    public static function getHostPwa(){
        return env('pwa');
    }

    public static function getHostHostel(){
        return env('hostel');
    }

    public static function getHostCabby(){
        return env('cabby');
    }

    public static function getHostStore(){
        return env('store');
    }

    public static function getIdGoogle(){
        return env('ID_GOOGLE');
    }
    public static function getPathImage(){
        return env('PATH_IMAGE');
    }

    public static function getVersion(){
        return '1.3';
    }
}