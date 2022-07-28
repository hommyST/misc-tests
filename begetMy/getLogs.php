<?php
$servername = "localhost";
$username = "b96087jw_test";
$password = "Nhbyflwfnm13";
$dbname = "b96087jw_test";

$ip = $_SERVER['MMDB_ADDR'] || $_SERVER['GEOIP_ADDR'] || '';
$city = $_SERVER['GEOIP_CITY'] || '';
$browserInfo = $_SERVER['HTTP_USER_AGENT'] || '';

$mysqli = mysqli_connect($servername, $username, $password, $dbname);
$stmt = $mysqli->prepare("INSERT INTO logs (client_ip, client_city, client_browser_info) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $ip, $city, $browserInfo); 
$res = $stmt->execute();

// TODO: if ($res) {do some}
// print_r($_SERVER);
// var_dump($_SERVER);

