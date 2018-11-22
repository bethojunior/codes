<?php 
    class HomeController extends View{

        function actionIndex()
        { 
            $js  = [];
            $css = ['assets','preload'];
            $views = ['preload/index','home/index'];

            $seo = new stdClass();
            $seo->description   = 'Descrição da página';
            $seo->title         = 'titulo da página';

            $this->layoutBuilder($views, $js, $css, $seo);
        } 
    }