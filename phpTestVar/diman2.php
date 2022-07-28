<?php

// $allDisplayCid = [
//   'Okna-VLG',
//   'Medicaland',
//   'Diler_Uvelir',
//   'Abrau_Durso',
//   12
// ];

// var_dump($allDisplayCid);

// die;
// $array = array(
//   "foo" => "bar",
//   "bar" => "foo",
// );

// array_unshift($array, "apple", "raspberry");

// $filteredArray = array_filter($array, function ($v, $k) {
//   if (strpos($v, 'r') !== false) {
//     return false;
//   }
//   return true;
// }, ARRAY_FILTER_USE_BOTH);


// echo '<pre>';
// print_r($filteredArray);



// die;
$db = new PDO(
  'mysql:host=127.0.0.1:3306;
  dbname=tests',
  'root',
  '1234'
);
$stmt = $db->query("SELECT * FROM test.users");
$foo = $stmt->fetchAll();

echo '<pre>';
print_r($foo);

var_dump($foo);

$stmt = $db->query(
  "SELECT 
    agent,
    COUNT(duration) Count,
    SUM(duration) sumDuration,
    queue,
    displaycid
    FROM
        call_log
            LEFT JOIN
        queue_table ON queue = name
    WHERE
        agent IS NOT NULL
    GROUP BY agent , queue;"
);
// $stmt = $db->query(
//   "SELECT 
//   agent, 
//   COUNT(duration) Count, 
//   SUM(duration) sumDuration, 
//   queue ,
//    displaycid 
//    FROM call_log INNER JOIN queue_table 
//    WHERE agent IS NOT NULL GROUP BY agent , 
//   queue , 
//   queue = name;
// "
// );

$foo = $stmt->fetchAll();
var_dump($foo);

// echo '<pre>';
// print_r($tmpArr);


die;


















echo 'LENGTH: ' . count($foo) . '<br>';
$ag = substr($foo[51]['agent'], 4, 4);
var_dump($ag);
echo "$ag - {$foo[8]['queue']}";
die;

foreach ($foo as $key => $value) {
  echo "$key: $value[agent]";
  die;
}

$resultArr = [];
while ($row = $stmt->fetch()) {
  $tmpArr = [
    'agent' => $row[0],
    'strCount' => $row[1],
    'sumDuration' => $row[2],
    'queue' => $row[3],
  ];
  array_push($resultArr, $tmpArr);
}

var_dump($foob);
