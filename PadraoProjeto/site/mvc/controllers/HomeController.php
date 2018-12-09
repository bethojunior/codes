<?php

class HomeController extends View{

    function actionIndex(){
        $js  = ['modulos/home/init'];
        $css = ['home/init','preload'];
        $views = ['preload/index','home/index','nav/firstNav'];

        $seo = new stdClass();
        $seo->description   = 'Barkanas, o melhor espetinho da cidade';
        $seo->title         = 'Barkanas';

        $this->layoutBuilder($views, $js, $css, $seo);
    }



}