<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type"); 
require_once("db.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'));

  error_log("Received username: " . $data->username);
  error_log("Received password: " . $data->password);
  print_r($data->username);
  print_r($data->password);

  if (isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

    $result = $conn->prepare("SELECT username, password FROM `utilizadores` WHERE username = :username"); 
    $result->bindParam(':username', $username);
    $result->execute();
    $user = $result->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
      $response = ["success" => true, "message" => "Login bem-sucedido"];

      // Você pode adicionar um redirecionamento aqui
      //header("Location: routes.tsx");
    } else {
      $response = ["success" => false, "message" => "Credenciais inválidas"];
    }
  } else {
    $response = ["success" => false, "message" => "Credenciais não fornecidas"];
  }
} else {
  $response = ["success" => false, "message" => "Método de solicitação inválido"];
}

header("Content-Type: application/json");
echo json_encode($response);
?>
