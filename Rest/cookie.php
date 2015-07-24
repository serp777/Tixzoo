<?php
header("Content-Type: application/json", true);
error_log(print_r(json_decode($_COOKIE['user']),1));
echo $_COOKIE['user'];
?>