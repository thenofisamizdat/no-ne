<?php
    ini_set('display_errors', '1');
    ini_set('error_reporting', '1');

$tags = addslashes($_POST['tag']);
$note = addslashes($_POST['content']);
$noteId = $_POST['noteId'];
$uid = $_POST['uid'];


$note = '"'.$note.'"';
$tags = '"'.$tags.'"';

//$note = addslashes($note);
//$tags = addslashes($tags);
//
echo $tags;
echo $note;
echo "tes000ting";

if(isset($note))
{


    $connect = mysql_connect("localhost", "a_rebours", "Vk*oaK%8C-e9");
    $select = mysql_select_db("NoteNet");

	mysql_query("INSERT INTO `notes` (`id`, `content`, `created_by_id`, `created`, `public`) VALUES ($noteId, $note, $uid, UNIX_TIMESTAMP(NOW()), '1') ON DUPLICATE KEY UPDATE content=$note, created=UNIX_TIMESTAMP(NOW());");

	//mysql_query("INSERT INTO notes VALUES('', '$note', '$uid', UNIX_TIMESTAMP(NOW()), '1')");
	//mysql_query("INSERT INTO chats VALUES('', '$message', '$chatroom', '$uid', UNIX_TIMESTAMP(NOW()), '1', '$userName')");
	$noteId = mysql_insert_id();


	$tagId = $noteId . $tags;
	mysql_query("INSERT INTO noteTags VALUES('$uid', '$noteId' , '$tags', UNIX_TIMESTAMP(NOW())) ON DUPLICATE KEY UPDATE tag=$tags, last_used=UNIX_TIMESTAMP(NOW())");
	echo mysql_error();


	echo $noteId;
	
//	foreach($tags as $tag) {
//		$tagId = $noteId . $tag;
//    	mysql_query("INSERT INTO noteTags VALUES('$uid', '$noteId' , '1', '$tag', UNIX_TIMESTAMP(NOW()), '1', '$tagId') ON DUPLICATE KEY UPDATE tag_weight=tag_weight+1");
//		echo $tagId;
//	}
	//mysql_query("INSERT IGNORE INTO tags VALUES('', '$tag', '$uid', UNIX_TIMESTAMP(NOW()), '1')");
    
  	//echo "message correctly sent.";

}

?>