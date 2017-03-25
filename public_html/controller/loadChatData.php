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
$table = "Chat_" . $sessionID;


$sql = "SELECT * from " . $table . " ORDER BY id ASC";
$result = $conn->query($sql);




if($result->num_rows >= 0){

    $toSend = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($toSend, $row);
        }
    }

    echo json_encode(array('success' => true, 'message' => 'These is the chat data', 'messages' => $toSend));

}
else{
    echo json_encode(array('success' => false, 'message' => 'Error retrieving chat data'));
}


$conn->close();



