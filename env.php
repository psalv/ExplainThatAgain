<?php


// Sample google slides url
// https://docs.google.com/presentation/d/1buZt78RanzGTz9WTuiPJS7h0O6s7S1LE_F356JTgN08/pub?start=false&loop=false&delayms=3000


// CLEARDB_DATABASE_URL => mysql://[username]:[password]@[host]/[database name]?reconnect=true
// mysql://b1674b7932b689:375ff28a@us-cdbr-iron-east-03.cleardb.net/heroku_bff9b80c3cf2dfa?reconnect=true


// TODO: put into an environment variable
putenv("MYSQL_PASSWORD=afkfH8234-jk32891fsdj91j");


//require '../../vendor/autoload.php';


$servername = "localhost";
$username = "root";
$password = getenv("MYSQL_PASSWORD");
$dbname = "ExplainThatAgainDB";


