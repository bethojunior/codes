<?php

/**
 * Class Connection
 * @package services
 */
final class Connection {

    const DB_MYSQL = 'mysql';
    const DB_PGSQL = 'pgsql';

    /**
     * Connection constructor.
     */
    private function __construct() {}

    /**
     * Função abrir conexão
     * @param $name
     * @param null $environment
     * @return PDO
     */
    public static function open( $name, $environment = null )
    {

        $db = parse_ini_file('../configs/database/local.ini');

        $type = isset($db['type']) ? $db['type'] : NULL;
        $host = isset($db['host']) ? $db['host'] : NULL;
        $name = isset($db['name']) ? $db['name'] : NULL;
        $user = isset($db['user']) ? $db['user'] : NULL;
        $pass = isset($db['pass']) ? $db['pass'] : NULL;
        $port = isset($db['port']) ? $db['port'] : NULL;

        $dsn = '';

        switch ($type)
        {
            case 'pgsql':
                $port = $port ? $port : '5432';
                $dsn = "pgsql:dbname={$name};host={$host};port={$port}";
                break;
            case 'mysql':
                $port = $port ? $port : '3306';
                $dsn = "mysql:dbname={$name};host={$host};port={$port}";
                break;
        }

        $conn = new PDO( $dsn, $user, $pass );

        $conn->exec( "SET NAMES 'utf8'; SET character_set_connection=utf8; SET character_set_client=utf8; SET character_set_results=utf8;" );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    }
}