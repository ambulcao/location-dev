<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");

require_once("db.php");

$depUser = 1;

$result = "SELECT * FROM coordenadas INNER JOIN utilizadores ON utilizadores.departamento = coordenadas.departamento WHERE utilizadores.id = $depUser";
$result_departamento = $conn->query($result);

if ($result_departamento) {
    $lista_departamentos = array(); // Inicializa um array para armazenar os resultados

    while ($row_departamento = $result_departamento->fetch(PDO::FETCH_ASSOC)) {
        $lista_departamentos["records"][] = $row_departamento;
    }

    http_response_code(200);

    echo json_encode($lista_departamentos);
} else {
    echo "Erro na consulta: " . $errorInfo[2];
}
?>
