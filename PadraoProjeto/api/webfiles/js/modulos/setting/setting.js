Route.waitView().then(()=>{
    const elementProperty = new ElementProperty();

    const setting = Session.get("setting").length === 0 ? {
            zoom : 18,
            rota: 50,
            giro : 1
        } : Session.get("setting");

    elementProperty.getElement("#sensibilidadeRota",element=>{
        element.value = setting.rota;
    });
    elementProperty.getElement("#zoomMapa",element=>{
        element.value = setting.zoom;
    });
    elementProperty.getElement("#tempoGiro",element=>{
        element.value = setting.giro;
    });

    elementProperty.addEventInElement("#saveSetting","onclick",function(){

        Session.set("setting",{
            zoom: parseInt(document.getElementById("zoomMapa").value),
            giro: parseInt(document.getElementById("tempoGiro").value),
            rota: parseInt(document.getElementById("sensibilidadeRota").value),
        });

        SwalCustom.messageDialog("Alterações salva com sucesso", "Atenção",()=>{},"success");
    });
});