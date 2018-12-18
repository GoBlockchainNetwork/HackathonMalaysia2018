<?php

function connect()
{
    $dbhost="localhost";
    $dbbuser="root";
    $dbpass="";
    $dbname="hospital";
    $conn = new mysqli($dbhost,$dbbuser,$dbpass,$dbname) or die($conn->connect_error);
    return $conn;
}
?>