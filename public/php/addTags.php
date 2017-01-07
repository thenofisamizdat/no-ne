<?php
    ini_set('display_errors', '0');
    ini_set('error_reporting', '0');

$tag = $_POST['tag'];
$uid = $_POST['uid'];

if(isset($_POST['tag']))
{
        $connect = mysql_connect("fdb13.awardspace.net:3306", "2105777_gate", "dpej67eb");
        $select = mysql_select_db("2105777_gate");
		
	$tag = $_POST['tag'];
        $uid = $_POST['uid'];
	
		//mysql_query("INSERT INTO email VALUES('', '$uid', '$ReceiverID', '$Message', '".date("Y-m-d H:i:s")."', 'q')");
	mysql_query("INSERT IGNORE INTO tags VALUES('', '$tag', '$uid', UNIX_TIMESTAMP(NOW()), '1')");
        mysql_query("INSERT INTO user_tags VALUES('$uid', 1, '$tag', UNIX_TIMESTAMP(NOW()), 1) ON DUPLICATE KEY UPDATE tag_weight=tag_weight+1");
  	//echo "message correctly sent.";
		
}

?>