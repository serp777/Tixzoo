<?php 

    require_once 'config.php';
    require_once 'customerController.php';
    header("Content-Type: application/json", true);

    $response = $_POST['response'];
    $token = $response->id;
    
    $customer = new customerControllerClass();

    // if(isset($_POST['email']) && $_POST['createCustomerMode'] == "true"){
    //     $customer->createCustomer($_POST['email']);
    // } 
   
    // The following modes (addCard, deleteCard,return JSON object that contains a list of cards (last 4 digit and exp date) the user have 
    //
    // Example:
    // [
    // [0] => Stripe\Card JSON: {
    //   "id": "card_16cQQzIl7xavwO9sBaAn1fQU",
    //   "object": "card",
    //   "last4": "4242",
    //   "brand": "Visa",
    //   "funding": "credit",
    //   "exp_month": 8,
    //   "exp_year": 2016,
    //   "country": "US",
    //   "name": null,
    //   "address_line1": null,
    //   "address_line2": null,
    //   "address_city": null,
    //   "address_state": null,
    //   "address_zip": null,
    //   "address_country": null,
    //   "cvc_check": null,
    //   "address_line1_check": null,
    //   "address_zip_check": null,
    //   "tokenization_method": null,
    //   "dynamic_last4": null,
    //   "metadata": {
    //   },
    //   "customer": "cus_6q5goD54UGArJX"
    //   }
    // ]
    if(isset($_POST['email']) && $_POST['addCardMode'] == "true"){
        $customer->addCreditCard($token);
        $result = $customer->getCreditCards($_POST['email']);
    }
    // cardIndex specify the index of the card that the user want to update
    // update card
    if(isset($_POST['email']) && isset($_POST['cardIndex']) && $_POST['updateCardMode'] == "true") {
        
    }
    // delete card
    if(isset($_POST['email']) && isset($_POST['cardIndex']) && $_POST['deleteCardMode'] == "true") {
        $customer->deleteCreditCard($_POST['email'], $_POST['cardIndex']);
        $result = $customer->getCreditCards($_POST['email']);
    }
    // return the status of this transcation
    if(isset($_POST['email']) && isset($_POST['cardIndex']) && isset($_POST['amount']) && $_POST['chargeMode'] == "true") {
        $customer->chargeCreditCard($_POST['email'], $_POST['cardIndex'], $_POST['amount']);
        
    }
    return $result;

?>