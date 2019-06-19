<?php   

class ProductsDao extends BaseDao{

    protected $conn;

    public function insertProduct($nome , $valor , $foto , $descricao){

        try{
            $query = "insert into produtos (nome , valor , foto , descricao) VALUES (:nome , :valor , :foto , :descricao)";
            $query = $this->conn->prepare($query);
            $query->bindValue(':nome'      , $nome      , PDO::PARAM_STR);
            $query->bindValue(':valor'     , $valor     , PDO::PARAM_STR);
            $query->bindValue(':foto'      , $foto      , PDO::PARAM_STR);
            $query->bindValue(':descricao' , $descricao , PDO::PARAM_STR);
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
            echo false;
        }
    }

    public function deleteProduct($id){
        try{
            $query = "delete from produtos WHERE id = :id";
            $query = $this->conn->prepare($query);
            $query->bindValue(':id' , $id , PDO::PARAM_INT);
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
            echo false;
        }
    }
    
}