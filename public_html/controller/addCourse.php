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


$sql = "SELECT coursename FROM Courses WHERE userOwner = '" . $owner . "' AND coursename = '" . $newCourse . "'";
$result = $conn->query($sql);



// Check if the course already exists for this user
if ($result->num_rows >= 0) {

    if($result->num_rows > 0){
        echo json_encode(array('success' => false, 'message' => 'Course already exists', 'Exists' => 1));
        $conn->close();
        return;
    }


    // Insert the data into the sql table
    $sql = "INSERT INTO Courses (coursename, userOwner) VALUES ('" . $newCourse . "', '" . $owner . "')";
    if ($conn->query($sql) === TRUE) {

        // Get the id assigned to the new course, to be used in the li tag for reference
        $sql = "SELECT id FROM Courses WHERE userOwner = '" . $owner . "' AND coursename = '" . $newCourse . "'";
        $result = $conn->query($sql);
        $result = $result->fetch_assoc();
        echo json_encode(array('success' => true, 'message' => 'Course created', 'id' => $result));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error creating course', 'Exists' => 0));
    }

} else{
    echo json_encode(array('success' => false, 'message' => 'Trouble creating course', 'Exists' => -1));
}



$conn->close();
