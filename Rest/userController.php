<?php
require_once 'authController.php';
require_once 'stripe/customerController.php';
class userControllerClass {
	private function setupConnection(){
		$con = new authControllerClass();
		return $con->getConnection();
	}
	private function executeSqlQuery($sql,$dbconn){
		$result = $dbconn->query($sql);
		return $result;
	}
	public function login($email, $password){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->setupConnection();
		$email = stripslashes($email);
		$password = stripslashes($password);
		$email = mysqli_real_escape_string($dbconn, $email);
		$password = mysqli_real_escape_string($dbconn, $password);
		$sql="SELECT * FROM accountinfo WHERE emailAddress='$email' and password='$password'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$count= $result->num_rows;
		return $count;
	}
	public function addNewsletterEmail($email){
		$dbconn = $this->setupConnection();
		$myemail = stripslashes($email);
		$myemail = mysqli_real_escape_string($dbconn, $myemail);		
		$sql="INSERT INTO newsletterlist (emailAddress) VALUES ('$myemail')";
		$result = $this->executeSqlQuery($sql,$dbconn);
		return $result;
	}
	public function createAccount($password,$email){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->setupConnection();
		$mypassword = stripslashes($password);
		$myemail = stripslashes($email);
		$mypassword = mysqli_real_escape_string($dbconn, $mypassword);
		$myemail = mysqli_real_escape_string($dbconn, $myemail);
		$sql="SELECT * FROM accountinfo WHERE emailAddress='$myemail'";
		$emlTest = $this->executeSqlQuery($sql,$dbconn);
		$emlTest = $emlTest->num_rows;
		if($emlTest > 0 && $usrnameTest == 0){
			$result["dataError"] = "email in use";
			return $result;  
		}
		$sql="INSERT INTO accountinfo (password, emailAddress, credit) VALUES ('$mypassword','$myemail','1000')";
		$result['query'] = $this->executeSqlQuery($sql,$dbconn);
		$customer = new customerControllerClass();
		$result['customer'] = $customer->createCustomer($myemail);
		return $result;
	}
	public function getUserInfo($email, $password) {
		$result = $this->login($email, $password);
		$row = mysqli_fetch_assoc($result);
		$result = json_encode($row);
		return $result;
	}
	public function setAssocCustomerId($id, $email){
		$dbconn = $this->setupConnection();
		$id = stripslashes($id);
		$id = mysqli_real_escape_string($dbconn, $id);
		$sql = "UPDATE accountinfo SET cstmrAssocId = '$id' WHERE emailAddress = '$email'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$output["response"] = $result;
		return $output;
	}
	public function setAssocTicketCustomerBuyId($id, $ticketID){
		$dbconn = $this->setupConnection();
		$id = stripslashes($id);
		$id = mysqli_real_escape_string($dbconn, $id);
		$sql = "UPDATE tickets SET cstmrPurchaseId = '$id' WHERE ticketID = '$ticketID'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$output["response"] = $result;
		return $output;
	}
	public function getAssocCustomerId($email){
		$dbconn = $this->setupConnection();
		$sql = "SELECT * FROM accountinfo WHERE emailAddress = '$email'";
		$result = $this->executeSqlQuery($sql, $dbconn);
		$row = mysql_fetch_object($result);
		return $row->cstmrAssocId;
	}
	public function getAssocTicketCustomerBuyId($ticketID){

	}
	public function deleteCookie(){
		ob_start();
		unset($_COOKIE['user']);
		ob_end_flush();
	}
}