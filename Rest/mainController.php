<?php
require_once 'userController.php';
header("Content-Type: application/json", true);

	if(isset($_POST['loginMode']) && $_POST['loginMode'] == "true"){
		$login = new userControllerClass();
    	$result = $login->login($_POST['username'],$_POST['password']);

        if(/*isset($_POST['useCookie']) && $_POST['useCookie'] == "true" && $result > 0*/ true) {
            $login->createCookie($_POST['username'], $_POST['password']);
            if (isset($_COOKIE['user'])) {
                error_log("good");
            }
        }
	} 
    if(isset($_POST['cookieMode']) && $_POST['cookieMode'] == "true"){
        $login = new userControllerClass();
        $result = $login->login($_POST['username'],$_POST['password']);
        if(!isset($_COOKIE['user'])){
            $result = 0;
            error_log("Cookie is not set!");
        } else {
            $result = json_decode($_COOKIE['user']);
            error_log("cookie is set, butt.......");
            error_log($_COOKIE['user']);
        }

        //$result = 1;
    }

	if(isset($_POST['createMode']) && $_POST['createMode'] == "true"){
		$create = new userControllerClass();
    	$result = $create->createAccount($_POST['username'],$_POST['password'],$_POST['email']);
    	if($result == 1){
    		$result = true;
            error_log("Account created succesfully.");
    	} elseif($result == 0) {
    		$result = false;
    	} else {
    		error_log("There is a duplicate name and password which is a big problem. Handle this error manually in the database");
    		$result = true;
    	}
	} 

    if(isset($_POST['logoutMode']) && $_POST['logoutMode'] == "true") {

    }
	return $result;

	
?>
