<?php
  require "./fls/custom.php";

  $servername = "localhost";
  $username = "b96087jw_test";
  $password = "Nhbyflwfnm13";
  $dbname = "b96087jw_test";

  $ip = $_SERVER['MMDB_ADDR'];
  if ($ip == '') $ip = $_SERVER['GEOIP_ADDR'];
  $city = $_SERVER['GEOIP_CITY'];
  $browserInfo = $_SERVER['HTTP_USER_AGENT'];

  $mysqli = mysqli_connect($servername, $username, $password, $dbname);
  $stmt = $mysqli->prepare("INSERT INTO logs (client_ip, client_city, client_browser_info) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $ip, $city, $browserInfo); 
  $res = $stmt->execute();

  // TODO: if ($res) {do some}
?>


<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="icon" href="img/favico.ico" type="image/x-icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/main.css">
  <title>htmlPower</title>
</head>

<body>
<div class="close"><span id="close" class=""></span></div>
<?php getHeader() ?>
<main class="main__body" style="margin: 100px 0 0 15px;">
  <p><h2>Привет, я главная страница.</h2> <br>Пока пустая, может когда-нибудь... <br>
  Пока же жми на <span class="menu">ссылки в шапке</span>, чтобы началось интересное.</p>
  <a href="memberForDanik.html">Запоминайка для ДАНИКА! (Остальным не трогать!=) )</a>
</main>
<div class="testing55"></div>
<footer>

</footer>
<script src="js/main.js"></script>
</body>
</html>