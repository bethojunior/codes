if(PathUrl.getPathUrl() == "home/index" || PathUrl.getPathUrl() == "home/index"){
    loadDataRequests();
}
$('select').material_select();
//loadDataRequests();

function loadDataRequests(){
    let status = "ENTREGUE";
    RequestController.getAllRequest(status , function(res){

        // if(!res['status']){
        //     swal("Erro ao carregar os dados dos pedidos" , "Recarregue a página" , "error");
        //     return;
        // }

        let data = res['data'];
        classStatus = "";
        text        = "";
        for(let i in data){


            hora = data[i]['datanow'].substr(9,18);
            hora = hora.split("-");
            hora = hora[0]+":"+hora[1]+":"+hora[2];

            dataNow = data[i]['datanow'].substr(0,8);
            dataNow = dataNow.split("-");
            dataNow = dataNow[0]+"/"+dataNow[1]+"/"+dataNow[2];
            status = data[i]['status'];

            if(status === "AGUARDANDO"){
                classStatus = "red;";
            }

            if(status === "Preparando"){
                classStatus = "blue";
            }

            if(status == "Saiu para entrega"){
                classStatus = "green";
            }

            text += `
                <tr class=''>
                    <td>${data[i]['name']}</td>
                    <td title='Abra pelo whatsApp'>
                        <a target="_blank" class="colorBlue" href='https://api.whatsapp.com/send?phone=55${data[i]['tel']}&text=Olá, seu pedido já está em andamento'>
                            ${data[i]['tel']}
                        </a>
                    </td>
                    <td>${data[i]['endereco']}</td>
                    <td>${dataNow} - ${hora} h</td>
                    <td>R$${numberToReal(data[i]['amount'])}</td>
                    <td style="color: ${classStatus}">${data[i]['status']}</td>
                    <td class='openRequest' value='${data[i]['idRequest']}'>
                        <a title="Aceitar pedido" class="acceptRequest" value="${data[i]['idRequest']}">
                            <i class="material-icons">check</i>
                        </a>
                        <a title="Detalhes do pedido" class="seeRequest" data='${data[i]['products']}' value="${data[i]['idRequest']}">
                            <i class="material-icons">format_list_bulleted</i>
                        </a>
                        <a value="${data[i]['idRequest']}" class="modalStatusRequest" title="Status  pedido"><i class="material-icons">navigation</i></a>
                    </td>
                </tr>
            `;

        }


        document.getElementById("lastRequests").innerHTML = text;


        for(let i in document.getElementsByClassName("acceptRequest")){
            document.getElementsByClassName("acceptRequest")[i].onclick = function(){
                var idRequest = this.getAttribute("value");

                swal({
                    title: "Deseja aceitar esse pedido?",
                    text: "Aceitando o pedido, você não vai poder cancelar",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            RequestController.changeStatus("Preparando" , idRequest , function(data){
                                if(data['status']){
                                    swal("Poof! Your imaginary file has been deleted!", {
                                        icon: "success",
                                    });
                                    Materialize.toast('Pedido em preparo', 4000);
                                    return;
                                }
                                Materialize.toast('Pedido já em preparo', 4000);
                            });

                        } else {
                            swal("Ação desfeita");
                        }
                    });

            }
        }

        for(let i in document.getElementsByClassName("seeRequest")){
            document.getElementsByClassName("seeRequest")[i].onclick = function(){

                var pedidos = "";
                let list = [];
                var idRequest = this.getAttribute("value");
                var dataProducts  = this.getAttribute("data");
                var arrayMyProducts = dataProducts.split(",");
                var products = dataProducts.split(',');
                console.log(products);


                getAllProducts(function(data){


                    products.map(product=>{
                        list = list.concat(data.filter(item1 => {
                            return item1.id === product;
                        }));
                    });

                    console.log(list);

                    for(let i in list){
                        pedidos += `
                            <tr>
                                <td>${list[i]['nome']}</td>
                                <td>${list[i]['descricao']}</td>
                                <td>R$${numberToReal(list[i]['valor'])}</td>
                            </tr>
                        `;
                    }

                    $('#modalProductsRequests').modal('open');
                    document.getElementById("listProductsRequests").innerHTML = pedidos;

                });


            }
        }


        for(let i in document.getElementsByClassName("modalStatusRequest")){
            document.getElementsByClassName("modalStatusRequest")[i].onclick = function(){
                $('#modalStatusRequest').modal('open');
                document.getElementById("idRequest").value = this.getAttribute("value");
            }
        }

        setTimeout(function(){
            loadDataRequests();
        },2000)

    });
}

function changeStatus() {
    id =  document.getElementById("idRequest").value;
    status = document.getElementById("statusRequest").value;

    RequestController.changeStatus(status , id , function(data){
        console.log(data);
    })
}