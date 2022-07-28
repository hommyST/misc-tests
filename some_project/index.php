<?php
$foo = 2;
$alphabit = [" ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",];
$bar = [];
$randWord = "";
foreach($alphabit as $letter) {
  $tmp = [];
  for ($i=0; $i < 10; $i++) { 
    $tmp[$i] = $alphabit[array_rand($alphabit)];
  }
  $ra = $alphabit[rand(0,25)] ;
  $randWord .= $ra;
  array_push($bar, $tmp);
  if (in_array($ra, ["a", "x", "b", "h"])) {
    $randWord .= " ";
  }
}

echo $randWord;
