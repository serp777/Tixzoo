<?php
require_once 'authController.php';
class ticketControllerClass {
	
	private function setupConnection(){
		$con = new authControllerClass();
		return $con->getConnection();
	}
	private function executeSqlQuery($sql, $dbconn){
		$result = $dbconn->query($sql);
		return $result;
	}
	public function getTickets() {
		$dbconn = $this->setupConnection();
		$sql = "SELECT * FROM tickets";
		$result = $this->executeSqlQuery($sql, $dbconn);
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;
		}
		$result = $rows;
		return $result;
	}
	public function searchTicket($quickSearch){ // search fields include name, location
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->setupConnection();
		$searchKeywords = explode(" ", $quickSearch);
		$sql="SELECT * FROM accountinfo WHERE emailAddress='$email' and password='$password'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$count = $result->num_rows;
		return $count;
	}
	public function getTicketsBySellerID($sellerID){
		$dbconn = $this->setupConnection();
		$sql = "SELECT * FROM tickets WHERE isSold = 0 AND sellerID = '$sellerID'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;
		}
		$result = $rows;
		return $result;
	}
	public function getTicketsByBuyerID($buyerID){
		$dbconn = $this->setupConnection();
		$sql = "SELECT * FROM tickets WHERE isSold = 1 AND buyerID = '$buyerID'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;
		}
		$result = $rows;
		return $result;
	}
	public function createTicket($name, $sellerID, $location, $date, $price, $type, $description){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->setupConnection();
		$myname = stripslashes($name);
		$mysellerID = intval($sellerID);
		$mylocation = stripslashes($location);
		$mydate = (string) strtotime($date);
		$myprice = floatval($price);
		$mytype = stripslashes($type);
		$mydescription = stripslashes($description);
		$myname = mysqli_real_escape_string($dbconn, $myname);
		$mylocation = mysqli_real_escape_string($dbconn, $mylocation);
		$mytype = mysqli_real_escape_string($dbconn, $mytype);
		$mydescription = mysqli_real_escape_string($dbconn, $mydescription);
		$sql = "INSERT INTO tickets (`name`, `sellerID`, `location`, `date`, `price`, `type`, `description`) VALUES ('$myname', '$mysellerID', '$mylocation', '$mydate', '$myprice', '$mytype', '$mydescription')";
		$result = $this->executeSqlQuery($sql,$dbconn);
		return $result;
	}
}