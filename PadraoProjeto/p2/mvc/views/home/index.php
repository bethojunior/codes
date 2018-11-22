<section class="main-image-home" id="home-bg">
    <img src="<?= Host::getLocal(); ?>webfiles/img/background/baner_home.jpg" alt="Ganhe 13% sob todas as corridas que pedir" class='desktop-img'>
    <img src="<?= Host::getLocal(); ?>webfiles/img/background/banner_home_mobile.jpg" alt="Ganhe 13% sob todas as corridas que pedir" class='mobile-img'>
    <h1>App de táxi <br/> para hotéis <br> e pousadas</h1>
    <a href='<?= Host::getHostPwa(); ?>' class='btn-call-taxi button-big-shadow'>PEDIR UM TÁXI</a>
</section>

<div class='container-home' id='features'>
    <h2 class='describ-text'>O <strong>TaxiReturn</strong> é um <strong>Aplicativo de Táxi</strong> que promove uma parceria direta entre <strong>hotelaria</strong> e <strong>taxistas</strong>. Nosso objetivo principal é oferecer a melhor experiência de mobilidade urbana aos <strong>passageiros</strong> durante o percurso entre pousadas à rodoviária / aeroporto, trazendo ainda, uma série de vantagens para os taxistas e para os funcionários das <strong>pousadas</strong> parceiras.</h2>
    <div class='detalhes-types'>
        <div class='detalhes-item'>
            <h2>Hotel/Pousada</h2>
            <div class="block-features">
                <div class="img-preview">
                    <img src='<?= Host::getLocal(); ?>webfiles/img/icon_hotel.png'  class='img-item'/>
                </div>
                <div class="block-features-content">
                    <p>Ganhe até 13% sobre todas as <br/> corridas que pedir para seus hóspedes</p>
                    <div class='btn-center'>
                        <a href='<?= Host::getLocal(); ?>Hotelaria/sistema-para-hoteis-e-pousadas' class='btn-saiba-mais'>Saiba mais</a>
                    </div>
                </div>                
            </div>
        </div>
        <div class='detalhes-item'>
            <h2>Taxista</h2>
            <div class="block-features">
                <div class="img-preview">
                    <img src='<?= Host::getLocal(); ?>webfiles/img/taxista.png'  class='img-item'/>
                </div>
                <div class="block-features-content">
                    <p>Garanta uma corrida de volta ao seu <br/> ponto de partida e fature ainda mais</p>
                    <div class='btn-center'>
                        <a href='<?= Host::getLocal(); ?>Taxista/aplicativo-taxista-em-fortaleza' class='btn-saiba-mais'>Saiba mais</a>
                    </div>
                </div>    
            </div>
        </div>
        <div class='detalhes-item'>
            <h2>Passageiro</h2>
            <div class="block-features">
                <div class="img-preview">
                    <img src='<?= Host::getLocal(); ?>webfiles/img/passageiro.png'  class='img-item'/>
                </div>
                <div class="block-features-content">
                    <p>Pague menos no seu retorno para rodoviária ou <br> aeroporto com a segurança dos taxis credenciados</p>
                    <div class='btn-center'>
                        <a class='btn-saiba-mais' onmouseover="overTxt('Saiba mais',this);" onmouseout="outTxt('EM BREVE',this);">Saiba mais</a>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>

<div class="page-turista">
    <div class='descript-page-turista'>
        <p class='describ-viajantes-turista'>VIAJANTES & TURISTA</p>
        <h2 class='title-page-turista'>Táxi mais barato que <br> qualquer aplicativo.</h2>
        <p class='describ-bottom-page-turista'>Volte a viajar com a segurança do táxi <br>pagando menos do que você imagina.</p>
        <a 
            class='btn-quero-conhecer  gradient-yellow button-compact-shadow' 
            id='mouserHouverChangeTxt'
            onmouseover="overTxt('EM BREVE',this);" 
            onmouseout="outTxt('Quero conhecer',this);"> Quero conhecer</a>
    </div>
   <div class='brand-image'>
       <img src="<?= Host::getLocal(); ?>webfiles/img/foto_turista.png" class='img-turista'>
   </div>
</div>
<div class='container-home'>
    <div class='div-hoteis-pousadas'>
        <div class='inf-ganhe-mais-gold'>
            <p class='label-title'>Hoteis & Pousadas</p>
            <h2 class='tile-hoteis-pousadas'>Seu hotel ganha,  você ganha! <br/></h2>
            <div class="block-hostel">
                <img src="<?= Host::getLocal(); ?>webfiles/img/planta-money.png" alt="" class='img-hoteis-pousadas'>
                <div class="block-hostel-content">
                    <h3 class='title-da-img-money'>ganhe mais dinheiro</h3>
                    <p>Com o <strong>TaxiReturn</strong> você e o seu hotel ganham uma porcentagem sobre todas as <strong>corridas de táxi</strong> que pedir para seus hóspedes pelo app com destino à rodoviária ou aeroporto.</p>
                </div>
            </div>
        </div>
        <div class='image-return'>
            <img src="<?= Host::getLocal(); ?>webfiles/img/return.png" alt="" class='imge-return-img'>
        </div>
        <div class='inf-ganhe-mais-gold convesion-box-flex'> 
        
            <div class="block-hostel">
                <img src="<?= Host::getLocal(); ?>webfiles/img/conversation.png" alt="" class='img-hoteis-pousadas'>
                <div class="block-hostel-content">
                    <h3 class='title-da-img-money'>Experência do hóspede</h3>
                    <p>Garanta que a experiência final do hóspede no seu hotel seja tão boa quanto toda a estadia. O <strong>TaxiReturn</strong> direciona para os seus clientes, <strong>táxis credenciados</strong> com a rodoviária e aeroporto da cidade, E trazendo <strong>segurança</strong> e <strong>qualidade</strong> no bagageiro.</p>
                </div>
            </div>
            
        </div>
    </div>
    <div class="btn-hoteis">
        <a href='<?= Host::getHostPwa(); ?>' class='gradient-yellow button-big-shadow'>Cadastrar agora</a>
    </div>
</div>
<div class='div-flex-box-seja-taxista'>
    <img src="<?= Host::getLocal(); ?>webfiles/img/baner_site_motorista.png" class='img-lange-seja-taxista'>
    <div class='div-flex-text-description'>
        <h2>Taxista</h6>
        <h1>Seja um taxista parceiro.</h2>
        <p>Com o TaxiReturn você aumenta o seu rendimento mensal sem ter que trabalhar ainda mais.</p>
        <a href="<?= Host::getLocal(); ?>Taxista/aplicativo-taxista-em-fortaleza" class='button-compact-shadow gradient-yellow'>Quero Dirigir</a>
    </div>
</div>

