
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
$courseID = $getPost['courseid'];

$sql = "DELETE FROM Courses WHERE id = " . intval($courseID);
if($conn->query($sql)){
    echo json_encode(array('success' => true, 'message' => 'Course deleted'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error deleting Course'));
}

$conn->close();