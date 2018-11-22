<?php

    function env($key) {
        $key = strtoupper($key);
        $data = json_decode(file_get_contents(getEnvironment()));
        return $data->$key ?? null;
    }

    function getEnvironment(){
        $environments = [
            'localhost' => "../config/host.local.json",
            'pwatest.taxireturn.com.br' => "../config/host.test.json",
            'pwa.taxireturn.com.br' => "../config/host.production.json",
            ];

        return $environments[$_SERVER['HTTP_HOST']];
    }

?>