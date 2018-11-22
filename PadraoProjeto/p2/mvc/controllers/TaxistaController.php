<?php

class TaxistaController extends View {

    public function actionAplicativoTaxistaEmFortaleza() {
        
        $js    = ['utils/PathUrl','utils/menuBehavior','modulos/modalVideo'];
        $css   = ['reset','vendor/materialize.min','driver','navbar','assets','menuMobile','footer','preload','modalVideo'];
        $views = ['preload/index','nav/navBar','nav/navBarMobile','driver/index','import/footer','modalVideo/driver','modalVideo/driverMobile'];

        $seo = new stdClass();
        $seo->description   = 'Aplicativo para taxistas em Fortaleza. Com o TaxiReturn você fatura sem ter que dirigir ainda mais. Baixe o app e comece a ganhar dinheiro agora mesmo.';
        $seo->title         = 'Taxireturn | Aplicativo para motorista de táxi | Taxista';

        $this->layoutBuilder($views, $js, $css, $seo);
    }

}