class ProductsController {

    static getAll(callback){
        Connect.sendRequest("Products/getAll" , "POST" , {} , function(data){
            callback(data);
        });
    };

    static insertProducts(form , callback){
        Connect.sendRequestFile("Products/InsertProduct" , "POST" , form , function(data){
            console.log(data)
            callback(data);
        });
    };

    static deleteProduct(id , callback){
        Connect.sendRequest("Products/deleteProduct" , "POST" , {"id" : id} , function(data){
            callback(data);
        });
    }

}