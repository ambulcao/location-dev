<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

   require_once("db.php");

  //$depUser = $_GET['depUser'];
  $depUser = 1;

   //$result = $database->query("SELECT * FROM teste_coordenadas inner join utilizadores on utilizadores.departamento = teste_coordenadas.departamento where utilizadores.id = $depUser");
   $result = ("SELECT * FROM teste_coordenadas inner join utilizadores on utilizadores.departamento = teste_coordenadas.departamento where utilizadores.id = $depUser");
   $result_departamento = $database->prepare($result);
   $result_departamento->execute();

   if(($result_departamento) AND ($result_departamento->rowCount() != 0)){
      while($row_departamento = $result_departamento->fetch(PDO::FETCH_ASSOC)){
         var_dump($row_departamento);
      }
   }
    
    /*while($row = mysqli_fetch_assoc($result)) {
       $data[] = $row; 
    }
    echo json_encode($data);*/
 ?>