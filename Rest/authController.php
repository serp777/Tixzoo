<?php
class authControllerClass {
	private function establishSqlConnection(){
		$host="tixzoo.db.4445716.hostedresource.com"; // Host name
		$username="tixzoo"; // Mysql username
		$password="Computer123#"; // Mysql password
		$db_name="tixzoo"; // Database name
		// Connect to server and select databse.
		$dbconn = mysqli_connect($host,$username,$password,$db_name) or die("Error " . mysqli_error($dbconn));
		return $dbconn;
	}
	public function getConnection(){
		return $this->establishSqlConnection();
	}
}