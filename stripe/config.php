<?php
require_once 'vendor/autoload.php';

$stripe = array(
  "secret_key"      => "sk_live_hH6bZpPD8K4NBr8S6Kvm9L6g",
  "publishable_key" => "pk_live_INqVKcuALclUZRdlPvmJ9pnt"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>