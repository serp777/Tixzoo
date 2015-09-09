<?php
require_once 'authController.php';
require_once 'emailController.php';
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
	public function createAccount($email, $password){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->setupConnection();
		$mypassword = stripslashes($password);
		$myemail = stripslashes($email);
		$mypassword = mysqli_real_escape_string($dbconn, $mypassword);
		$myemail = mysqli_real_escape_string($dbconn, $myemail);
		$sql="SELECT * FROM accountinfo WHERE emailAddress='$myemail'";
		$emlTest = $this->executeSqlQuery($sql,$dbconn);
		$emlTest = $emlTest->num_rows;
		if($emlTest > 0){
			$result["dataError"] = "email in use";
			return $result;  
		}
		// create random confirmation key for new user: Email Verification
		$key = $myemail . date('mY');
		$key = md5($key);
		error_log($key);
		$sql="INSERT INTO confirm (confirm_key, emailAddress) VALUES ('$key', '$myemail')";
		$confirm = $this->executeSqlQuery($sql,$dbconn);
		
		// send email
		$email = new emailControllerClass();
		$response = $email->sendEmail($myemail, "Your confirmation link is: http://127.0.0.1:8080/?id=$key");
		error_log($response);
		if($response) {
			$sql="INSERT INTO accountinfo (password, emailAddress, credit) VALUES ('$mypassword','$myemail','1000')";
			$result = $this->executeSqlQuery($sql,$dbconn);
			error_log("if");
		} 
		else {
			error_log("else");
			$result['error'] = "Could not send email for verification!!";
		}

		
		//$customer = new customerControllerClass();
		//$result['customer'] = $customer->createCustomer($myemail);
		return $result;
	}
	public function verifyAccount($confirm_key){
		$dbconn = $this->setupConnection();
		$confirm_key = mysqli_real_escape_string($dbconn, $confirm_key);
        $sql = "SELECT * FROM confirm WHERE confirm_key = '$confirm_key' LIMIT 1";
        $confirm_result = $this->executeSqlQuery($sql,$dbconn);
        error_log($sql);
        if ($confirm_result->num_rows != 0){
        	// Update account's isActivated
        	$confirm_info = mysqli_fetch_assoc($confirm_result);
        	$sql = "UPDATE accountinfo SET isActivated = 'true' WHERE emailAddress = '$confirm_info[emailAddress]' LIMIT 1";
        	$update_result = $this->executeSqlQuery($sql,$dbconn);
        	// delete from Confirm
        	$sql = "DELETE FROM confirm WHERE emailAddress = '$confirm_info[emailAddress]' LIMIT 1";
        	$delete_result = $this->executeSqlQuery($sql,$dbconn);
        	error_log("Confirm result succeed!");
        	if ($update_result->num_rows != 0) {
        		return 1; 
        	}
        } else {
        	error_log("confirm result fail!!");
        }
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