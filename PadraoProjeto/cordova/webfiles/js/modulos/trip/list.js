viewController.setObserver("trips", function () {
    const elementProperty = new ElementProperty();
    const customerController = new CustomerController();
    const mapService = new MapService();

    const userLogged = Session.get("user");

    const paginate = {
        page: 1,
        status: null,
        date: null,
        setting: null
    };

    const type = {
        "finished" : "Finalizado",
        "accepted" : "Aceita",
        "canceled" : "Cancelada",
        "boarding" : "Embarcando",
        "in_progress" : "Em viagem"
    };

    getList();

    elementProperty.addEventInElement(".go-back", "onclick", function () {
        Route.backPage();
    });

    function getList() {
        customerController.getTrips(userLogged.idCustomer, paginate.page, paginate.date, paginate.status)
            .then(({status, data}) => {
                if (!status) {
                    return;
                }

                paginate.setting = data.paginate;

                showTrips(data.trips);
            });
    }

    function showTrips(trips) {

        elementProperty.getElement("#tripsClient", element => {
            element.innerHTML = trips.map(trip => {
                showImgMap(trip);

                return `
                     <li>
                        <img src="" id="mapImg${trip.tripReference}">
                        <div class="detail-trip">
                            <div>
                                <span class='type-trip'>${trip.type}</span>
                                <span>${Mask.maskMoney(parseFloat(trip.price))}</span>
                            </div>
                            <span class='date-trip'>${DateCustom.getDateLocal(trip.date)}</span>
                            <span class='status-trip'>${type[trip.status]}</span>
                            <span class='address-origin-trip'>${trip.originAddress}</span>
                            <span class='address-destination-trip'>${trip.destinationAddress}</span>
                        </div>
                    </li>
                `
            }).join("")
        });
    }

    function showImgMap(trip){
        const origin = {
            lat : parseFloat(trip.originLatitude),
            lng : parseFloat(trip.originLongitude),
        };
        const destination = {
            lat : parseFloat(trip.destinationLatitude),
            lng : parseFloat(trip.destinationLongitude),
        };

        mapService.getImgMapTrip(origin,destination,`#mapImg${trip.tripReference}`);
    }

    Route.pageDynamic();
});
