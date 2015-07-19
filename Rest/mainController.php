<?php
require_once 'userController.php';
header("Content-Type: application/json", true);

	if($_POST['loginMode'] == "true"){
		$login = new userControllerClass();
    	$result = $login->login($_POST['username'],$_POST['password']);

	} 

	if($_POST['createMode'] == "true"){
		$create = new userControllerClass();
    	$result = $create->createAccount($_POST['username'],$_POST['password'],$_POST['email']);
	} 
	return $result;

	
?>
