<?php 
    class HomeController extends View{

        function actionIndex()
        { 
            $js  = ['utils/navBar','utils/navbarHomeMobile','modulos/home'];
            $css = ['assets','reset','home','navbarTransparent','menuMobile','menuMobileHome','footer','preload'];
            $views = ['preload/index','login/init'];

            $seo = new stdClass();
            $seo->description   = 'Barkanas, o melhor espetinho da cidade';
            $seo->title         = 'Barkanas';

            $this->layoutBuilder($views, $js, $css, $seo);
        } 
    }