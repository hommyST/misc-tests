<?php
if ($argc == 2 && $argv[1] == '-h') {
  exit("Usage: php $argv[0] \n [-h]\t\t\tshow help \n [-d arrayKey]\t\tdelete element from array \n [elName]\t\tadd new el to array \n [keyName elName]\tadd key:element to array \n [-l]\t\t\tshow array length \n");
}

$str = file_get_contents('./data.json');
$array = json_decode($str, true);

if ($argc == 2 && $argv[1] == '-l') {
  exit("Array length: " . count($array) . " el.\n");
}


if ($argc == 2 && $argv[1] != '-d') {
  $array[count($array)] = $argv[1];
} else if ($argc == 3 && $argv[1] != '-d') {
  $array[$argv[1]] = $argv[2];
}

if ($argc == 3 && $argv[1] == '-d' && array_key_exists($argv[2], $array)) {
  unset($array[$argv[2]]);
}

// print_r($argv);
$res = file_put_contents('./data.json', json_encode($array));
echo 'File character length: ' . $res . "\n";

?>