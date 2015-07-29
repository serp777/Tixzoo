<?php
		require_once 'twitterController.php';

        $twitter = new twitterControllerClass();
 		$result["popular"] = $twitter->getTrends();
 		$conversion = json_decode(json_encode($result["popular"]),true);
 		foreach ($conversion[0]["trends"] as $value) 
 		{
 			$output["trending"][] = preg_replace('/#/','',$value["name"]);
 		}

 		if(file_exists('cache/trendingList')){
 			$combined = json_decode(file_get_contents('cache/trendingList'),true);
 			error_log(print_r($combined,1));
 			foreach ($output["trending"] as $valueT)
	 		{
	 			$i = 0;
	 			foreach ($combined as $valueC)
	 			{
	 				
	 				if($valueT == $valueC)
	 				{
	 					$i++;
	 					break;
	 				}
	 			}
	 			if($i == 0){
	 				$combined[] = $valueT;
	 			}
	 		}
	 		file_put_contents('cache/trendingList', json_encode($combined));
 		} else {
 			file_put_contents('cache/trendingList', json_encode($output["trending"]));
 		}



 		
 		echo json_encode($output["trending"]);
?>