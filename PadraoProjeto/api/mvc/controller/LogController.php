<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 28/11/2018
 * Time: 14:27
 */

class LogController
{
    private $log;

    const LEVEL_CRITICAL    = 1;
    const LEVEL_MEDIUM      = 2;
    const LEVEL_LIGHT       = 3;
    const LEVEL_INFORMATION = 4;
    const SUBJECT = "API SALES";

    function __construct(){
        $this->log = new LogDao();
    }

    public function actionInsertLog(){

        $user    = $_POST['user'];
        $level   = $_POST['level'];
        $message = $_POST['message'];

        self::verifyLevelLog($level , $user , $message);

        $insert = $this->log->insertLog($user , $level , $message);

        if($insert){
            echo $insert;
            return;
        }

        echo ApiResponse::getResponse(false , "Erro ao inserir log ->controller");

    }

    public function logHere($user , $level , $message){

        self::verifyLevelLog($level , $user , $message);

        $insert = $this->log->insertLog($user , $level , $message);

        if($insert){
            return $insert;
        }

        echo ApiResponse::getResponse(false , "Erro ao inserir log ->controller");

    }


    public function actionGetLogs(){
        $get = $this->log->getLogs();

        if($get){
            echo $get;
            return;
        }
        echo ApiResponse::getResponse(false , "Erro ao pegar logs ->controller");
    }

    public function actionGetLogByUser(){
        $user = $_POST['user'];
        $getThis = $this->log->getLogByUser($user);

        if($getThis){
            echo $getThis;
            return;
        }

        echo ApiResponse::getResponse(false , "Erro ao pegar logs do ".$user.". ->controller");
    }

    public function verifyLevelLog($level , $user , $message){

        switch ($level){
            case self::LEVEL_CRITICAL:
                $messageMail = "Erro critico de level ".$level.". O usuário, ".$user." -> ".$message;
                Email::send("Suporte Logs"  , "suporte@betho.com.br" ,  self::SUBJECT , $messageMail , "suporte@betho.com.br");
                break;

            case self::LEVEL_MEDIUM :
                $messageMail = "Erro médio de level ".$level.". O usuário, ".$user." -> ".$message;
                Email::send("Suporte Logs"  , "suporte@betho.com.br" ,  self::SUBJECT , $messageMail , "suporte@betho.com.br");
                break;

        }
    }
}