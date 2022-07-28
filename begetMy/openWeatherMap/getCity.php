<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$file = file_get_contents('./city.list.json');
echo $file;