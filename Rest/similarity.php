<?php
	header("Content-Type: application/json", true);
	$tickets = $_GET["list"];
	$out["tickets"][] = "test";
	foreach ($tickets as $value) {
		similar_text($_GET["search"], substr($value["name"], 0, strlen($_GET["search"])), $sim);
		if($sim >= 80 && $value)
		{
			$out["tickets"][] = $value;
		}

	}
	echo json_encode($out);

?>