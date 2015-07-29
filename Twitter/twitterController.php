<?php
require "vendor/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
define("CONSUMER_KEY", "yAk8yyCWiYBtGyWyqOk7ZRG1A");
define("CONSUMER_SECRET", "Uf2qXNNup673hbteJuo3uIYDqLOOpU9Z5qN4eHlqKO9a4uool5");
define("OAUTH_TOKEN", "3299859776-B9AzyWhKxu7886IGSzwRhwTrWUdDS9vPKZQX5gt");
define("OAUTH_TOKEN_SECRET", "Pzkhtkq0cz8bkII11p6WR9Cb95RHSKhmU6pxQZxA5DvLU");
class twitterControllerClass {

	private function getConnectionWithAccessToken() {
	  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET);
	  return $connection;
	}

	private function setupConnection($getFunction, $params){
		$connection = $this->getConnectionWithAccessToken("serp1993", "computer123");
		$content = $connection->get($getFunction, $params);
		return $content;
	}
	public function getTrends(){
		return $this->setupConnection("trends/place", array("id" => 23424977));
	}
}

?>