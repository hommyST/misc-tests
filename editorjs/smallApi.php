<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$data = [
  "time" => 1653987602835,
  "blocks" => [
    [
      "id" => "eVtRw63a2B",
      "type" => "SimpleImage",
      "data" => [
        "url" => "тест компонента"
      ]
    ],
    [
      "id" => "ceeAd_2ifS",
      "type" => "paragraph",
      "data" => [
        "text" => "параграф"
      ]
    ]
  ],
  "version" => "2.24.3"
];

echo json_encode($data);