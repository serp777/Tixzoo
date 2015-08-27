<?php 

    require_once 'config.php';
    require_once 'customerController.php';
    header("Content-Type: application/json", true);

    $token = $_POST['stripeToken'];
    
    // return JSON object that contains a list of cards (last 4 digit and exp date) the user have 
    if(isset($_POST['username']) && $_POST['createCustomerMode'] == true){
        $customer = new customerControllerClass();
        $customer->createCustomer($_POST['username']);

    }
    
    if(isset($_POST['username']) && $_POST['addCardMode'] == true){
        $customer = new customerControllerClass();
        $customer->addCreditCard($token);
        $result = 
    }

    if(isset($_POST['username']) && $_POST['updateCardMode'] == true) {

    }


    // return the status of this transcation
    if(isset($_POST['username']) && $_POST['chargeMode'] == true) {
        
    }

    return $result;

?>