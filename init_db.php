<?php


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


// Create Users table
$sql = "CREATE TABLE IF NOT EXISTS Users (
    username VARCHAR(30) NOT NULL UNIQUE PRIMARY KEY,
    password VARCHAR(30) NOT NULL
)";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}


// Create Courses table
$sql = "CREATE TABLE IF NOT EXISTS Courses (
    id INT(6) UNSIGNED UNIQUE AUTO_INCREMENT,
    coursename VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
    userOwner VARCHAR(30) NOT NULL
)";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}


// Create Sessions table
$sql = "CREATE TABLE IF NOT EXISTS Sessions (
    sessionname VARCHAR(50) NOT NULL,
    sessionid INT(10) NOT NULL UNIQUE PRIMARY KEY,
    live INT(1) NOT NULL,
    courseOwner VARCHAR(50) NOT NULL
)";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}


$conn->close();