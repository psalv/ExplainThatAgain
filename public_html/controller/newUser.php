<?php


if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("HTTP/1.1 403 Forbidden");
    exit;
}


include_once("../../env.php");


$getPost = (array)json_decode(file_get_contents('php://input'));
$newUsername = $getPost['username'];
$newPassword = $getPost['password'];



$sql = "SELECT username FROM Users WHERE username = '" . $newUsername . "'";
$result = $conn->query($sql);
$result = $result->fetch_assoc();


if ($result === NULL) {

    $sql = "INSERT INTO Users (username, password) VALUES ('" . $newUsername . "', '" . $newPassword . "')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true, 'message' => 'User added'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error adding user'));
    }

} else {
    echo json_encode(array('success' => false, 'message' => 'This user already exists', 'user' => $newUsername));
}


$conn->close();
