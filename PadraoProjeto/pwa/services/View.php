<?php
/**
 * Created by PhpStorm.
 * User: Emerson
 * Date: 08/04/2018
 * Time: 07:42
 */

class View extends Controller
{

    public $clientData = [];
    public $user;
    public $permissions = [];
    public $description;
    public $filesJs;
    public $filesCss;
    protected $seo = null;

    /**
     * @param array $views
     * @param array $filesJs
     * @param array $filesCss
     * @param null | Seo $objSeo
     * @param bool $infoClient
     */
    public function layoutBuilder($views = [],$filesJs = [],$filesCss = [], $objSeo = null, $infoClient = false)
    {
        $this->filesJs = $filesJs;
        $this->filesCss = $filesCss;

        if($objSeo != null) {
            $this->seo = new Seo($objSeo);
        }

        $this->rendererView("import/head");

        foreach ($views as $view) {
            $this->rendererView($view);
        }

        $this->rendererView("import/footer");
    }

    
    public function rendererViews($views = [])
    {

        $this->rendererView("import/head");

        foreach ($views as $view) {
            $this->rendererView($view);
        }

        $this->rendererView("import/footer");

    }

}