<?php
require_once 'config.php';
require_once __DIR__.'/../userController.php';

\Stripe\Stripe::setApiKey($stripe['secret_key']);

class customerControllerClass {
  private function getAssocCustomerId($email){
    $user = new userControllerClass();
    $cstmrAssocId = $user->getAssocCustomerId($email);
    return $cstmrAssocId;
  }

  public function createCustomer($email){
    $customer = \Stripe\Customer::create(array(
    "description" => "Customer for '$email'",
    "email" => $email));
    $user = new userControllerClass();
    $user->setAssocCustomerId($customer->id, $email);
    return $customer;
    // store customer's id into database
  }

  // add a credit card to a specific user
  public function addCreditCard($email, $token){
    $cstmrAssocId = $this->getAssocCustomerId($email);
    $customer = \Stripe\Customer::retrieve($cstmrAssocId);
    $customer->sources->create(array("source" => $token));
    // store card number in database

  }

  // get a list of credit cards given the email
  public function getCreditCards($email){
    $cstmrAssocId = $this->getAssocCustomerId($email);
    $json = \Stripe\Customer::retrieve($cstmrAssocId)->sources->all(array("object" => "card"));
    $cards = json_decode($json);
    $result = $cards["data"];
    return $result;
  }

  // update a specific credit cards that a user have
  public function updateCreditCard(){
    $cstmrAssocId = $this->getAssocCustomerId($email);
  }
  
  // delete a credit card
  public function deleteCreditCard($email, $index){
    $cstmrAssocId = $this->getAssocCustomerId($email);
    $customer = \Stripe\Customer::retrieve($cstmrAssocId);
    $list = $this->getCreditCards($email);
    $card_id = $list[$index]["id"];
    $customer->sources->retrieve($card_id)->delete();
    return $this->getCreditCards($email);
  }

  // charge a credit card
  public function chargeCreditCard($email, $index, $amount){
    $cstmrAssocId = $this->getAssocCustomerId($email);
    $list = $this->getCreditCards($email);
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