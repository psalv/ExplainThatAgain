<?php

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("HTTP/1.1 403 Forbidden");
    exit;
}

include_once("env.php");



// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS " . $dbname;
if ($conn->query($sql) !== TRUE) {
    echo "Error creating database: " . $conn->error;
}

$conn = new mysqli($servername, $username, $password, $dbname);

// Create table
$sql = "CREATE TABLE IF NOT EXISTS Users (
    username VARCHAR(30) NOT NULL UNIQUE PRIMARY KEY,
    password VARCHAR(30) NOT NULL
)";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}

// Create table
$sql = "CREATE TABLE IF NOT EXISTS Courses (
    coursename VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
    userOwner VARCHAR(30) NOT NULL
)";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}

// Create table
$sql = "CREATE TABLE IF NOT EXISTS Sessions (
    sessionname VARCHAR(50) NOT NULL,
    sessionid INT(10) NOT NULL UNIQUE PRIMARY KEY,
    live INT(1) NOT NULL,
    courseOwner VARCHAR(50) NOT NULL
)";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}



//$addItem = $conn->prepare("INSERT INTO Ingredients (item, quantity) VALUES (?, ?)");
//$addItem->bind_param("si", $item, $quantity);
//
//$updateItem = $conn->prepare("UPDATE Ingredients SET quantity = ? WHERE item = ?");
//$updateItem->bind_param("is", $quantity, $item);
//
//$deleteItem = $conn->prepare("DELETE FROM Ingredients WHERE item = ?");
//$deleteItem->bind_param("s", $item);

// To add a new item: have $item and $quantity set and call $addItem->execute();
// To update an item: have $item and $quantity set and call $updateItem->execute();
// To delete an item: have $item set and call $deleteItem->execute();





/*

// Retrieving everything in the Ingredients table:
$sql = "SELECT * FROM Ingredients";

// Specification for a specific row:
//$sql = "SELECT * FROM Ingredients where item='mangoes'";


$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"] . " - Item: " . $row["item"]. " " . $row["quantity"] . "<br>";
    }
} else {
    echo "0 results";
}

*/
