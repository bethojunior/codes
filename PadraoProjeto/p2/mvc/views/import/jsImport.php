<!-- defaults js -->
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/lib/jquery-3.2.1.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/lib/axios.min.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/plugins/sweetalert.min.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/vendor/materialize/js/materialize.js"></script>

<!-- utils -->
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/ConnectionServer.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/Host.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/ConnectAPI.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/navbarMobile.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/SimpleSwall.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/ElementProperty.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/validateData.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/preload.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/windowResize.js"></script>

<!--controllers-->
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/controllers/MailchimpController.js"></script>
    <script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/modulos/mailchimp.js"></script>

<!-- import dynamic js in each page  -->
<?php if(isset($this->filesJs)) : ?>
    <?php foreach ($this->filesJs as $file) : ?>
        <script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/<?php echo $file ?>.js"></script>
    <?php endforeach; ?>
<?php endif; ?>
</body>