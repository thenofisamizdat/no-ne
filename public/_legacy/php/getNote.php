<?php


    ini_set('display_errors', '1');
    ini_set('error_reporting', '1');

    $searchType = $_POST['searchType'];
    $searchQuery = $_POST['searchQuery'];
    $noteId = $_POST['noteId'];
    $uid = $_POST['uid'];
    $searchString = "";

    for ($i =0; $i<sizeof($searchQuery); $i++){
        $searchString = $searchString." +".$searchQuery[$i];

    }

    $searchString = addslashes($searchString);


if ($searchType == "tagSearch"){
    $connect = mysql_connect("localhost", "a_rebours", "Vk*oaK%8C-e9");
    $select = mysql_select_db("NoteNet");

    $sqlStringText = "SELECT *, MATCH(tag, tag) AGAINST('$searchString') AS score FROM noteTags  WHERE MATCH(tag, tag) AGAINST('$searchString') GROUP BY noteId";
    $tags = array();
    $returnObjects = array();

	$returnedTags = mysql_query($sqlStringText);

	while ($tag = mysql_fetch_array($returnedTags))
	{
            $noteId = $tag["noteId"];

            $returnedNotes = mysql_query("SELECT * FROM notes WHERE id=$noteId");
            while ($row = mysql_fetch_array($returnedNotes))
            {
                    $obj = array();
                    $obj["uid"] = $tag["uid"];
                    $obj["noteId"] = $tag["noteId"];
                    $obj["tag"] = $tag["tag"];
                    $obj["score"] = $tag["score"];
                    $obj["created"] = $row["created"];
                    $obj["content"] = $row["content"];
                    $obj["public"] = $row["public"];

                    array_push($returnObjects, $obj);
            }
	}

    echo json_encode($returnObjects);
}
else if ($searchType == "noteSearch"){
    $connect = mysql_connect("localhost", "a_rebours", "Vk*oaK%8C-e9");
    $select = mysql_select_db("NoteNet");

    $sqlStringText = "SELECT *, MATCH(content, content) AGAINST('$searchString') AS score FROM notes WHERE MATCH(content, content) AGAINST('$searchString')";
    $notes = array();

	$returnedNotes = mysql_query($sqlStringText);

	while ($row = mysql_fetch_array($returnedNotes))
	{
	        $obj = array();
            $obj["uid"] = $row["created_by_id"];
            $obj["noteId"] = $row["id"];
            $obj["content"] = $row["content"];
            $obj["score"] = $row["score"];
            $obj["created"] = $row["created"];
            $obj["public"] = $row["public"];
            $obj["tag"] = "";

	        $noteId = $row["id"];

	        $returnedTags= mysql_query("SELECT * FROM noteTags WHERE noteId=$noteId");
            while ($rowTag = mysql_fetch_array($returnedTags))
            {
	            $obj["tag"] = $rowTag["tag"];
	        }
            array_push($notes, $obj);
	}

    echo json_encode($notes);
}
else if ($searchType == "directSearch"){
    $connect = mysql_connect("localhost", "a_rebours", "Vk*oaK%8C-e9");
    $select = mysql_select_db("NoteNet");

    $sqlStringText = "SELECT * FROM notes WHERE id=$noteId";
    $sqlStringTags = "SELECT * FROM noteTags WHERE id=$noteId";
    // next create a return object combining actual note, and corresponding tags
    $notes = array();

	$returnedNotes = mysql_query($sqlStringText);

	while ($row = mysql_fetch_array($returnedNotes))
	{
	        $obj = array();
            $obj["uid"] = $row["created_by_id"];
            $obj["noteId"] = $row["id"];
            $obj["content"] = $row["content"];
            $obj["score"] = $row["score"];
            $obj["created"] = $row["created"];
            $obj["public"] = $row["public"];
            $obj["tag"] = "";

	        $noteId = $row["id"];

	        $returnedTags= mysql_query("SELECT * FROM noteTags WHERE noteId=$noteId");
            while ($rowTag = mysql_fetch_array($returnedTags))
            {
	            $obj["tag"] = $rowTag["tag"];
	        }
            array_push($notes, $obj);
	}

    echo json_encode($notes);
}
else if ($searchType == "userSearch"){
    $connect = mysql_connect("localhost", "a_rebours", "Vk*oaK%8C-e9");
    $select = mysql_select_db("NoteNet");

    $sqlStringText = "SELECT * FROM notes WHERE created_by_id=$uid";
    // next create a return object combining actual note, and corresponding tags
    $notes = array();

	$returnedNotes = mysql_query($sqlStringText);

	while ($row = mysql_fetch_array($returnedNotes))
	{
	        $obj = array();
            $obj["uid"] = $row["created_by_id"];
            $obj["noteId"] = $row["id"];
            $obj["content"] = $row["content"];
            $obj["score"] = $row["score"];
            $obj["created"] = $row["created"];
            $obj["public"] = $row["public"];
            $obj["tag"] = "";

	        $noteId = $row["id"];

	        $returnedTags= mysql_query("SELECT * FROM noteTags WHERE noteId=$noteId");
            while ($rowTag = mysql_fetch_array($returnedTags))
            {
	            $obj["tag"] = $rowTag["tag"];
	        }
            array_push($notes, $obj);
	}

    echo json_encode($notes);
}

?>