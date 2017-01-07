<?php
//
//var_dump($_POST);

//foreach($_POST as $key => $value)
//{
//    $file = $value;
//    //echo $file;
//    echo "______";
//}
//echo $file;
//file_put_contents('../audio/test.wav', $file);
$file = "/audio/".uniqid().".wav";
//$file = "/audio/amy.wav";
move_uploaded_file(
    $_FILES['that_random_filename_wav']['tmp_name'],
    $_SERVER['DOCUMENT_ROOT'] . $file
);
//fclose($file);
//chmod($file, 0777);
$obj = array();
$obj["file"]=$file;
echo json_encode($obj)
?>

