<?php

// Sample google slides url
// https://docs.google.com/presentation/d/1buZt78RanzGTz9WTuiPJS7h0O6s7S1LE_F356JTgN08/pub?start=false&loop=false&delayms=3000

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$servername = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$dbname = substr($url["path"], 1);


