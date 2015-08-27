<?php
require_once './config.php';
require_once '../Rest/userController.php';

\Stripe\Stripe::setApiKey($stripe[secret_key]);

class customerControllerClass {

  public function createCustomer($username) {
    $customer = \Stripe\Customer::create(array(
    "description" => "Customer for '$email'"));
    $user = new userControllerClass();
    $user->assocCustomerId($customer->id, $username);
    return $customer;
    // store customer's id into database
  }

  // add a credit card to a specific user
  public function addCreditCard($username, $token) {
    $user = new userControllerClass();
    $cstmrAssocId = $user->getAssocCustomerId($username);
    $customer = \Stripe\Customer::retrieve($cstmrAssocId);
    $customer->sources->create(array("source" => $token));
    // store card number in database

  }

  // get a list of credit cards given the username
  public function getCreditCards($username){
    $user = new userControllerClass();
    $cstmrAssocId = $user->getAssocCustomerId($username);
    $json = \Stripe\Customer::retrieve($cstmrAssocId)->sources->all(array("object" => "card"));
    $cards = json_decode($json);
    $result['cards'] = $cards["data"];
    return $result;
  }

  // update a specific credit cards that a user have
  public function updateCreditCard(){
    $user = new userControllerClass();
    $cstmrAssocId = $user->getAssocCustomerId($username);
  }
  
  // delete a credit card
  public function deleteCreditCard($username, $index){
    $user = new userControllerClass();
    $cstmrAssocId = $user->getAssocCustomerId($username);
    $customer = \Stripe\Customer::retrieve($cstmrAssocId);
    $list = $this->getCreditCards($username);
    $card_id = $list['cards'][$index]['id'];
    $customer->sources->retrieve($card_id)->delete();
    return $this->getCreditCards($username);
  }

}
?>