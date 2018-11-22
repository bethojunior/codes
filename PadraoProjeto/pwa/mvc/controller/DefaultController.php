<?php
/**
 * Created by PhpStorm.
 * User: Fabrica704_Acer
 * Date: 10/07/2018
 * Time: 09:01
 */

class DefaultController extends View
{
    public function actionIndex()
    {
        $this->layoutBuilder(['preload/index','home/index'],
            [
                "utils/preload",
                "modulos/home/init"
            ],
            ["home/init"]);
    }


    public function actionOffline(){
        $this->rendererView('offline/index');
    }

}