
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
$sessionID = $getPost['sessionid'];


$sql = "DELETE FROM Sessions WHERE sessionid = " . intval($sessionID);
if($conn->query($sql)){
    $sql = "DROP TABLE Graph_" . intval($sessionID);
    if($conn->query($sql)) {
        $sql = "DROP TABLE Chat_" . intval($sessionID);
        if($conn->query($sql)) {
            echo json_encode(array('success' => true, 'message' => 'Everything deleted - sessions'));

        } else{
            echo json_encode(array('success' => true, 'message' => 'Chat not deleted'));
        }
    } else{
        echo json_encode(array('success' => true, 'message' => 'Graph and chat not deleted'));

    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Error deleting session'));
}


$conn->close();

