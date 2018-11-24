if(PathUrl.getPathUrl() == "home/caixa"){

    getRequestsByDay();
    getValueDay();
    getValueWeek();
    getValueMonth();
    
}

function getRequestsByDay() {

    CashierController.getRequestsByDay()
        .then(res => {

            if(res['status'] == false){
                Materialize.toast("Não há dados" , 1000);
                return;
            }
    
            var data = res['data'];
            var txt = "";

            for(let i in data){
                txt += `
                    <tr>
                        <td>${data[i]['name']}</td>
                        <td>${data[i]['tel']}</td>
                        <td>${data[i]['status']}</td>
                        <td>R$ ${numberToReal(data[i]['amount'])}</td>
                    </tr>
                `;
            }

            document.getElementById("requestsByDay").innerHTML = txt;
        });

}

function getValueDay() {
    CashierController.getValueDay((data)=>{
        total = "Não há dados";

        if(data['data'][0]['total'] != null){
            console.log("is null");
            total = "R$ " + numberToReal(data['data'][0]['total']);
        }

        document.getElementById("valueDay").innerHTML = total;
    });
}

function getValueWeek() {
    CashierController.getValueWeek((data)=>{
        total = "Não há dados";

        if(data['data'][0]['total'] != null){
            console.log("is null");
            total = "R$ " + numberToReal(data['data'][0]['total']);
        }

        document.getElementById("valueWeek").innerHTML = total;
    });
}


function getValueMonth() {
    CashierController.getValueMonth((data)=>{
        total = "Não há dados";

        if(data['data'][0]['total'] != null){
            console.log("is null");
            total = "R$ " + numberToReal(data['data'][0]['total']);
        }

        document.getElementById("valueMonth").innerHTML = total;
    });
}

