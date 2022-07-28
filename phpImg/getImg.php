<?php
if (count($_GET) > 3) {
  header('Content-Type: image/png');

  $width = $_GET['width'];
  $height = $_GET['height'];

  $bg_color = $_GET['bg_color'];
  $bg_color = hexrgb(substr($bg_color, 1, 6));
  $font_color = $_GET['font_color'];
  $font_color = hexrgb(substr($font_color, 1, 6));

  $capture = $_GET['capture'];

  $savePath = './data/my_first_php_img.png';
  $fontPath = __DIR__ . '/arial.ttf';

  $im = imagecreate($width, $height);
  imagecolorallocate($im, $bg_color['r'], $bg_color['g'], $bg_color['b']);
  $text_color = imagecolorallocate($im, $font_color['r'], $font_color['g'], $font_color['b']);
  // imagestring($im, $font, $width / 2 - 50, $height / 2 - 20, $capture, $text_color);
  imagettftext($im, 20, 0, $width / 2 - (strlen($capture) * 4), $height / 2 - 10, $text_color, $fontPath, $capture);
  // imagepng($im, $savePath);
  imagepng($im);
  imagedestroy($im);
}

function hexrgb($hexstr){
  $int = hexdec($hexstr);

  return [
    "r" => 0xFF & ($int >> 0x10),
    "g" => 0xFF & ($int >> 0x8),
    "b" => 0xFF & $int
  ];
}

?>