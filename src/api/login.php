<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
require_once("db.php");

$result = $conn->query("SELECT username, password FROM `utilizadores`");
if ($result) {
    $users = $result->fetchAll(PDO::FETCH_ASSOC);

    // Preparar um array para armazenar os dados desejados
    $userData = [];
    foreach ($users as $user) {
        $userData[] = [
            'username' => $user['username'],
            'password' => $user['password'],
        ];
    }

    // Converter o array para JSON
    $jsonResult = json_encode($userData);

    echo $jsonResult;
} else {
    echo json_encode(["error" => "Erro na consulta SQL"]);
}
?>
