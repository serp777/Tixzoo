<?php
require_once 'vendor/autoload.php';

$stripe = array(
  "secret_key"      => "sk_test_Ubx7OiE0Tk1iyYIl6grqHyo8",
  "publishable_key" => "pk_test_1x7cbrNQ0PCFEzY401EoxG8M"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>