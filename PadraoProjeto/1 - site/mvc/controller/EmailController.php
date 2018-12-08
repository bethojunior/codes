<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 29/11/2018
 * Time: 14:38
 */

class EmailController
{

    public $name;
    public $fromMail;
    public $mailSubject;
    public $mailMessage;
    public $mailTo;

    function __construct(){
        $this->name = $_POST['name'];
        $this->fromMail = $_POST['fromMail'];
        $this->mailSubject = $_POST['mailSubject'];
        $this->mailMessage = $_POST['mailMessage'];
        $this->mailTo = $_POST['mailTo'];
    }

    public function actionSend(){
        if(Email::send($this->name , $this->fromMail , $this->mailSubject , $this->mailMessage , $this->mailTo)){
            echo ApiResponse::getResponse(true , "Email enviado com sucesso");
        }
        echo ApiResponse::getResponse(false , "Erro ao enviar email");
    }


}