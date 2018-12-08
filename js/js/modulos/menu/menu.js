Route.waitView().then(function () {

    const userLogged = Session.get("user");
    const driverController = new DriverController();


    if (userLogged.profileImage !== null)
        document.getElementById("imageUser").src = PATH_IMAGE + userLogged.profileImage;

    const elementProperty = new ElementProperty();

    elementProperty.getElement("#nameUser", element => {
        element.innerHTML = userLogged.nickname;
    });

    elementProperty.addEventInElement("#logout", "onclick", function () {
        const trip = Session.get("tripDriver");

        if(trip.length !== 0){
            SwalCustom.dialogConfirm("Atenção",
                "Ao sair do aplicativo em corrida você estara cancelando a viagem !",(status)=>{
                    if(status){
                        new DriverController().cancelTrip({
                            tripReference: trip.tripReference,
                            driverId: userLogged.idDriver,
                            cancellationReasonsId : 4
                        }).then(()=>{
                            Session.delete("user");
                            Route.redirect("Main")
                        })

                    }
                });
            return;
        }

        Session.delete("user");
        Route.redirect("Main");
    });

    elementProperty.addEventInElement(".menu-close", 'onclick', function () {
        elementProperty.getElement(".container-menu-options", element => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
                return;
            }
            element.classList.add("active");
        });

        if (!this.classList.contains("open")) {
            this.classList.add("open");
            return;
        }

        this.classList.remove("open");
    });

    cordova.getAppVersion.getVersionNumber().then(function (version) {
        elementProperty.getElement("#appVersion", element => {
            element.innerHTML = `VERSÃO: ${version + " "+ typeVersion}`;
        });

        driverController.
            updateVersion(userLogged.idDriver,version);
    });

    elementProperty.addEventInElement(".test-ping","onclick",function(){
        const pingManager = new Ping();
        pingManager.ping([{query: "taxireturn.com.br", timeout: 1,retry: 3,version:'v4'}], function (result) {
            const {response} = result[0];

            if(response.status !== "timeout") {
                alert(`Ping com sucesso \n
                       para : ${response.result.target}\n
                       Media de latencia: ${response.result.avgRtt}\n
                       Minima latencia: ${response.result.minRtt}\n
                       Maxima latencia: ${response.result.maxRtt}\n
                       Pacote transmitido: ${response.result.pctTransmitted}\n
                       Pacote Recebido: ${response.result.pctReceived}\n
                       Perda de Pacote: ${response.result.pctLoss}\n`);
            }else{
                alert(`Ping com falha \n
                       para : ${response.result.target}\n
                       Media de latencia: ${response.result.avgRtt}\n
                       Minima latencia: ${response.result.minRtt}\n
                       Maxima latencia: ${response.result.maxRtt}\n
                       Pacote transmitido: ${response.result.pctTransmitted}\n
                       Pacote Recebido: ${response.result.pctReceived}\n
                       Perda de Pacote: ${response.result.pctLoss}\n`);
            }
        }, function (error) {

        });
    });


    elementProperty.addEventInElement("#shareApp","onclick",function(){
        window.plugins.socialsharing.shareWithOptions({
            message: "Estou usando o TaxiReturn e tô te indicando o aplicativo pra você começar a receber novas corridas.\n",
            subject: 'TaxiReturn',
            url: `https://play.google.com/store/apps/details?id=br.com.taxireturn.driver`,
        }, (result)=>{}, (error)=>{});
    });
    elementProperty.addEventInElement("#imageUser","onclick",function(){
        Route.redirectDynamic("Driver","PerfilDriver")
    })


});
function comeBackIndexChat() {
    Route.backPage();
}