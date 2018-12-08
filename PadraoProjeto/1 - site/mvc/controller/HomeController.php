<?php
/**
* Created by PhpStorm.
* User: Betho Junior
* Date: 12/05/2018
* Time: 12:22
*/
class HomeController extends View {

    public function actionLogin(){
        $this->layoutBuilder(
            ['login/login'],
            [
                'modulos/login/init',
            ],
            ['login/init']
        );
    }

}