<?php
$servername = "localhost";
$username = "b96087jw_test";
$password = "Nhbyflwfnm13";
$dbname = "b96087jw_test";

$mysqli = mysqli_connect($servername, $username, $password, $dbname);
$result = mysqli_query($mysqli, "SELECT * FROM users");

echo "<meta charset=\"UTF-8\">";

?>
<style>

  /* Inline таблица стилей #0 | http://b96087jw.beget.tech/show_users.php */

  td {
    border-bottom: 5px solid black;
  }

  th, td {
    padding-inline: 10px;
    border-bottom: 1px solid black;
  }

  th {
    padding-bottom: 8px;
  }

  td:not(:last-child) {
    border-right: 1px solid hsla(0, 0%, 0%, 0.1);
  }

  th, td {
    /* border-bottom: 1px solid black; */
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.26);
  }

  :root {
    font-family: sans-serif;
  }

  tr:not(:first-child):hover {
    background-color: #eee;
  }

  /* Элемент | http://b96087jw.beget.tech/show_users.php */

  body > table:nth-child(1) {
    border-collapse: collapse;
  }

</style>
<script>
  let pass = prompt('Введите пароль');
  if (pass != 'pass') location = 'http://b96087jw.beget.tech/testBeg.html';
</script>
<table>
  <tr>
    <th>ID</th>
    <th>Время создания</th>
    <th>Имя</th>
  </tr>
<?php

while ($row = $result->fetch_assoc()) {
  // echo "<br>id: " . $row["id"] . "<br>" . "Name: " . $row["first_name"] . ' ' . $row["last_name"] . "<br>" . "Created: " . $row["created"] . "<br>";

?>
  <tr>
    <td><?= $row["id"]; ?></td>
    <td><?= $row["created"]; ?></td>
    <td><?= $row["first_name"]; ?> <?= $row["last_name"]; ?></td>
  </tr>
<?php
}

echo "</table>";
