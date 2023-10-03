<?php

include_once 'conexao.php';

$query_battant = "SELECT id, nome, nota FROM sp_notas_externas ORDER BY id DESC";
$result_produtos = $conn->prepare($query_battant);
$result_produtos->execute();

if(($result_produtos) AND ($result_produtos->rowCount() != 0)) {
  while($row_produto = $result_produtos->fetch(PDO::FETCH_ASSOC)){
    echo json_encode($row_produto);
  }
}