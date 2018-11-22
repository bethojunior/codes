<footer class="footer bg-dark-yellow">
    <div class='footer-container'>
        <div class='collun-container'>
            <img src='<?= Host::getLocal(); ?>webfiles/img/e-assesso.png' width='70px' />
            <p>Rua São Paulo 32 - Centro <br/> Fortaleza - CE</p>
        </div>
        <div class='collun-container'>
            <p><b>Contatos:</b></p>
            <p><a href="tel:8532218843">(85) 3121-8843</p></a> 
            <!-- <br/> -->
            <p><b>Suporte:</b></p>
            <p><a href="tel:8599677-7458">(85) 9.9677-7458 (WhatsApp)</p></a>
            <a href="mailto:contato@taxireturn.com.br"><p>contato@taxireturn.com.br</p></a>
        </div>
        <div class='collun-container'>
            <p><b>Cadastre-se e fique por dentro <br/> de novidades exclusivas.</b></p>
            <div class='flexbox-form-group'>
                <input type="email" placeholder='Seu e-mail' class='input-footer-contato' id='newsletter' onkeypress="handleEnterNewsletter(event)">
                <button class='check-button' onclick="register();">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        </div>
    </div>
    <div class='copy'>
        <p>2018 TaxiReturn - Todos os direitos reservados.</p>
    </div>
</footer>
