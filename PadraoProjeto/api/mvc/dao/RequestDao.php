<?php   
class RequestDao extends BaseDao{

    protected $conn;

    public function getAllRequestByStatus($status){
        try{
            $query = "SELECT users.* , request.* , request.id as idRequest FROM request INNER JOIN users on request.idclient = users.id WHERE status != :status ORDER BY request.id DESC";
            $query = $this->conn->prepare($query);
            $query->bindValue(':status' , $status , PDO::PARAM_STR);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true,
                    "data" => array_map(function($item){
                        $item->products = explode("," , $item->products);
                        return $item;
                    },$all),
                    "message" => "success",
                ));
                return;
            }
            echo json_encode(array(
                "status" => false
            ));

        }catch (PDOException $e){
            echo $e->getMessage();
        }
    }

    public function getUserByRequest($id){

    }

    public function initRequest($id , $products , $amount , $dataNow , $dataReal, $status){
        try{
            $query = "INSERT INTO request (status , datanow , idclient , products , amount , datareal) VALUES (:status , :datanow , :idclient , :products , :amount , :datareal)";
            $query = $this->conn->prepare($query);
            $query->bindValue(':status'   , $status   , PDO::PARAM_STR);
            $query->bindValue(':datanow'  , $dataNow  , PDO::PARAM_STR);
            $query->bindValue(':idclient' , $id       , PDO::PARAM_INT);
            $query->bindValue(':products' , $products , PDO::PARAM_STR);
            $query->bindValue(':amount'   , $amount   , PDO::PARAM_STR);
            $query->bindValue(':datareal' , $dataReal , PDO::PARAM_STR);
            $query->execute();

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true
                ));
                return;
            }
            echo json_encode(array(
                "status" => false
            ));


        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function getRequestByClient($id , $status){
        try{
            $query = "SELECT * FROM request WHERE idclient = :id AND status != :status ORDER BY id DESC";
            $query = $this->conn->prepare($query);
            $query->bindValue(':status'   , $status   , PDO::PARAM_STR);
            $query->bindValue(':id'       , $id       , PDO::PARAM_INT);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true,
                    "data" => $all,
                    "message" => "success",
                ));
                return;
            }
            echo json_encode(array(
                "status" => false,
                "data" => $all,
                "message" => "error",
            ));

        }catch (PDOException $e){
            echo $e->getMessage();
        }

    }

    public function gettAllById($id){
        try{
            $query = "SELECT * FROM request where idclient = :id ORDER BY id DESC";
            $query = $this->conn->prepare($query);
            $query->bindValue(':id' , $id , PDO::PARAM_INT);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true,
                    "data" => $all,
                    "message" => "success",
                ));
                return;
            }
            echo json_encode(array(
                "status" => false,
                "data" => $all,
                "message" => "error",
            ));
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function changeStatusRequest($status , $id){

        try{
            $query = "UPDATE request set status = :status WHERE id = :id";
            $query = $this->conn->prepare($query);
            $query->bindValue(':id'     , $id     , PDO::PARAM_INT);
            $query->bindValue(':status' , $status , PDO::PARAM_STR);
            $query->execute();


            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true
                ));
                return;
            }
            echo json_encode(array(
                "status" => false
            ));
        }catch (PDOException $e){
            echo $e->getMessage();
        }

    }

    public function getRequestByDay($today){
        try{
            $query = "SELECT users.* , request.* , request.id as idRequest FROM request INNER JOIN users on request.idclient = users.id WHERE datareal = :today";
            $query = $this->conn->prepare($query);
            $query->bindValue(':today' , $today , PDO::PARAM_STR);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true,
                    "data" => $all,
                    "message" => "success",
                ));
                return;
            }
            echo json_encode(array(
                "status" => false,
                "data" => $all,
                "message" => "error",
            ));
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function getValueDay($dateW){
        try{
            $query = "SELECT SUM(amount) as total FROM request WHERE datareal = :dateW";
            $query = $this->conn->prepare($query);
            $query->bindValue(':dateW' , $dateW , PDO::PARAM_STR);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true,
                    "data" => $all,
                    "message" => "success",
                ));
                return;
            }
            echo json_encode(array(
                "status" => false,
                "data" => $all,
                "message" => "error",
            ));
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function getValueWeek($dateW){
        try{
            $query = "SELECT SUM(amount) as total FROM request WHERE Week(datareal) = Week(:dateW)";
            $query = $this->conn->prepare($query);
            $query->bindValue(':dateW' , $dateW , PDO::PARAM_STR);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true,
                    "data" => $all,
                    "message" => "success",
                ));
                return;
            }
            echo json_encode(array(
                "status" => false,
                "data" => $all,
                "message" => "error",
            ));
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }


    public function getValueMonth($dateW){
        try{
            $query = "SELECT SUM(amount) as total FROM request WHERE Month(datareal) = Month(:dateW)";
            $query = $this->conn->prepare($query);
            $query->bindValue(':dateW' , $dateW , PDO::PARAM_STR);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                echo json_encode(array(
                    "status" => true,
                    "data" => $all,
                    "message" => "success",
                ));
                return;
            }
            echo json_encode(array(
                "status" => false,
                "data" => $all,
                "message" => "error",
            ));
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

}