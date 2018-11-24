var typeUser = "";

if(document.getElementById("sendLogin") !== null){
    document.getElementById("sendLogin").addEventListener("click" , ()=>{
        logar();
    })
}

function logar(){
    email = document.getElementById("emailUser").value;
    pass  = document.getElementById("passUser").value;

    if(email !== "" && pass !== ""){
        Preloader.showPreload("divLogin");
        UserController.getUser(email , pass , (data)=> {
            console.log(data);
            if(data['status'] === false){
                Preloader.hiddenPreload("divLogin");
                swal("ops" , data['message'] , "error");
                return;
            }
            //logado
    
            localStorage.setItem("dataUser" , data['data'][0]);
            window.location.href = HOST+"home/index";
        });
        return;
    }
    swal("" , "Preencha todos os campos corretamente" , "info");
}

function logOut() {
    localStorage.clear();
    window.location.href = "../index.php";
}