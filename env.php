<?php


// Sample google slides url
// https://docs.google.com/presentation/d/1buZt78RanzGTz9WTuiPJS7h0O6s7S1LE_F356JTgN08/pub?start=false&loop=false&delayms=3000


// TODO: put into an environment variable
putenv("MYSQL_PASSWORD=afkfH8234-jk32891fsdj91j");


//require '../../vendor/autoload.php';


$servername = "localhost";
$username = "root";
$password = getenv("MYSQL_PASSWORD");
$dbname = "ExplainThatAgainDB";


