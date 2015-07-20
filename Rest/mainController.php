<?php
require_once 'userController.php';
header("Content-Type: application/json", true);

	if(isset($_POST['loginMode']) && $_POST['loginMode'] == "true"){
		$login = new userControllerClass();
    	$result = $login->login($_POST['username'],$_POST['password']);
	} 
    if(isset($_POST['cookieMode']) && $_POST['cookieMode'] == "true"){
        $login = new userControllerClass();

        $result = 1;
    }

	if(isset($_POST['createMode']) && $_POST['createMode'] == "true"){
		$create = new userControllerClass();
    	$result = $create->createAccount($_POST['username'],$_POST['password'],$_POST['email']);
    	if($result === 1){
    		$result = true;
    	} elseif($result === 0) {
    		$result = false;
    	} else {
    		error_log("There is a duplicate name and password which is a big problem. Handle this error manually in the database");
    		$result = true;
    	}
	} 
	return $result;

	
?>
