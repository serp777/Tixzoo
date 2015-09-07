<?php
//ob_start();
    if(isset($_GET['logoutMode']) && $_GET['logoutMode'] == "true") {
        setcookie('user', "", time()-1000, '/', '127.0.0.1');
        $result = "success";
    }
require_once 'userController.php';
require_once 'ticketController.php';
require_once 'emailController.php';
header("Content-Type: application/json", true);
    if(isset($_GET['init']) && $_GET['init'] == "true"){
        $tickets = new ticketControllerClass();
        $result["tickets"] = $tickets->getTickets();
        $result["cookie"] = json_decode($_COOKIE['user']);
        echo json_encode($result);
        return $result;
    }
	if(isset($_POST['loginMode']) && $_POST['loginMode'] == "true"){
		$login = new userControllerClass();
    	$result["loginVal"] = $login->login($_POST['email'], $_POST['password']);
        $result["error"] = false;
        if($result["loginVal"] == 0){
            $result["errorMessage"] = "Username or Password combination does not exist";
            $result["error"] = true;
            echo json_encode($result);
            return $result;
        }
        ob_start();
        $cookie_value = json_encode(array("user" => (array("email" => $_POST['email'], "password" => $_POST['password'])), "successOut" => true));
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
        echo json_encode($result);
        return "";
    }

    if(isset($_POST['emailMode']) && $_POST['emailMode'] == "true")
    {
        $email = new emailControllerClass();
        $output = $email->sendEmail($_POST['email'],$_POST['message']);
        echo json_encode($output);
        return "";
    }

	if(isset($_POST['createMode']) && $_POST['createMode'] == "true"){
		$create = new userControllerClass();
    	$result = $create->createAccount($_POST['email'],$_POST['password']);
    	if(isset($result["dataError"]))
        {
            echo json_encode($result);
            return "";
        }
        if($result == 1){
    		$result["success"] = true;
            error_log("Account created succesfully.");
    	} elseif($result == 0) {
            $result["success"] = false;
    	} else {
    		error_log("There is a duplicate name and password which is a big problem. Handle this error manually in the database");
    		$result["success"] = true;
    	}
        echo json_encode($result);
        return "";
	}

    if(isset($_POST['createticketMode']) && $_POST['createticketMode'] == "true"){
        $ticketController = new ticketControllerClass();
        $login = new userControllerClass();
        $userInfo = $login->getUserInfo($_POST['email'], $_POST['password']);
        $userInfo = json_decode($userInfo, true);
        $sellerID = $userInfo['accountID'];
        // error_log($sellerID);
        $result = $ticketController->createTicket($_POST['name'], $sellerID, $_POST['location'],
            $_POST['date'], $_POST['price'], $_POST['type'], $_POST['description']);

    }

    return $result || '';
?>