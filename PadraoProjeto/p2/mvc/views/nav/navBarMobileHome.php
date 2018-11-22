<div class="container-menu-mobile" id="navbar-home">
    
    <div class="logo">
        <div class='brand-icon'>
            <a href="<?= Host::getLocal() ?>"><img id='home-logo' src="<?= Host::getLocal(); ?>webfiles/img/logo_taxireturn_branco.png" class='brand-logo left'/></a>
        </div>
    </div>
    <div class="menu-close" id="optionMenu">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="container-menu-options">
        <a href="<?= Host::getLocal() ?>"><img class="logo-white-return"
            src="<?php echo Host::getLocal() ?>webfiles/img/logo_taxireturn_branco.png"></a>
        
        <ul id="menuOptionUser">
            <li><a href='<?= Host::getLocal(); ?>Hotelaria/sistema-para-hoteis-e-pousadas'>Hotel</a></li>
            <li><a href='<?= Host::getLocal(); ?>Taxista/aplicativo-taxista-em-fortaleza'>Taxista</a></li>
            <li><a href='<?=Host::getHostPwa();?>'>Empresas</a></li>
            <li><div><a href='<?=Host::getHostPwa();?>'>Entrar</a></div></li>
            <li><a href='https://play.google.com/store/apps/details?id=br.com.taxireturn.driver' >Quero Dirigir</a></li>
        </ul>
    </div>
</div>
