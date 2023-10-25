<?php

$DB = array(
  "host" => "localhost",
  "user" => "root",
  "password" => "",
  "database" => "devpriximbattfr",
  //"user" => "appcaixilharia",
  //"password" => "xchjO@36DG?e7aja",
  //"database" => "appcaixilharia",
);
$database = new mysqli($DB['host'],$DB['user'],$DB['password'],$DB['database']);