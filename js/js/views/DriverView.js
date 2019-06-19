ManagerView.DriverView =  {
    actionIndex: function () {
        if (Session.get("user").idUser === undefined) {
            Route.redirect("Login")
        }

        const js = [
            'service/MapService',
            'service/Push',
            'service/ChatNotification',
            'controllers/DriverController',
            'controllers/LocationController',
            'controllers/ChatTripController',
            'controllers/CancellationReasonsController',
            'controllers/LogController',
            'controllers/StationController',
            'controllers/StationTypeController',
            'modulos/authenticate/StatusDriver',
            'modulos/driver/return',
            'modulos/trip/trip',
            'modulos/trip/tripQuestion',
            'modulos/menu/menu',
            'modulos/trip/tripCancel',
            'modulos/notifications/newNotification',
            'modulos/trip/InfoClientTrip'
        ];
        const css = [
            'menu-close',
            'menu',
            'chatNotification',
            'home',
            'finishTrip',
            'tripCancel',
            'call',
            'newNotification',
            'preload',
            'return',
            'modal/modalSignaling',
            'modal/dataClient',

        ];
        const views = [
            'menu/mainDriver',
            'driver/index',
            'notification/chat',
            'trip/finishTrip',
            'driver/call',
            'trip/tripCancel',
            'notification/modalNewNotification',
            'preloader/index',
            'driver/return',
            'modal/signalingClient',
            'modal/dataClient',
        ];
        layoutBuild(views, js, css);
    },
    actionChat: function(){
        const js = [
            'controllers/DriverController',
            'controllers/ChatTripController',
            'modulos/driver/chat',
         ];
        const css = [
            'chat',
         ];
        const views = [
            'trip/chat',
        ];

        viewController.nameView = "chat-trip";

        layoutBuild(views, js, css);
    },
    actionRacingList: function(){
        const js = [
            'controllers/DriverController',
            'controllers/TripController',
            'modulos/menu/menu',
            'modulos/driver/chat',
            'modulos/driver/racingList'
         ];
        const css = [
            'racingList'
         ];
        const views = [
            'driver/racingList',
        ];

        viewController.nameView = "racing-list";

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
    actionPromotion: function(){
        const js = [
            'controllers/PromotionController',
            'modulos/menu/menu',
            'modulos/setting/setting',
            'modulos/promotion/init',

        ];
        const css = [
            'menu-close',
            'menu',
            'setting',
            'promotion'
        ];
        const views = [
            'menu/mainDriver',
            'preloader/index',
            'promotion/index',
        ];
        layoutBuild(views, js, css);
    },
}