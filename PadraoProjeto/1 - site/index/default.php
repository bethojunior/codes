<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('session.gc_probality', 0);
    date_default_timezone_set('America/Fortaleza');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, WCTrustedToken, userId, WCToken, PersonalizationID, AUTHUSER, Primarynum');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
    session_start();
    //inclui todas suas classes, assim evitando precisar dar inclue ou require em cada  CONTROLLER || DAO
    startIncludes('../services');
    startIncludes('../mvc/controller');
    require_once('../mvc/lib/WideImage.php');
    startIncludes('../mvc/dao');


try {
    if (!isset($_GET['url'])) {
        //NOME DE SUA CLASSE  , NOME DO METHOD
        Controller::redirectControllerAction("home", "login");
        return;
    }

    $params = explode('/', $_GET['url']);
    if (!isset($params[0])) {
        //NOME DE SUA CLASSE  , NOME DO METHOD
        Controller::redirectControllerAction("home", "login");
        return;
    }
    $class = $params[0];
    if (isset($params[1])) {
        $action = "action" . $params[1];
    }
    $classController = $class . 'Controller';
    if (!class_exists($classController)) {
        Controller::renderView("404");
        return;
    }
    $obj = new $classController();
    if (!isset($action) || !method_exists($obj, $action)) {
        return;
    }
    if (Permission::checkActionPermission($action) || isset($_SESSION['user_object']) || isset($_POST['token'])) {
        $obj->$action();
    } else {
        //NOME DE SUA CLASSE  , NOME DO METHOD
        Controller::redirectControllerAction("home", "login");
    }
} catch (Exception $e) {
    echo $e->getMessage();
}


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
    
    