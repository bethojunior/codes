<?php
/**
 * Created by PhpStorm.
 * User: Fabrica704_Acer
 * Date: 10/07/2018
 * Time: 09:01
 */

class DefaultController extends View
{
    public function actionLogin()
    {
        $this->layoutBuilder(['preload/index','login/index'],
            [   
                "utils/Handle",
                "utils/preload",
                "controllers/CustomerController",
                "controllers/UserController",
                "modulos/login"
            ],
            ["login"]);
    }

    public function actionOffline(){
        $this->rendererView('offline/index');
    }

}