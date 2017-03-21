<?php


if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("HTTP/1.1 403 Forbidden");
    exit;
}


include_once("../../env.php");


$getPost = (array)json_decode(file_get_contents('php://input'));
$inputUsername = $getPost['username'];
$inputPassword = $getPost['password'];


$sql = "SELECT * FROM Users WHERE username = '" . $inputUsername . "'";
$result = $conn->query($sql);
$result = $result->fetch_assoc();


if ($result !== NULL) {

    if ($result['password'] === $inputPassword) {
        echo json_encode(array('success' => true, 'message' => 'Successful sign in'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Incorrect password'));
    }

} else {
    echo json_encode(array('success' => false, 'message' => 'User does not exist', 'user' => $inputUsername));
}


$conn->close();
