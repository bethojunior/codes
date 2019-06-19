<?php
/**
 * Created by PhpStorm.
 * User: Betho Junior
 * Date: 18/04/2018
 * Time: 20:27
 */
    class Image{

        public static function setNameImage($file , $adress , $bool){
            $date = date('d-m-y-H-i-s');
            $ext = strtolower(substr($file['name'],-4));
            $titleBanner = ($date.$ext);

            $upload = new Upload();
            $returnUp = $upload->uploadFile($file['tmp_name'] , $titleBanner , "../files/".$adress , $bool);

            if($returnUp){
                return $titleBanner;
            }else {
                return false;
            }
        }

}