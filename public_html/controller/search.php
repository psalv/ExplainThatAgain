<?php



if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("HTTP/1.1 403 Forbidden");
    exit;
}


include_once("../../env.php");


$getPost = (array)json_decode(file_get_contents('php://input'));
$searchParam = $getPost['searchString'];

//$sql = "SELECT username FROM Users LIKE username = '" . $searchParam . "' LIMIT 10";
$sql = "SELECT username FROM Users LIKE username = '" . $searchParam . "'";
$result = $conn->query($sql);

echo json_encode(array('success' => true, 'message' => 'Returning search results', 'res' => $result));

///$result = $result->fetch_assoc();


$conn->close();
