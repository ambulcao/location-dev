<?php

$DB = array(
  "host" => "localhost",
  "user" => "root",
  "password" => "root",
  "database" => "devpriximbattfr",
  //"user" => "appcaixilharia",
  //"password" => "xchjO@36DG?e7aja",
  //"database" => "appcaixilharia",
);
//$database = new mysqli($DB['host'],$DB['user'],$DB['password'],$DB['database']);


try {
  $database = new PDO("mysql:host=localhost;dbname=seu_banco_de_dados", "seu_usuario", "sua_senha");
  $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}