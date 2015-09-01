<?php
require_once 'authController.php';
class userControllerClass {
	private function setupConnection(){
		$con = new authControllerClass();
		return $con->getConnection();
	}
	private function executeSqlQuery($sql,$dbconn){
		$result = $dbconn->query($sql);
		return $result;
	}
	public function login($username,$password)
	{
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->setupConnection();
		$username = stripslashes($username);
		$password = stripslashes($password);
		$username = mysqli_real_escape_string($dbconn, $username);
		$password = mysqli_real_escape_string($dbconn, $password);
		$sql="SELECT * FROM accountinfo WHERE username='$username' and password='$password'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$count = $result->num_rows;
		return $count;
	}
	public function addNewsletterEmail($email)
	{
		$dbconn = $this->setupConnection();
		$myemail = stripslashes($email);
		$myemail = mysqli_real_escape_string($dbconn, $myemail);		
		$sql="INSERT INTO newsletterlist (emailAddress) VALUES ('$myemail')";
		$result = $this->executeSqlQuery($sql,$dbconn);
		return $result;
	}
	public function createAccount($username,$password,$email){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->setupConnection();
		$myusername = stripslashes($username);
		$mypassword = stripslashes($password);
		$myemail = stripslashes($email);
		$myusername = mysqli_real_escape_string($dbconn, $myusername);
		$mypassword = mysqli_real_escape_string($dbconn, $mypassword);
		$myemail = mysqli_real_escape_string($dbconn, $myemail);
		$sql="SELECT * FROM accountinfo WHERE username='$myusername'";
		$usrnameTest = $this->executeSqlQuery($sql,$dbconn);
		$usrnameTest = $usrnameTest->num_rows;
		$sql="SELECT * FROM accountinfo WHERE username='$myemail'";
		$emlTest = $this->executeSqlQuery($sql,$dbconn);
		$emlTest = $emlTest->num_rows;
		if($usrnameTest > 0 && $emlTest > 0){
			$result["dataError"] = "email and username in use";
			return $result; 
		} elseif($usrnameTest > 0 && $emlTest == 0){
			$result["dataError"] = "username in use";
			return $result;  
		} elseif($emlTest > 0 && $usrnameTest == 0){
			$result["dataError"] = "email in use";
			return $result;  
		}
		$sql="INSERT INTO accountinfo (username, password, emailAddress, credit) VALUES ('$myusername','$mypassword','$myemail','1000')";
		$result = $this->executeSqlQuery($sql,$dbconn);
		return $result;
	}
	public function getUserInfo($username, $password) {
		$result = $this->login($username, $password);
		$row = mysqli_fetch_assoc($result);
		$result = json_encode($row);
		return $result;
	}
	public function deleteCookie(){
		ob_start();
		unset($_COOKIE['user']);
		ob_end_flush();
	}
}