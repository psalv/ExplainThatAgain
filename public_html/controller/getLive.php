<?php

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("HTTP/1.1 403 Forbidden");
    exit;
}

include_once("../../env.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$getPost = (array)json_decode(file_get_contents('php://input'));
$sessionID = intval($getPost['sessionID']);

$sql = "SELECT live FROM Sessions WHERE sessionid = '" . $sessionID . "'";

$result = $conn->query($sql);
$result = $result->fetch_assoc();

if($result !== null){
    if(intval($result['live']) === 1){
        echo json_encode(array('success' => true, 'message' => 'Session exists and is live'));
    }
    else{
        echo json_encode(array('success' => false, 'message' => 'Session is not live'));
    }
} else{
    echo json_encode(array('success' => false, 'message' => 'Session does not exist'));
}

$conn->close();