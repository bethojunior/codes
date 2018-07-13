<?php

    function getThisPage($path , $typeFile , $concat){


        $lastLimit = -4;

        $url = str_replace("Novo/", "", $_SERVER["REQUEST_URI"]);
        $splitUrl = explode("/" , $url);
        $urlNow = substr(end($splitUrl) , 0 , $lastLimit);

        if(!empty($concat)){
            $concat = $urlNow.$concat;
        }else{
            $concat = $urlNow;
        }


        if($typeFile == "css"){
            $pathCss = "<link href='".$path.$concat.'.'.$typeFile."' rel='stylesheet'>";
            return $pathCss;
        }

        if($typeFile == "js"){
            return "<script src='".$path.$concat.'.'.$typeFile."'></script>";
        }

        
    }


    function getAll($url){
        

        function startIncludes($path){
           foreach (scandir($path) as $filename) {
               $file = $path . '/' . $filename;
               $extension = explode('.', $file);
               if (is_file($file) && end($extension) == "js") {
                   echo "<script src='".$file."'></script>";
               }
           }
        }

        return startIncludes($url);
    
    }