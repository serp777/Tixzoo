<?php
class ticketControllerClass {
	private function establishConnection(){
		$host="localhost"; // Host name 
		$username="root"; // Mysql username 
		$password="computer123"; // Mysql password 
		$db_name="tixzoo"; // Database name 
		// Connect to server and select databse.
		$dbconn = mysqli_connect($host,$username,$password,$db_name) or die("Error " . mysqli_error($dbconn));
		return $dbconn;
	}
	private function executeSqlQuery($sql,$dbconn){
		$result = $dbconn->query($sql);
		return $result;
	}
	public function search($keyword){ // search fields include name, location
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->establishConnection();
		$username = stripslashes($username);
		$password = stripslashes($password);
		//$username = mysqli_real_escape_string($username);
		//$password = mysqli_real_escape_string($password);
		$sql="SELECT * FROM accountinfo WHERE username='$username' and password='$password'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$count = $result->num_rows;
		echo $count;
		return $count;
		
	}
	public function createTicket($name, $sellerID, $location, $price, $type, $description){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->establishConnection();
		$myname = stripslashes($name);
		$mysellerID = intval($sellerID);
		$mylocation = stripslashes($location);
		$myprice = floatval($price);
		$mytype = stripslashes($type);
		$mydescription = stripslashes($description);
		$myname = mysqli_real_escape_string($dbconn, $myname);
		$mylocation = mysqli_real_escape_string($dbconn, $mylocation);
		$mytype = mysqli_real_escape_string($dbconn, $mytype);
		$mydescription = mysqli_real_escape_string($dbconn, $mydescription);
		
		//current_timestamp
		$sql="INSERT INTO ticket (name, sellerID, location, price, type, description) VALUES ('$myname','$mysellerID','$mylocation','$myprice', '$mytype', '$mydescription')";
		echo $sql;
		$result = $this->executeSqlQuery($sql,$dbconn);
		return $result;
	}
}
?>