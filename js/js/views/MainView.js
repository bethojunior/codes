ManagerView.MainView = {
    actionLogin: function () {
        const js = [
            'controllers/DriverController',
            'service/Push',
            'modulos/driver/login',
            'modulos/test/secret'
        ];
        const css = ['menu','login','preload'];
        const views = ['menu/menuTitle','login/index' , 'forgetPassword/index' , 'preloader/index'];
        layoutBuild(views, js, css);
    },
    actionIndex: function () {
        if (Session.get("user").idUser !== undefined) {
            Route.redirect("Driver")
        }
        const js = ['modulos/menu/main'];
        const css = ['main'];
        const views = ['default/index'];
        layoutBuild(views, js, css);
    },
    actionSignup: function(){
        const js = [
            'controllers/DriverController',
            'controllers/EstateController',
            'controllers/CityController',
            'controllers/StationTypeController',
            'controllers/StationController',
            'controllers/CooperativeController',
            'controllers/SupportController',
            'controllers/UserController',
            'service/MapService',
            'utils/FormGroup',
            'utils/FileUpload',
            'modulos/validator/validateSignup',
            'modulos/driver/signup'
        ];
        const css = ['menu','signup', 'preload'];
        const views = [
            'menu/menuTitle',
            'driver/signup',
            'preloader/index'
        ];
        layoutBuild(views, js, css);
    },
    actionLincense: function(){
        const js = [];
        const css = ['menu','signup'];
        const views = [
            'menu/menuTitle',
            'lincense/index',
        ];
        layoutBuild(views, js, css);
    }
};