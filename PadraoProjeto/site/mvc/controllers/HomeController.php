<?php

class HomeController extends View{

    function actionIndex(){
        $js  = ['modulos/login/init'];
        $css = ['login/init','preload'];
        $views = ['preload/index','login/init'];

        $seo = new stdClass();
        $seo->description   = 'Barkanas, o melhor espetinho da cidade';
        $seo->title         = 'Barkanas';

        $this->layoutBuilder($views, $js, $css, $seo);
    }



}