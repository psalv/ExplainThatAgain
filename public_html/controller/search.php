<?php



if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("HTTP/1.1 403 Forbidden");
    exit;
}


include_once("../../env.php");


$getPost = (array)json_decode(file_get_contents('php://input'));
$searchParam = $getPost['searchString'];


$sql = "SELECT username FROM Users WHERE username LIKE  '%" . $searchParam . "%' LIMIT 6";
$result = $conn->query($sql);


$toSend = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($toSend, $row);
    }
}

echo json_encode(array('success' => true, 'message' => 'Returning search results', 'res' => $toSend));


$conn->close();
