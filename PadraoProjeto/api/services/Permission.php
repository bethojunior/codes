<?php
/**
 * Created by PhpStorm.
 * User: Betho Junior
 * Date: 12/05/2018
 * Time: 12:01
 */


class Permission
{
    /**
     * @param $action
     * @return bool
     */
    public static function checkActionPermission($action){
        $return = true;
        $actions = array(
            "actionIndex",);
        if(in_array($action,$actions)){
            $return = true;
        }
        return $return;
    }
}