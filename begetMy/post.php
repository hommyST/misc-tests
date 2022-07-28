<?php
$get = [
  'get1' => 22,
  'get2' => 10
];
$post = [
  'post' => 10,
  'post2' => 11,
  'post3' => 22
];
if (count($_POST) > 0) {
  echo json_encode($post);
}
if (count($_GET) > 0) {
  echo json_encode($get);
}