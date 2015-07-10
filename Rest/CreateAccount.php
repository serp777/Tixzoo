<?php
header("Content-Type: application/json", true);
//print_r($_POST);
$host="localhost"; // Host name 
$username="root"; // Mysql username 
$password="computer123"; // Mysql password 
$db_name="tixzoo"; // Database name 
$tbl_name="accountinfo"; // Table name 
// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");

$myusername=$_POST['username']; 
$mypassword=$_POST['password']; 
$myemail=$_POST['email'];

$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myemail = stripslashes($myemail);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);
$myemail = mysql_real_escape_string($myemail);

$sql="INSERT INTO $tbl_name (username, password, emailAddress, credit)
VALUES ('$myusername','$mypassword','$myemail','1000')";
$result=mysql_query($sql);
// Mysql_num_row is counting table row
echo $result;
?>