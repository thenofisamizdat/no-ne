<?php


    ini_set('display_errors', '0');
    ini_set('error_reporting', E_ALL);
    $connect = mysql_connect("localhost", "NoteNet", "Vk*oaK%8C-e9");
    $select = mysql_select_db("2105777_gate");

    $uid = $_POST['uid'];

    // get tags for user. if user is 0, get all

    $tags = array();

        // simple for now, will add check to get chats after timestamp
    if ($uid == 0){
        $tags_list = mysql_query("SELECT * FROM tags WHERE active='1'");
    }
    else{
        $tags_list = mysql_query("SELECT * FROM tags WHERE uid='$uid' AND active='1'");
    }
        
	while ($row = mysql_fetch_array($tags_list))
	{
            $obj = (object) $row;
            array_push($tags, $row);

	}
	echo json_encode($chats);

?>