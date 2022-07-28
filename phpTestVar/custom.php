<?php
$_MY_VAR = [
  'dbHost' => 'localhost',
  'dbLogin' => 'root',
  'dbPassword' => '1234',
];

function dd(...$variables) {
  echo '<pre>';
  var_dump($variables);
  echo '</pre>';
  die;
}

$mysqli = mysqli_connect($_MY_VAR['dbHost'], $_MY_VAR['dbLogin'], $_MY_VAR['dbPassword'], 'tests');

$result = $mysqli->query('SELECT * FROM user');

// while ($row = $result->fetch_assoc()) {
//   echo $row['name'] . '<br>';
// }

// dd($result);

