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
$sessionName = $getPost['sessionName'];
$owner = $getPost['courseid'];






$sql = "SELECT sessionname FROM Sessions WHERE courseOwner = '" . $owner . "'";
$result = $conn->query($sql);


// Check if the course already exists for this user
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        // If so return a failure, a user must have unique courses.
        if($row == $sessionName){
            echo json_encode(array('success' => false, 'message' => 'Session already exists', 'Exists' => 1));
        };
    }

    // Insert the data into the sql table
    $sql = "INSERT INTO Sessions (sessionname, courseOwner) VALUES ('" . $sessionName . "', '" . $owner . "')";
    if ($conn->query($sql) === TRUE) {

        // Get the id assigned to the new course, to be used in the li tag for reference
        $sql = "SELECT sessionid FROM Sessions WHERE courseOwner = '" . $owner . "' AND sessionname = '" . $sessionName . "'";
        $result = $conn->query($sql);
        $result = $result->fetch_assoc();
        echo json_encode(array('success' => true, 'message' => 'Session created', 'id' => $result));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error creating session', 'Exists' => 0));
    }

} else{
    echo json_encode(array('success' => false, 'message' => 'Trouble creating session', 'Exists' => -1));
}



$conn->close();

