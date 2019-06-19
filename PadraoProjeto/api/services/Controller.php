<?php

/**
 * Class Controller
 * @package services
 */

class Controller {
    /**
     * Função exebição
     * @param $view
     */
    public static function renderView($view) {

        require_once "../mvc/views/{$view}.php";
    }

    public function rendererView($view) {

        require_once "../mvc/views/{$view}.php";
    }
    /**
     * Função controlador de redirecionamento
     * @param $class
     */
    public static function redirectController($class) {
        header('Location: '.Host::getLocal().$class);
    }

    /**
     * Função redirecionar controlador
     * @param $class
     * @param $action
     */
    public static function redirectControllerAction($class,$action){
        header('Location: '.Host::getLocal().$class."/".$action);
    }




}