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
$interval = $getPost['interval'];
$table = "Graph_" . $sessionID;


$sql = "SELECT MAX(id) as id FROM " . $table;
$result = $conn->query($sql);


if($result->num_rows >= 0){

    $result = $result->fetch_assoc();
    $sql = "SELECT xaxis FROM " . $table . " WHERE id=" . $result['id'];
    $result = $conn->query($sql);

    if($result){
        $result = $result->fetch_assoc();
        $sql = "INSERT INTO " . $table . " (xaxis) VALUES ('" . (intval($result['xaxis']) + intval($interval)) . "')";
    }
    else{
        $sql = "INSERT INTO " . $table . " (xaxis) VALUES ('0')";
    }


    if($conn->query($sql) === TRUE){
        echo json_encode(array('success' => true, 'message' => 'Inserted new data point'));
    }
    else{
        echo json_encode(array('success' => false, 'message' => 'Could not insert new data point'));
    }

}
else{
    echo json_encode(array('success' => false, 'message' => 'Error adding graph point'));
}


$conn->close();



