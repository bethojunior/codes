if(PathUrl.getPathUrl() == "home/Products"){
    loadMyProducts();
}

function getAllProducts(products) {
    ProductsController.getAll(function(data){
        products(data['data']);
    })
}

function insertNewProduct() {

    let name  = document.getElementById("nameProduct").value;
    let valor = document.getElementById("valueProduct").value;
    let des   = document.getElementById("descriptionProdust").value;
    let img   = document.getElementById("imageValue").value;

    if(name == "" || valor == "" || des == "" || img == ""){
        swal("Preencha todos os campos" , "" , "info");
        return;
    }

    var idForm = document.getElementById("formProucts");
    var form = new FormData(idForm);
    ProductsController.insertProducts(form , function(data){
        if(data['status']){
            loadMyProducts();
            swal(name+" adcionando com sucesso" , "" , "success");
            idForm.reset();
            return;
        }

        swal("ops" , "Erro ao adcionar "+name , "error");
    });
}

function loadMyProducts(){
    ProductsController.getAll(function(res){
        data = res['data'];
        let txt = "";
        for(let i in data){
            txt += `
                <tr>
                    <td>${data[i]['nome']}</td>
                    <td>${data[i]['descricao']}</td> 
                    <td>R$ ${numberToReal(data[i]['valor'])}</td>
                    <td>
                        <i value='${data[i]['id']}' class="material-icons deleteProduct">clear_all</i>
                    </td>
                </tr>
                
            `;
        }
        document.getElementById("listMyProducts").innerHTML = txt;

        for(let i in document.getElementsByClassName("deleteProduct")){
            document.getElementsByClassName("deleteProduct")[i].onclick = function(){
                deleteProduct(this.getAttribute("value"));
            }
        }
    })
}

function deleteProduct(id) {

    swal({
        title: "Deseja apagar esse produto?",
        text: "Se apagar, perderá todos os dados desse produto",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            ProductsController.deleteProduct(id , function(data){
                if(data['status']){
                    loadMyProducts();
                    swal("Produto apagado com sucesso" , "" , "success");
                    return;
                }

                swal("Erro ao apagar produto" , "" , "error");
            });
        } else {
            Materialize.toast("Ação desfeita" , 1000);
        }
    })
}