
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
$messageid = $getPost['messageid'];
$table = 'Chat_' . $getPost['sessionid'];

$sql = "DELETE FROM " . $table . " WHERE id = " . intval($messageid);
if($conn->query($sql)){
    echo json_encode(array('success' => true, 'message' => 'Message deleted'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error deleting message'));
}

$conn->close();