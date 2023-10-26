<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
require_once("db.php");

  $query_user = "SELECT * FROM utilizadores";
  $result_user = $conn->query($query_user);

  if($result_user) {
    $lista_user = array();

    while ($row_user = $result_user->fetch(PDO::FETCH_ASSOC)){
      $lista_user["records"][] = $row_user;
    }

    http_response_code(200);

    echo json_encode(mb_convert_encoding($lista_user, 'UTF-8','ISO-8859-1'));

  } else {
    echo "Erro na consulta: " , $errorInfo[2];
  }

?>
  