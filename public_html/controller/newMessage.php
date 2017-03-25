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
$sessionID = $getPost['sessionID'];
$owner = $getPost['owner'];
$message = $getPost['message'];
$table = "Chat_" . $sessionID;

$sql = "INSERT INTO " . $table . " (username, message) VALUES ('" . $owner . "', '" . $message . "')";

if($conn->query($sql) === TRUE){
    echo json_encode(array('success' => true, 'message' => 'Inserted new chat message'));
}
else{
    echo json_encode(array('success' => false, 'message' => 'Could not insert new message'));
}


$conn->close();



