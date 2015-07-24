<?php
ob_start();
    if(isset($_POST['loginMode']) && $_POST['loginMode'] == "true"){
        $cookie_value = json_encode(array("user" => (array("username" => $_POST['username'], "password" => $_POST['password'])), "successOut" => true));
        setcookie('user', $cookie_value, time()+60*60*24*365, '/', '127.0.0.1');
        $result = "success";
    } 
    if(isset($_GET['logoutMode']) && $_GET['logoutMode'] == "true") {
        setcookie('user', "", time()-1000, '/', '127.0.0.1');
        $result = "success";
    }
ob_end_flush();  

require_once 'userController.php';
header("Content-Type: application/json", true);

	if(isset($_POST['loginMode']) && $_POST['loginMode'] == "true"){
		$login = new userControllerClass();
    	$result = $login->login($_POST['username'],$_POST['password']);
           
            if (isset($_COOKIE['user'])) {
                error_log("good");
            }
        
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
        if($result === "unEx" || $result === "emEx"){
            $out["response"] = $result;
            echo json_encode($out);
            return $result;
        }
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