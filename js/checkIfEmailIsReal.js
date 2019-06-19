    $.ajax({
        url: "https://api.mailfinder.io/v1/verify/email="+email+"&apikey=3e94d7b4a678253990c5ad6b358bbf1dd330ae31e680e71a3cf9a9062d0b8fc9&maxtime=30",
        success:function(response){
            if(response['message'] != "E-mail válido"){
                SpinnerDialog.hide();
                document.getElementById("mail").value = "";
                document.getElementById("cadastrarDriver").disabled = true;
                swal("Email não existe", "Tente novamente", "error");
                navigator.vibrate([700]);
            }
        }
    })