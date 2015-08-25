<?php require_once('config.php'); 

echo '<form action="charge.php" method="post">
  <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
  		  data-key="<?php echo $stripe['publishable_key']; ?>"
          data-image="/img/max-frat.png"
    	  data-name="Tixzoo"
          data-description="The Weeknd Concert"
          data-amount="10000"
          data-locale="auto"></script>
</form>';

?>