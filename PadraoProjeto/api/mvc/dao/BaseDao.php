<?php

class BaseDao{

        protected $conn;

        public function __construct(){
            try{
                $this->conn = Connection::open(Connection::DB_MYSQL);
            }catch(Exception $e){
                echo $e->getMessage();
            }
        }

        public function dbGetAll($table){
            try{
                $query = "SELECT * FROM {$table}";
                $query = $this->conn->prepare($query);
                $query->execute();
                $all = $query->fetchAll(PDO::FETCH_OBJ);

                if($query->rowCount() != 0){
                    echo json_encode(array(
                        "status" => true,
                        "data" => $all,
                        "message" => "Sucess",
                    ));
                    return;
                }
                echo json_encode(array(
                    "status" => false,
                    "data" => $all,
                    "message" => "Failed",
                ));

            }catch(PDOException $e){
                echo false;
            }

        }
    }