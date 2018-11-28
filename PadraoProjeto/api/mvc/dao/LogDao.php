<?php
/**
 * Created by PhpStorm.
 * User: hgome
 * Date: 28/11/2018
 * Time: 14:28
 */

class LogDao extends BaseDao
{
    protected $conn;

    public function insertLog($user , $level , $message){
        try{
            $query = "INSERT INTO logs (user ,level , message) VALUES (:user , :level , :message)";
            $query = $this->conn->prepare($query);
            $query -> bindValue(':user'    , $user    , PDO::PARAM_INT);
            $query -> bindValue(':level'   , $level   , PDO::PARAM_INT);
            $query -> bindValue(':message' , $message , PDO::PARAM_STR);
            $query -> execute();

            if($query->rowCount() != 0){
                return ApiResponse::getResponse(true , "Log inserido");
            }

            return ApiResponse::getResponse(false , "Erro ao inserir log");

        }catch(PDOException $e){
            return ApiResponse::getResponse(false , $e->getMessage());
        }
    }

    public function getLogs(){
        try{
            $query = "SELECT * FROM logs ORDER BY id DESC";
            $query = $this->conn->prepare($query);
            $query -> execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                return ApiResponse::getResponse(true , 'list logs' , $all);
            }
            return ApiResponse::getResponse(false , "Error list logs");
        }
        catch (PDOException $e){
            return ApiResponse::getResponse(false , $e->getMessage());
        }
    }

    public function getLogByUser($user){
        try{
            $query = "SELECT * FROM logs WHERE user = :user ORDER BY id DESC";
            $query = $this->conn->prepare($query);
            $query->bindValue(':user' , $user , PDO::PARAM_STR);
            $query -> execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                return ApiResponse::getResponse(true , 'list logs' , $all);
            }
            return ApiResponse::getResponse(false , "Error list logs");
        }
        catch (PDOException $e){
            return ApiResponse::getResponse(false , $e->getMessage());
        }
    }



}