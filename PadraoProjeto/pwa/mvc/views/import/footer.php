<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/libs/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/libs/jquery.cookie.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/libs/jquery.mask.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/libs/pusher.min.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/libs/materialize.min.js"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/libs/sweetalert.min.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/Host.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/RegisterServiceWorker.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/windowResize.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/Notification.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/Session.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/DateCustom.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/preload.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/LocalStorage.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/OptionElement.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/utils/SwalCustom.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/ConnectionServer.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/Mask.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/EventTouche.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/ElementProperty.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/Autocomplete.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/WebSocket.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/Progress.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/Storaged.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/checkNotifications.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/MappingSpot.js?v=<?= Host::getVersion()?>"></script>
<script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/service/Spot.js?v=<?= Host::getVersion()?>"></script>

<?php
foreach ($this->filesJs as $file) {
    ?>
    <script type="text/javascript" src="<?php echo Host::getLocal(); ?>webfiles/js/<?php echo $file ?>.js?v=<?= Host::getVersion()?>"></script>
    <?php
} ?>

</body>