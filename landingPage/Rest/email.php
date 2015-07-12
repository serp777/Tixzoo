<?php
header("Content-Type: application/json", true);

$connect = mysql_connect("ptamain.db.8575272.hostedresource.com", "ptamain", "C1o2m3p4u5t6e7") or
die ("check your server connection.");
$tbl_name = "tixzooEmail";
mysql_select_db("ptamain");
$myemail=$_POST['email'];
$myemail = stripslashes($myemail);
$myemail = mysql_real_escape_string($myemail);
$sql="INSERT INTO $tbl_name (email)
VALUES ('$myemail')";
$result=mysql_query($sql);
// Mysql_num_row is counting table row
echo $result;

?>