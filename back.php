<?php
if(isset($_GET)){
    $js_obj = json_encode($_GET);
    echo $js_obj;
}
else{
    echo 0;
}