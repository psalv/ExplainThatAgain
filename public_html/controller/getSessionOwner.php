
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

$sql = "SELECT userOwner FROM Sessions WHERE sessionid = '" . $sessionID . "'";
$result = $conn->query($sql);
$result = $result->fetch_assoc();

if($result !== NULL){
    echo json_encode(array('success' => true, 'message' => 'Found owner', 'owner' => $result['userOwner']));
}
else{
    echo json_encode(array('success' => false, 'message' => 'Session not found'));
}

$conn->close();
