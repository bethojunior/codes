<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 28/11/2018
 * Time: 21:03
 */

class Email{

    public $to;
    public $from;

    function __construct(){
        //$this->from = "hgomescostajr@gmail.com";
    }

    public static function send($from_name = "Betho" , $from_mail = "eu@betho.com.br" , $mail_subject , $mail_message , $mail_to = "eu@betho.com.br"){
        $encoding = "utf-8";

        $subject_preferences = array(
            "input-charset" => $encoding,
            "output-charset" => $encoding,
            "line-length" => 76,
            "line-break-chars" => "\r\n"
        );

        $header  = "Content-type: text/html; charset=".$encoding." \r\n";
        $header .= "From: ".$from_name." <".$from_mail."> \r\n";
        $header .= "MIME-Version: 1.0 \r\n";
        $header .= "Content-Transfer-Encoding: 8bit \r\n";
        $header .= "Date: ".date("r (T)")." \r\n";
        $header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);


        if(mail($mail_to, $mail_subject, $mail_message, $header))
            return true;

        return false;

    }

    public static function sendLog($level , $user , $message){
        $callback = "Erro critico. O usuário, ".$user." -> ".$message;

    }

}