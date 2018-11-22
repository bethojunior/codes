<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('session.gc_probality', 0);
date_default_timezone_set('America/Fortaleza');

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

session_start();
startIncludes('../services');
startIncludes('../mvc/model');
startIncludes('../mvc/controller');

$route = new Route();


if (!isset($_GET['url'])) {
    if (isset($_COOKIE['user'])) {
        $route->redirectController('call');
        return;
    }
    $route->redirectController('');
    return;
}

$route->get($_GET['url']);

/**
 * @param $path
 */
function startIncludes($path)
{
    foreach (scandir($path) as $filename) {
        $file = $path . '/' . $filename;
        $extension = explode('.', $file);
        if (is_file($file) && end($extension) == "php") {
            require $file;
        }
    }
}
