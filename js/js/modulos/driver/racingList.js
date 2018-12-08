viewController.setObserver("racing-list", function () {
    $('.modal').modal();
    $('select').material_select();

    var page = 0;
    let lastPageList;
    let dataList = [];
    let filterRun = false;
    let statusTrip = null;
    const elementProperty = new ElementProperty();

    const STATUS_CANCELED = "canceled";

    const driverController = new DriverController();
    const dataDriver = Session.get("user");
    const idDriver = dataDriver.idDriver;

    callList(idDriver, false, false);

    const statusPt = {
        finished: "Finalizou",
        canceled: "Cancelado",
        in_progress: "Embarcou",
        boarding: "Chegou",
        searching: "Buscando",
        accepted: "Aceitou",
    };

    function callList(idDriver, modal, concat) {

        page += 1;

        if (modal) {
            $('#openModalFilter').modal('close');
        }

        driverController.getTripsById(idDriver, page, null, statusTrip).then(result => {

            dataList = result;

            mountList(concat);

        });

    }

    function mountList(concat = true) {
        let writeTrips = "";

        let lenghtTrips = dataList.data.trips.length;

        if (lenghtTrips === 0) {
            Materialize.toast("Não há corridas para esta data", 10000);
            return;
        }

        lastPageList = dataList.data.paginate.lastPage;

        if (!dataList.status) {
            Materialize.toast('Desculpe, não podemos lhe informar esses dados agora', 8000);
            return;
        }

        dataList.data.trips.map(res => {
            writeTrips += `
                <div fantasyName='${res.address}' tripReference='${res.tripReference}' destiny='${res.destiny}' dateRun='${res.date}' origin='${res.originAddress}' price='${res.price}' value='${res.tripReference}' class='divDataRace col s12'>

                    <div class='row'>
                        <span class='left'>Taxireturn</span>
                        <span class='fs-3 right'>${statusPt[res.status]}</span> 
                    </div> 

                    <div class='row'>
                        <div class='ballgray'></div>
                        <span class='dateRunning'>${DateService.treatDate(res.date)}</span>
                    </div>

                    <div class='row'>
                        <div class='ballgreen'></div>
                        <span class='dateRunning'>${res.originAddress.substr(0, 35)}</span>
                    </div>

                    <div class='row'>
                        <div class='ballOrange'></div>
                        <span class='dateRunning'>${res.destiny.substr(0,30)}</span>
                    </div>

                </div>
            `;
        });

        elementProperty.getElement('#mountListRacing', element => {
            if (concat) {
                element.innerHTML += writeTrips;
                return;
            }
            element.innerHTML = writeTrips;
        });

        elementProperty.getElement(".custom-preloader", element => {
            element.style.display = "none";
        });

        elementProperty.addEventInElement('.divDataRace', 'onclick', function () {

            $('#modalDataRunSelect').modal('open');

            let tripReference = this.getAttribute("tripReference");

            TripController.getTimeLineByTrip(tripReference).then(({message,status,data}) => {

                if(!status){
                    SwalCustom.messageDialog(message,"Atenção",undefined,"warning");
                    return;
                }

                elementProperty.getElement("#checkIfCodeRed",element=>{
                    if(data.status === STATUS_CANCELED){
                        element.innerHTML = "CANCELADO";
                        element.style.color = "#696969";
                        return;
                    }

                    element.innerHTML = data.situation;
                    element.style.color = data.colorAudit;
                });

                mountTimeline(data.timelineStatus)
            });

            elementProperty.getElement('#originAddress', element => {
                element.innerHTML = this.getAttribute("fantasyName");
            });

            elementProperty.getElement('#valueRunning', element => {
                element.innerHTML = "R$ " + FormatNumber.cash(this.getAttribute("price"));
            });

            elementProperty.getElement('#destinyAdress', element => {
                element.innerHTML = this.getAttribute("destiny");
            });

            elementProperty.getElement('#dateRun', element => {
                element.innerHTML = DateService.treatDate(this.getAttribute("dateRun"));
            });

        });

    }

    /*$('.geralRacingList').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {

            if (page >= lastPageList) {
                return;
            }

            if(filterRun){
                callList(idDriver , true , false);
                return;
            }

            callList(idDriver , false , true);
        }

    });*/

    elementProperty.addEventInElement(".geralRacingList", "onscroll", function () {
        if (this.scrollHeight - this.scrollTop === this.clientHeight) {
            if (page >= lastPageList) {
                return;
            }

            elementProperty.getElement(".custom-preloader", element => {
                element.style.display = "block";
            });

            if(filterRun){
                callList(idDriver , true , true);
                return;
            }

            callList(idDriver , false , true);
        }
    });

    function mountTimeline(data) {

        document.getElementById("detailsRunning").innerHTML = "";
        document.getElementById('mountTimeline').innerHTML = "";

        let timeline = '';
        let statusTimeLine = '';
        let color;

        data.map(res => {
            let statusTrip = statusPt[res.tripStatus];
            color = res['info']['color'];
            timeline += `
                <div class='divOne ${color}'></div>
            `;

            statusTimeLine += `
                <span>${statusTrip}</span>
            `;

        });

        document.getElementById("detailsRunning").innerHTML = statusTimeLine;
        document.getElementById('mountTimeline').innerHTML = timeline;

    }

    elementProperty.addEventInElement('#filterList', 'onclick', function () {
        $('#openModalFilter').modal('open');
    });


    elementProperty.addEventInElement('#makeFilter', 'onclick', function () {

        page = 0;
        dataList = [];

        statusTrip = document.querySelector('input[name=status]:checked').value;

        if (statusTrip === "all") {
            statusTrip = null;
        }

        elementProperty.getElement('#mountListRacing', element => {

            element.innerHTML = "";

            driverController.getTripsById(idDriver, page++, null, statusTrip).then(result => {

                $('#openModalFilter').modal('close');
                dataList = result;
                filterRun = true;
                mountList(false);
            });

        });

    });
    Route.pageDynamic();
});

function comeBackIndex() {
    Route.backPage();
}