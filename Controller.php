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

    /**
     * Função controlador de redirecionamento
     * @param $class
     */
    public static function redirectController( $class ) {
        echo "<script>location.href='../index/default.php?class=$class';</script>";
    }

    /**
     * Função redirecionar controlador
     * @param $class
     * @param $action
     */
    public static function redirectControllerAction($class,$action){
        echo "<script>location.href='../index/default.php?class=$class&action=$action';</script>";
    }




}