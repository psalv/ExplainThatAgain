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
$newCourse = $getPost['courseName'];
$owner = $getPost['owner'];


$sql = "SELECT coursename FROM Courses WHERE userOwner = '" . $owner . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if($row == $newCourse){
            echo json_encode(array('success' => false, 'message' => 'Course already exists', 'Exists' => 1));
        };
    }

    $sql = "INSERT INTO Courses (coursename, userOwner) VALUES ('" . $newCourse . "', '" . $owner . "')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true, 'message' => 'Course created'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error creating course', 'Exists' => 0));
    }

} else{
    echo json_encode(array('success' => false, 'message' => 'Trouble creating course', 'Exists' => -1));
}



$conn->close();
