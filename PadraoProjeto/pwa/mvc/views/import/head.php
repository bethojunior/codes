<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>TaxiReturn</title>
    <link href="<?php echo Host::getLocal(); ?>webfiles/css/iconfont/material-icons.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"/>
    <meta name="theme-color" content="#E99919"/>
    <meta charset="UTF-8">
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="<?=Host::getIdGoogle()?>">
    <link rel="manifest" href="<?php echo Host::getLocal(); ?>config/manifest.json">
    <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/css/materialize.min.css">
    <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/css/menu.css?v=<?= Host::getVersion()?>">
    <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/css/utils/assets.css?v=<?= Host::getVersion()?>">
    <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/css/fonts-google/Dosis.css?v=<?= Host::getVersion()?>">
    <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/css/preload.css?v=<?= Host::getVersion()?>">
<!--    <link href="https://fonts.googleapis.com/css?family=Lato|Montserrat|Open+Sans|Source+Sans+Pro" rel="stylesheet">-->
    <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/css/autocompleteCustom.css?v=<?= Host::getVersion()?>">

    <?php
    foreach ($this->filesCss as $file) {
        ?>
        <link rel="stylesheet" type="text/css" href="<?php echo Host::getLocal(); ?>webfiles/css/<?php echo $file?>.css?v=<?= Host::getVersion()?>">
        <?php
    } ?>

    <?php if($this->seo != null) : ?>
        <title><?= $this->seo->getTitle(); ?></title>
        <meta property="og:title" content="<?= $this->seo->getTitle(); ?>">
        <meta property="og:description" content="<?= $this->seo->getDescription(); ?>">
        <meta property="og:image" content="<?= Host::getLocal();?><?= $this->seo->getOgImage(); ?>">
        <meta content="<?= $this->seo->getDescription(); ?>" name="description">
    <?php endif; ?>

</head>
<body>
