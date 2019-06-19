function sendPostBlog(){

    var data = document.getElementById("formBlog");
    var formD = new FormData(data);
    

    new BlogController().sendDataBlog(formD , "POST" , "blog/insert" ,callback);
    function callback(result){
        console.log(result);
        if(result == true){
            swal("", "POSTADO COM SUCESSO", "success");
            document.getElementById("titlePost").value = "";
            document.getElementById("postBlog").value = "";
        }else {
            swal("Erro ao postar", "TENTE NOVAMENTE MAIS TARDE!", "error");
        }
    }

}



class BlogController{

    sendDataBlog(form , method , url , callback){

        $.ajax({
            url:LOCAL+url,
            method: method,
            data: form,
            success: function(result){
                callback(JSON.parse((result));
            },error: function(result){
                swal("Erro ao enviar post");
                console.log("ajax envia post" + result);
            },
            cache: false,
            contentType: false,
            processData: false,
            xhr: function() {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                    myXhr.upload.addEventListener('progress', function () {
                        /* faz alguma coisa durante o progresso do upload */
                    }, false);
                }
            return myXhr;
            }
            
        });  

    }

}