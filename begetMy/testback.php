<?
$servername = "localhost";
$username = "b96087jw_test";
$password = "Nhbyflwfnm13";
$dbname = "b96087jw_test";

$fName = $_GET["first_name"];
$lName = $_GET["last_name"];

$mysqli = mysqli_connect($servername, $username, $password, $dbname);

// $result = mysqli_query($mysqli, "INSERT INTO users (first_name, last_name) VALUES $fname, $lname");
$stmt = $mysqli->prepare("INSERT INTO users (first_name, last_name) VALUES (?, ?)");

/* Prepared statement, stage 2: bind and execute */
$stmt->bind_param("ss", $fName, $lName); // "is" means that $id is bound as an integer and $label as a string

$res = $stmt->execute();
// $result = mysqli_query($mysqli, "SELECT * FROM users");

// var_dump($res);
header('Location: ' . $_SERVER['HTTP_REFERER']);