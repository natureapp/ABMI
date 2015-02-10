<a href="/some/dynamic/url/rawdata.zip" class="download-button">Raw Data File <em>(zip format 1.25MB)</em></a>
<?php

if( isset($_POST['elements']) )	{
	
	foreach($_POST['elements'] as $ct => $arr){
		echo '<pre>'; print_r($arr); echo '</pre>';	
	}
	
}

?>