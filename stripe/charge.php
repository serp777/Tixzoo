<?php
  require_once('config.php');
  echo 'While this is going to be parsed.';
  $token  = $_POST['stripeToken'];

  $customer = \Stripe\Customer::create(array(
      'email' => 'customer@example.com',
      'card'  => $token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount'   => 5000,
      'currency' => 'usd'
  ));
  // example
  echo $stripe['publishable_key']
  echo '<h1>Successfully charged $50.00!</h1>';
?>