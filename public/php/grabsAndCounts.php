<?php
    ini_set('display_errors', '1');
        ini_set('error_reporting', '1');
        $connect = mysql_connect("localhost", "a_rebours", "Vk*oaK%8C-e9");
        $select = mysql_select_db("NoteNet");

$countType = $_POST['countType'];
$uid = $_POST['uid'];
$createdBy = $_POST['createdBy'];
$noteId = $_POST['noteId'];

if($countType == "addGrab")
{
    $insertString = "INSERT INTO grabs VALUES(NULL, $uid, $createdBy, $noteId)";
	mysql_query($insertString);
}
else if($countType == "addView")
{
$insertString = "INSERT INTO views VALUES($noteId, 1, $createdBy) ON DUPLICATE KEY UPDATE count=count+1";
     mysql_query($insertString);
}
else if($countType == "getNoteGrabs")
{
     $returnedTags = mysql_query("SELECT COUNT(*) FROM grabs WHERE noteId=$noteId");

            while ($tag = mysql_fetch_array($returnedTags))
            {
                       echo $tag[0];
            }
}
else if($countType == "getUserGrabs")
{
     $returnedTags = mysql_query("SELECT COUNT(*) FROM grabs WHERE createdBy=$uid");

            while ($tag = mysql_fetch_array($returnedTags))
            {
                       echo $tag[0];
            }
}
else if($countType == "getNoteViews")
{
     $returnedTags = mysql_query("SELECT count FROM views WHERE noteId=$noteId");

        while ($tag = mysql_fetch_array($returnedTags))
        {
                 echo $tag[0];
        }
}
else if($countType == "getUserViews")
{
     $returnedTags = mysql_query("SELECT SUM(count) FROM views WHERE uid=$uid");

        while ($tag = mysql_fetch_array($returnedTags))
        {
                  echo $tag[0];
        }
}

?>