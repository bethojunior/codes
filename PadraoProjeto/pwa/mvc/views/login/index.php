<ul id="menuLogin">
    <li><a class="wantDrive" href="<?= Host::getHostStore();?>">QUERO DIRIGIR</a></li>
    <li><a href="<?= Host::getHostCabby();?>">TAXISTA</a></li>
    <li><a href="<?= Host::getHostHostel();?>">HOTEL</a></li>
    <li style="float:left">
        <a class="active" href="<?= Host::getHostReturn();?>"><img src="<?php echo Host::getLocal()?>webfiles/img/logo/taxireturn.png"></a>
    </li>
</ul>
<div class="container-login">
    <img src="<?php echo Host::getLocal()?>webfiles/img/logo/logo_taxireturn_branco.png"
        class="logo-company">
    <div class="form-login">
        <div class="col s12 input-field data-login">
            <input type="email" id="email" class="input-login" autocomplete="off" placeholder="EMAIL">
            <i class="material-icons verify-email"  hidden>arrow_forward</i>
            <div class="bu">
            <button type="button" class="verify-email btn-login">PRÓXIMO</button></div>
        </div>
        <div class="col s12 input-field data-login">
            <input type="password" id="password" class="validate input-login" autocomplete="off"
                   placeholder="SENHA">
            <i class="material-icons authenticate-user" hidden>arrow_forward</i>
            <button type="button" class="authenticate-user btn-login">ENTRAR</button>
        </div>
    </div>
    <div class="more-info row">
        <div id='checkMobile'>
        
            <div class="displayCenter">
                <hr class="firstHr" />OU<hr class="secondHr" />
            </div>

            <div class="centerSocial">
                <img onclick="signFacebook()" class="responsive-img iconFace" src="<?=Host::getLocal()?>webfiles/img/icon/iconFace.png">
                <div onclick="loginGoogle()"  class="g-signin2"  data-onsuccess="signGoogle" data-theme="dark">
                    <div class="btn-google-login"></div>
                </div>
            </div>

        </div>
        <p>Ainda não é cadastrado ?</p>
        <a href="<?php echo Host::getHostReturn();?>Establishment/PreRegister">Cadastrar agora</a>
    </div>
</div>