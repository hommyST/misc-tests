<style>
  body {
    background-color: hsl(0, 0%, 95.1%);
  }
</style>
<?php
// $currDay = date('D'); //Текущий день недели - Mon, Tue, Wen...

// if  (isWeekend()) {
//   echo "Выходные \n";
// } else {
//   echo "Не выходные \n";
// }

/**
 * Если сегодня выходной день (сб/вс), вернёт true
 * @return bool
 */
function isWeekend()
{
  $currentDay = date('D');
  return $currentDay === 'Sun' || $currentDay === 'Sat';
}


// $someBool = !isWeekend();
// var_dump(isWeekend());

/////////////////////////////
$host = "localhost";
$port = 3306;
$socket = "";
$user = "root";
$password = "123";
$dbname = "testbd";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
  or die('Could not connect to the database server' . mysqli_connect_error());

//$con->close();

$query = "SELECT * FROM testbd.users";
$stmt = mysqli_query($con, $query);
echo "<pre>";
if ($stmt) {
  while ($row = $stmt->fetch_assoc()) {
    var_dump($row);
  }
  $stmt->close();
}
