<?php
    $prdoduction = false;

    if(!$prdoduction)
        header("Location: index/default.php");

    header("Location: https://apisales.betho.com.br/index/default.php");