<script src="<?php echo Host::getLocal();?>webfiles/js/libs/jquery-3.2.1.min.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/libs/jquery.cookie.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/libs/jquery.mask.min.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/libs/pusher.min.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/PathUrl.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/libs/sweetalert.min.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/libs/materialize.min.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/controller.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/manager.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/Host.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/ElementProperty.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/ConnectionServer.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Progress.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Position.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Mask.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/DateService.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/EventTouche.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Autocomplete.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/formatValue.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/ScreenShot.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/Session.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/DateCustom.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/SwalCustom.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/ValidateForm.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/PreloaderCustomer.js" defer></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/NetworkConnection.js" defer></script>

<!-- import dynamic js in each page  -->
<?php if(isset($this->filesJs)) : ?>
    <?php foreach ($this->filesJs as $file) : ?>
        <script type="text/javascript" src="<?php echo Host::getLocal();?>webfiles/js/<?php echo $file ?>.js"></script>
    <?php endforeach; ?>
<?php endif; ?>
</body>