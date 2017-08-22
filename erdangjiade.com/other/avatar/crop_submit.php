<?php
session_start();
 $pic_name = $_REQUEST['pic_name'];
$type = get_extension($pic_name);
$filep = "dir/";
if ($type != 'gif') {
    $x = $_REQUEST['x'];
    $y = $_REQUEST['y'];
    $w = $_REQUEST['w'];
    $h = $_REQUEST['h'];
    $targ_w = $targ_h = 180;

    include_once("jcrop_image.class.php");



    $crop = new jcrop_image($filep, $pic_name, $x, $y, $w, $h, $targ_w, $targ_h);
    $file = $crop->crop();
 
} else {
//    $pic_name = "other/avatar/".$pic_name;
   rename($pic_name,$filep.$_SESSION['userid'].".jpg");
   echo json_encode(array("status"=>1));
}
//echo $pic_name;
//   unlink($pic_name);
function get_extension($file) {
    $fileArr = explode("?", $file);
    $type = strtolower(substr(strrchr($fileArr[0], '.'), 1));
    return $type;
}

?>