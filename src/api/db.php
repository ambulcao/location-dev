<?php

/*$DB = array(
  "host" => "localhost",
  "user" => "root",
  "password" => "",
  "database" => "devpriximbattfr",
  //"user" => "appcaixilharia",
  //"password" => "xchjO@36DG?e7aja",
  //"database" => "appcaixilharia",
);
//$database = new mysqli($DB['host'],$DB['user'],$DB['password'],$DB['database']);


try {
  $database = new PDO("mysql:host=localhost;dbname=devpriximbattfr", "root", " ");
  $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}*/


$host = "localhost";
$user = "root";
$pass = "";
$dbname = "devpriximbattfr";
$port = "3306";

//$conn = new PDO("mysql:host=$host;port=$port;dbname=". $dbname, $user, $pass);
try {
  $conn = new mysqli($host, $user, $pass, $dbname);
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  //$conn = new PDO("mysql:host=$host;port=$port;dbname=". $dbname, $user, $pass);
  //$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //echo "Conectado com sucesso";
} catch(PDOException $e) {
  echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}
