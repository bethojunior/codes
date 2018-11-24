class Connect{

    static sendRequest(url , method , params , callback) {

        $.ajax({
            url: HOST+url,
            method: method,
            data: params,
            success:function(result){
                callback(JSON.parse(result));
            },error:function(result){   
                console.log(result + url);
            }
        });

    }

    static sendRequestFile(url , method , params , callback){

        $.ajax({
            url: HOST+url,
            method: method,
            data: params,
            success: function(result){
                callback(JSON.parse(result));
            },error: function(result){
                console.log("sendRequestFile" + result);
            },
            cache: false,
            contentType: false,
            processData: false,
            xhr: function() {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                    myXhr.upload.addEventListener('progress', function () {
                        // faz alguma coisa durante o progresso do upload 
                    }, false);
                }
            return myXhr;
            }
    
        }); 

    } 

}