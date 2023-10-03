<?php

$host = "localhost";
$user = "devpriximbattfr";
$pass = "V9kEV3vHp9n4";
$dbname = "devpriximbattfr";

$conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);

if($conn) {
  echo 'Connected to database';
} else {
  echo 'Not connected!';
}