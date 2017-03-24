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
$userOwner = $getPost['owner'];
$slideLink = $getPost['slideLink'];






$sql = "SELECT sessionname FROM Sessions WHERE courseOwner = '" . $owner . "' AND sessionname = '" . $sessionName ."'";
$result = $conn->query($sql);



// Check if the course already exists for this user
if ($result->num_rows >= 0) {
    if($result->num_rows > 0){
        echo json_encode(array('success' => false, 'message' => 'Session already exists', 'Exists' => 1));
        $conn->close();
        return;
    }


    // Insert the data into the sql table
    $sql = "INSERT INTO Sessions (sessionname, courseOwner, userOwner, slideLink) VALUES ('" . $sessionName . "', '" . $owner . "', '" . $userOwner . "', '" . $slideLink . "')";


    if ($conn->query($sql) === TRUE) {

        // Get the id assigned to the new course, to be used in the li tag for reference
        $sql = "SELECT sessionid FROM Sessions WHERE courseOwner = '" . $owner . "' AND sessionname = '" . $sessionName . "'";
        $result = $conn->query($sql);
        $result = $result->fetch_assoc();

        $sql = "CREATE TABLE IF NOT EXISTS Graph_" . $result['sessionid'] . " (
                id INT(8) UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
                confusion INT(6) UNSIGNED NOT NULL DEFAULT 0,
                xaxis INT(6) UNSIGNED NOT NULL
                )";

        if ($conn->query($sql) !== TRUE) {
            echo "Error creating table: " . $conn->error;
            echo json_encode(array('success' => false, 'message' => "Error graph creating table: " . $conn->error, 's' => $sql));
        }
        else{

            $sql = "SELECT sessionid FROM Sessions WHERE courseOwner = '" . $owner . "' AND sessionname = '" . $sessionName . "'";
            $result = $conn->query($sql);
            $result = $result->fetch_assoc();

            $sql = "CREATE TABLE IF NOT EXISTS Chat_" . $result['sessionid'] . " (
                id INT(8) UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                message VARCHAR(600) NOT NULL
                )";

            if ($conn->query($sql) !== TRUE) {
                echo "Error creating table: " . $conn->error;
                echo json_encode(array('success' => false, 'message' => "Error creating chat table: " . $conn->error, 's' => $sql));
            }
            else {
                echo json_encode(array('success' => true, 'message' => 'Session created', 'id' => $result));
            }
        }

    } else {
        echo json_encode(array('success' => false, 'message' => 'Error creating session', 'Exists' => 0));
    }

} else{
    echo json_encode(array('success' => false, 'message' => 'Trouble creating session', 'Exists' => -1));
}


$conn->close();

