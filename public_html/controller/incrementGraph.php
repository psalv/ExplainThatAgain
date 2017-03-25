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
$table = "Graph_" . $sessionID;


$sql = "SELECT MAX(id) as id FROM " . $table;
$result = $conn->query($sql);
$result = $result->fetch_assoc();


if($result !== NULL){
    $id = $result['id'];

    $sql = "SELECT confusion FROM " . $table . " WHERE id=" . $id;
    $result = $conn->query($sql);
    $result = $result->fetch_assoc();

    $sql = "UPDATE " . $table . " SET confusion=" . (intval($result['confusion']) + 1) . " WHERE id=" . $id;
    if($conn->query($sql) === TRUE){
        echo json_encode(array('success' => true, 'message' => 'You are confused'));
    }
    else{
        echo json_encode(array('success' => false, 'message' => 'Could not increment confusion'));
    }

}
else{
    echo json_encode(array('success' => false, 'message' => 'Could not find any graph points'));
}


$conn->close();



