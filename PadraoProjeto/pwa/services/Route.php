<?php
/**
 * Created by PhpStorm.
 * User: Fabrica704_Acer
 * Date: 16/07/2018
 * Time: 08:01
 */

class Route extends Controller
{
    private $class;
    private $action;

    public function get($url)
    {

        $path = explode('/', $url);

        $this->class = $this->getController($path);

        if (!$this->class) {
            $this->getMethodDefault($path);
            return;
        }

        $this->action = $this->getAction($this->class, $path);

        if (!$this->action) {
            $this->renderView("404");
            return;
        }

        if (isset($_COOKIE['user']) || $this->publicRoute()) {
            call_user_func(array($this->class, $this->action));
            return;
        }
    }

    /**
     * @param $path
     */
    private function getMethodDefault($path)
    {
        $path[0] = $this->isPathValidate($path[0], "" ,"index");

        $this->class = new DefaultController();

        $this->action = $this->getAction($this->class, $path, 0);

        if (!$this->action) {
            $this->renderView("404");
            return;
        }

        call_user_func(array($this->class, $this->action));
    }

    /**
     * Valida a controller
     * @param $path
     * @param int $index
     * @return bool
     */
    private function getController($path, $index = 0)
    {

        $path[$index] = $this->isPathValidate($path[$index], "call" ,"login");

        if (!isset($path[$index])) {
            return false;
        }

        $classController = $path[$index] . 'Controller';

        if (!class_exists($classController)) {
            return false;
        }

        return new $classController();
    }


    private function isPathValidate($pathName, $withSession, $withoutSession)
    {
        if ($pathName === "index.php") {
            $pathName = $withoutSession;
            if (isset($_COOKIE['user'])) {
                $pathName = $withSession;
            }
        }

        return $pathName;
    }

    /**
     * valida a action
     * @param $class
     * @param $path
     * @param int $index
     * @return bool|string
     */
    private function getAction($class, $path, $index = 1)
    {
        $action = 'actionIndex';

        if (isset($path[$index])) {
            if (!empty($path[$index]))
                $action = "action" . $path[$index];
        }

        if (!method_exists($class, $action)) {
            return false;
        }

        return $action;
    }

    /**
     * Carrega a action e controller
     * @param $class
     * @param $action
     */
    public function reloadPage($class, $action)
    {
        $this->redirectControllerAction($class, $action);
    }

    public function publicRoute()
    {
        $publics = ['cliente/filterhostel', 'cliente/openHostel' , 'cliente/eco' , 'Driver' , 'Driver/Documents'];

        $url = $_GET['url'];

        foreach ($publics as $public) {
            if (strpos(strtolower($url), strtolower($public)) !== false)
                return true;
        }

        return false;
    }
}