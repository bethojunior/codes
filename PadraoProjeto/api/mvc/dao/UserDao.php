<?php
class UserDao extends BaseDao{

    protected $conn;

    public function getUser($email , $pass){
        try{
            $query = "SELECT * FROM users where email = :email AND pass = :pass";
            $query = $this->conn->prepare($query);
            $query->bindValue(':email' , $email , PDO::PARAM_STR);
            $query->bindValue(':pass' ,  $pass ,  PDO::PARAM_STR);
            $query->execute();
            $all = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() != 0){
                return json_encode(array(
                    "status" => true,
                    "data" => $all,
                    "message" => "Cliente encontrado",
                ));
            }
            return json_encode(array(
                "status" => false,
                "data" => $all,
                "message" => "Dados não conferem",
            ));
            
            
        }catch(PDOException $e){
            return false;
        }
    }

    public function insertUser($name , $email , $pass , $token , $status){
        
        try{
            $query = "INSERT INTO users (name , email , pass , token , status ) VALUES (:name , :email , :pass , :token , :status)";
            $query = $this->conn->prepare($query);
            $query -> bindValue(':name' , $name , PDO::PARAM_STR);
            $query -> bindValue(':email' , $email , PDO::PARAM_STR);
            $query -> bindValue(':pass' , $pass , PDO::PARAM_STR);
            $query -> bindValue(':token' , $token , PDO::PARAM_STR);
            $query -> bindValue(':status' , $status , PDO::PARAM_STR);
            $query->execute();

            if($query){
                return json_encode(
                    [
                        'result'  => true,
                        'message' => 'user entered'
                    ]
                );
            }else {
                return json_encode(['result' => false]);
            }

        }catch(Exception $e){
            return json_encode(['result' => $e->getMessage()]);
        }

    }

    public function checkEmail($email){
        try{
            $query = "SELECT * FROM users where email = :email";
            $query = $this->conn->prepare($query);
            $query->bindValue(':email' , $email , PDO::PARAM_STR);
            $query->execute();

            if($query->rowCount() != 0){
                return true;
            }
            return false;

        }catch(PDOException $e){
            echo false;
        }
    }


    public function checkUser($id){
        try{
            $query = "SELECT id , token FROM users where id = :id";
            $query = $this->conn->prepare($query);
            $query->bindValue(':id' , $id , PDO::PARAM_INT);
            $query->execute();
            $all = $query->fetchAll();

            if($query->rowCount() != 0){
                return $all;
            }

            return false;


        }catch(PDOException $e){
            return false;
        }
    }

    public function updateTokenUser($email , $pass ,  $token){
        try{
            $query = "UPDATE users set token = :token where email = :email";
            $query = $this->conn->prepare($query);
            $query->bindValue(':email'    , $email , PDO::PARAM_STR);
            $query->bindValue(':token' , $token , PDO::PARAM_STR);
            $query->execute();

            if($query->rowCount() != 0){
                return $this->getUser($email , $pass);
            }

            return false;


        }catch(PDOException $e){
            return false;
        }
    }
    

}