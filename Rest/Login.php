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

// username and password sent from form 
$myusername=$_POST['username']; 
$mypassword=$_POST['password']; 
// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);
$sql="SELECT * FROM $tbl_name WHERE username='$myusername' and password='$mypassword'";
$result=mysql_query($sql);
// Mysql_num_row is counting table row
$count=mysql_num_rows($result);

// If result matched $myusername and $mypassword, table row must be 1 row
if($count==1){
echo "true";
// Register $myusername, $mypassword and redirect to file "login_success.php"

} else {
echo "false";
}
?>