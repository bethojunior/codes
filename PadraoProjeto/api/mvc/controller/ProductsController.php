<?php

class ProductsController {

    const TABLE = "produtos";

    public function actionGetAll(){
        
        $products = new BaseDao();
        $return = $products->dbGetAll(SELF::TABLE);

        echo $return;
        return $return;
    }

    public function actionInsertProduct(){

        $nome               = $_POST['nameProduct'];
        $valueProduct       = $_POST['valueProduct'];
        $descriptionProduct = $_POST['descriptionProdust'];
        $image              = $_FILES['imageValue'];
        $path               = "images/products/";
        $imageProduct       = Image::setNameImage($image, $path , true);

        $productDao = new ProductsDao();
        $return = $productDao->insertProduct($nome , $valueProduct , $imageProduct , $descriptionProduct);

        echo $return;
        return $return;

    }

    public function actionDeleteProduct(){
        $id = $_POST['id'];
        $productDao = new ProductsDao();
        $return = $productDao->deleteProduct($id);

        echo $return;
        return $return;
    }

}