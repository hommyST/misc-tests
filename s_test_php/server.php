<?php
$socket = socket_create_listen(8111);
$errN = socket_last_error();
$err = socket_strerror($errN);
var_dump($socket);
var_dump($err);