<?php
/**
 * Created by PhpStorm.
 * User: Betho Junior
 * Date: 12/05/2018
 * Time: 12:22
 */
    class HomeController extends Controller{

        public $data;
        public $salesDay;

        public function actionLogin(){
            $this->rendererView("home/homeCss");
            $this->rendererView("login/login");
            $this->rendererView("preloader/index");
            $this->rendererView("home/homeJavaScript");
        }

        public function actionIndex(){
            $this->rendererView("home/homeCss");
            $this->rendererView("nav/navUltil");
            $this->rendererView("index/index");
            $this->rendererView("preloader/index");
            $this->rendererView("home/homeJavaScript");
        }

        public function actionCaixa(){

            $this->rendererView("home/homeCss");
            $this->rendererView("nav/navUltil");
            $this->rendererView("preloader/index");
            $this->rendererView("caixa/index");
            $this->rendererView("home/homeJavaScript");
        }

        public function actionProducts(){
            $this->rendererView("home/homeCss");
            $this->rendererView("nav/navUltil");
            $this->rendererView("preloader/index");
            $this->rendererView("products/index");
            $this->rendererView("home/homeJavaScript");
        }
        
    }   	