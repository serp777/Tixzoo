<?php
class userControllerClass {
	private function establishConnection(){
		$host="localhost"; // Host name 
		$username="root"; // Mysql username 
		$password="computer123"; // Mysql password 
		$db_name="tixzoo"; // Database name 
		// Connect to server and select databse.
		$dbconn = mysqli_connect($host,$username,$password,$db_name) or die("Error " . mysqli_error($dbconn));
		return $dbconn;
	}
	public function executeSqlQuery($sql,$dbconn){
		$result= $dbconn->query($sql);
		return $result;
	}
	public function login($username,$password){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->establishConnection();
		$username = stripslashes($username);
		$password = stripslashes($password);
		$username = mysql_escape_string($username);
		$password = mysql_escape_string($password);
		$sql="SELECT * FROM accountinfo WHERE username='$username' and password='$password'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$count = $result->num_rows;
		echo $count;
		return $count;
		
	}
	public function createAccount($username,$password,$email){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->establishConnection();
		$myusername = stripslashes($username);
		$mypassword = stripslashes($password);
		$myemail = stripslashes($email);
		$myusername = mysql_escape_string($myusername);
		$mypassword = mysql_escape_string($mypassword);
		$myemail = mysql_escape_string($myemail);
		$sql="INSERT INTO accountinfo (username, password, emailAddress, credit) VALUES ('$myusername','$mypassword','$myemail','1000')";
		echo $sql;
		$result = $this->executeSqlQuery($sql,$dbconn);

		return $result;
	}
}
?>





