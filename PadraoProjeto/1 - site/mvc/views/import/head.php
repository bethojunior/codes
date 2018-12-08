<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Barkanas</title>
    <link href="<?php echo Host::getLocal(); ?>webfiles/css/iconfont/material-icons.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"/>
    <meta name="theme-color" content="#E99919"/>
    <meta charset="UTF-8">
    <meta name="google-signin-scope" content="profile email">
    <link rel="manifest" href="<?php echo Host::getLocal(); ?>config/manifest.json">
    <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/Materialize/css/materialize.min.css">

    <?php
    foreach ($this->filesCss as $file) {
        ?>
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
