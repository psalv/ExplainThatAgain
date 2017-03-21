<?php


if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("HTTP/1.1 403 Forbidden");
    exit;
}


include_once("../../env.php");


$getPost = (array)json_decode(file_get_contents('php://input'));
$sessionID = $getPost['gotoID'];