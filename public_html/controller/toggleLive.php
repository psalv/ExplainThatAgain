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
$sessionid = $getPost['sessionid'];


$sql = "SELECT live FROM Sessions WHERE sessionid = '" . $sessionid . "'";
$result = $conn->query($sql);
$result = $result->fetch_assoc();

if($result !== NULL){
    $toggle = $result === 1 ? 0 : 1;
    $sql = "UPDATE Sessions SET live=" . $toggle . " WHERE id=" . $sessionid;

    if($conn->query($sql) === TRUE){
        echo json_encode(array('success' => true, 'message' => 'Session toggled', 'live', $toggle));
    }
    else{
        echo json_encode(array('success' => false, 'message' => 'Error togglingtoggled'));
    }
}
else {
    echo json_encode(array('success' => false, 'message' => 'Error finding session'));
}

$conn->close();