ManagerView.ClientView =  {
    actionIndex: function () {
        if (Session.get("user").idUser === undefined) {
            Route.redirect("Login")
        }

        const js = [
            'controllers/EstablishmentController',
            'controllers/TripController',
            'controllers/ZoneController',
            'controllers/ChatController',
            'controllers/PriceController',
            'controllers/CustomerController',
            'controllers/TripPaymentFormController',
            'service/MapService',
            'modulos/client/callTaxiReturn',
            'modulos/menu/menu',
            'modulos/trip/initTrip',
            'modulos/trip/finishTrip',
            'modulos/trip/InfoTrip',
            'modulos/paymentform/TripPaymentForm',
            'modulos/price/PriceTrip',
            'modulos/chat/comunication',
            'modulos/driver/anotherTypeDriver',
            'utils/validate',
        ];
        const css = [
            'utils/assets',
            'callTaxiReturn',
            'progress',
            "menu/menu-close",
            "menu/menu",
            'preload',
            'mapa/mapa',
            'modal/modalTypesReturn',
            'trip/animation',
            'infoTrip',
            'preloader/connection-internet',
            'modal/modalSignaling'

        ];
        const views = [
            'menu/menu-default',
            'menu/mainMenu',
            'call/index',
            'client/map',
            'client/infoTrip',
            'preload/index',
            'preload/preload-return',
            'trip/modalTypesReturn',
            'modal/infoReturn',
            'preload/connection',
            'modal/signalingArrival'
        ];

        layoutBuild(views, js, css);
    },
    actionChat: function(){
        const js = [
            'controllers/ChatController',
            'modulos/chat/chat',
         ];
        const css = [
            'chat',
         ];
        const views = [
            'chat/index',
        ];

        viewController.nameView = "chat-trip";

        layoutBuild(views, js, css);
    },
    actionPerfilDriver: function () {
        const js = [
            'controllers/UserController',
            'controllers/DriverController',
            'modulos/driver/perfil',
            'utils/FileUpload'
        ];
        const css = [
            'menu-close',
            'menu',
            'perfilDriver'
        ];
        const views = [
            'menu/mainChat',
            'driver/perfil',
        ];
        layoutBuild(views, js, css);
    },
    actionSetting: function(){
        const js = [
            'modulos/menu/menu',
            'modulos/setting/setting'
        ];
        const css = [
            'menu-close',
            'menu',
            'setting'
        ];
        const views = [
            'menu/mainDriver',
            'setting/setting',
        ];
        layoutBuild(views, js, css);
    },
    actionContactUs : function(){
        const js = [
            'utils/preload',
            'modulos/chat/contactUs',
            'controllers/CustomerController'
        ];
        const css = [
            'contactUs',
            'preload',
        ];
        const views = [
            'preload/index',
            'chat/contactUs',
        ];

        viewController.nameView = "contact-us";
        layoutBuild(views, js, css);
    },
    actionProfile : () => {
        const js = [
            'utils/preload',
            'modulos/client/profile',
            'controllers/CustomerController'
        ];
        const css = [
            'customer/profile',
            'menu/menuGeneral',
            'preload',
        ];
        const views = [
            'menu/menuGeneral',
            'preload/index',
            'profile/index',
        ];
        viewController.nameView = "viewProfile";
        layoutBuild(views, js, css);
    }
}