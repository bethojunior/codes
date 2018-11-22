<?php 
    class HomeController extends View{

        function actionIndex()
        { 
            $js  = ['utils/navBar','utils/navbarHomeMobile','modulos/home'];
            $css = ['assets','reset','home','navbarTransparent','menuMobile','menuMobileHome','footer','preload'];
            $views = ['preload/index','nav/navBarTransparent','nav/navBarMobileHome','home/index','import/footer'];

            $seo = new stdClass();
            $seo->description   = 'Aplicativo de Taxi de Fortaleza que conecta hotelaria à taxistas, oferecendo o melhor preço em corridas com destinos à rodoviária/aeroporto. Acesse e descubra.';
            $seo->title         = 'Taxireturn | Aplicativo de Táxi em Fortaleza';

            $this->layoutBuilder($views, $js, $css, $seo);
        } 
    }