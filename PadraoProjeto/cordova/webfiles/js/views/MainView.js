ManagerView.MainView = {
    actionLogin: function () {
        const js = [
            "utils/Handle",
            "utils/preload",
            "controllers/CustomerController",
            "controllers/UserController",
            "modulos/login/login"
        ];
        const views = ['preload/index','login/index'];
        const css = ["login"];

        viewController.nameView = "login";

        layoutBuild(views, js, css);
    },
    actionSignup: function(){
        const js = [
            'controllers/CustomerController',
            'modulos/client/register',
            'utils/validate'
        ];
        const css = [
            'customer/signup',
            'modal/modalCode'

        ];
        const views = [
            'preload/index',
            'customer/register',
            'modal/confirmationCode'
        ];

        viewController.nameView = "signup";

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
    },
    actionForgetPassword: function(){
        const js = [
            "utils/preload",
            "controllers/CustomerController",
            "controllers/UserController",
            "modulos/login/forgetPassword"
        ];
        const css = ['materialize' ,'forgetPassword' , 'preload'];
        const views = [
            'preload/index',
            'login/forgetPassword',
        ];
        layoutBuild(views, js, css);
    }
};