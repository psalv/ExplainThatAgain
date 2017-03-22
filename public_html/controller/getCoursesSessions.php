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
$owner = $getPost['owner'];

$sql = "SELECT coursename, id FROM Courses WHERE userOwner = '" . $owner . "'";
$result = $conn->query($sql);

$toSend1 = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($toSend1, $row);
    }
}

$sql = "SELECT sessionname, sessionid, courseOwner FROM Sessions WHERE userOwner = '" . $owner . "'";
$result = $conn->query($sql);

$toSend2 = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($toSend2, $row);
    }
}

echo json_encode(array('success' => true, 'message' => 'Fetched courses and sessions', 'courses' => $toSend1, 'sessions' => $toSend2));

$conn->close();
