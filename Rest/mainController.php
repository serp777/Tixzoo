<?php
ob_start();
    if(isset($_GET['logoutMode']) && $_GET['logoutMode'] == "true") {
        setcookie('user', "", time()-1000, '/', '127.0.0.1');
        $result = "success";
    }
ob_end_flush();  

require_once 'userController.php';
header("Content-Type: application/json", true);

	if(isset($_POST['loginMode']) && $_POST['loginMode'] == "true"){
		$login = new userControllerClass();
    	$result["loginVal"] = $login->login($_POST['username'],$_POST['password']);
        if($result["loginVal"] == 0){
            $result["response"] = "badLogin";
            echo $result;
            return $result;
        }
        ob_start();
        $cookie_value = json_encode(array("user" => (array("username" => $_POST['username'], "password" => $_POST['password'])), "successOut" => true));
        setcookie('user', $cookie_value, time()+60*60*24*365, '/', '127.0.0.1');
        if(!isset($_COOKIE['user'])){
            $result["response"] = "goodCookie";
        } else {
            $result["response"] = "badCookie";
        }
        echo json_encode($result);
        ob_end_flush(); 
        return $result;
	} 
    if(isset($_GET['cookieMode']) && $_GET['cookieMode'] == "true"){
        if(!isset($_COOKIE['user'])){
            $result = 0;
            error_log("Cookie is not set!");
        } else {
            $result = json_decode($_COOKIE['user']);
        }
        //return $result;
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

	return $result;

	
?>
