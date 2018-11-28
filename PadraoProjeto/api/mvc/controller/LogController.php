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

    function __construct(){
        $this->log = new LogDao();
    }

    public function actionInsertLog(){

        $user    = $_POST['user'];
        $level   = $_POST['level'];
        $message = $_POST['message'];

        $insert = $this->log->insertLog($user , $level , $message);

        if($insert)
            echo $insert;
            return;

        echo ApiResponse::getResponse(false , "Erro ao inserir log ->controller");

    }

    public function actionGetLogs(){
        $get = $this->log->getLogs();

        if($get)
            echo $get;
            return;

        echo ApiResponse::getResponse(false , "Erro ao pegar logs ->controller");
    }

    public function actionGetLogByUser(){
        $user = $_POST['user'];
        $getThis = $this->log->getLogByUser($user);

        if($getThis)
            echo $getThis;
            return;

        echo ApiResponse::getResponse(false , "Erro ao pegar logs do ".$user.". ->controller");
    }
}