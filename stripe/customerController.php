<?php
require_once 'config.php';
require_once '../Rest/userController.php';

\Stripe\Stripe::setApiKey($stripe['secret_key']);

class customerControllerClass {
  private function getAssocCustomerId($username){
    $user = new userControllerClass();
    $cstmrAssocId = $user->getAssocCustomerId($username);
    return $cstmrAssocId;
  }

  public function createCustomer($username, $email){
    $customer = \Stripe\Customer::create(array(
    "description" => "Customer for '$username'",
    "email" => $email));
    $user = new userControllerClass();
    $user->setAssocCustomerId($customer->id, $username);
    return $customer;
    // store customer's id into database
  }

  // add a credit card to a specific user
  public function addCreditCard($username, $token){
    $cstmrAssocId = $this->getAssocCustomerId($username);
    $customer = \Stripe\Customer::retrieve($cstmrAssocId);
    $customer->sources->create(array("source" => $token));
    // store card number in database

  }

  // get a list of credit cards given the username
  public function getCreditCards($username){
    $cstmrAssocId = $this->getAssocCustomerId($username);
    $json = \Stripe\Customer::retrieve($cstmrAssocId)->sources->all(array("object" => "card"));
    $cards = json_decode($json);
    $result = $cards["data"];
    return $result;
  }

  // update a specific credit cards that a user have
  public function updateCreditCard(){
    $cstmrAssocId = $this->getAssocCustomerId($username);
  }
  
  // delete a credit card
  public function deleteCreditCard($username, $index){
    $cstmrAssocId = $this->getAssocCustomerId($username);
    $customer = \Stripe\Customer::retrieve($cstmrAssocId);
    $list = $this->getCreditCards($username);
    $card_id = $list[$index]["id"];
    $customer->sources->retrieve($card_id)->delete();
    return $this->getCreditCards($username);
  }

  // charge a credit card
  public function chargeCreditCard($username, $index, $amount){
    $cstmrAssocId = $this->getAssocCustomerId($username);
    $list = $this->getCreditCards($username);
    $card_id = $list[$index]["id"];
    try {
      $charge = \Stripe\Charge::create(array(
        "amount" => $amount, // amount in cents, again
        "currency" => "usd",
        "customer" => $cstmrAssocId,
        "source" => $card_id,
        "description" => "Example charge")
      );
      $result['charge'] = $charge->id;
      // store in db
      // ....

    } catch(\Stripe\Error\Card $e) {
    // The card has been declined
      $body = $e->getJsonBody();
      $err  = $body['error'];
      
      $result['error'] = $err['message'];
    }
    return $result; 
  }
}
?>