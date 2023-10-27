<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
require_once("db.php");

if (isset($_POST["username"]) && isset($_POST["password"])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $result = $database->query("SELECT * FROM utilizadores where username='$username' and `password`='$password'");

  if ($result->num_rows > 0) {
    //$response = ["success" => true, "message" => "Login bem-sucedido"];
    $response = ["success" => true, "message" => "Login bem-sucedido", "username" => $username, "token" => "seu_token"];

  } else {
    $response = ["success" => false, "message" => "Credenciais inválidas"];
  }

  header("Content-Type: application/json");
  echo json_encode($response);
}
?>
