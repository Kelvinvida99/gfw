<?php 

function compress($source, $destination, $quality, $new_width) {

$info = getimagesize($source);
//$exif = exif_read_data($source);
$exif = @exif_read_data($source);
$orientation = 0;

if(isset($exif['Orientation'])){
    $orientation = $exif['Orientation'];
}


if ($info['mime'] == 'image/jpeg' || $info['mime'] == 'image/jfif' || $info['mime'] == 'image/JFIF') 
    $image = imagecreatefromjpeg($source);
elseif ($info['mime'] == 'image/gif') 
    $image = imagecreatefromgif($source);

elseif ($info['mime'] == 'image/png') 
    $image = imagecreatefrompng($source);

$x = imagesx($image);
$y = imagesy($image);

if($x <= $new_width){ 
    $new_width = $x;
    $new_height = $y;
}
else{
    switch ($orientation) {
        case 2:
            imageflip($image, IMG_FLIP_HORIZONTAL);
            break;
        case 3:
            $image = imagerotate($image, 180, 0);
            break;
        case 4:
            imageflip($image, IMG_FLIP_VERTICAL);
            break;
        case 5:
            $image = imagerotate($image, -90, 0);
            imageflip($image, IMG_FLIP_HORIZONTAL);
            break;
        case 6:
            $image = imagerotate($image, -90, 0);
            break;
        case 7:
            $image = imagerotate($image, 90, 0);
            imageflip($image, IMG_FLIP_HORIZONTAL);
            break;
        case 8:
            $image = imagerotate($image, 90, 0); 
            break;
    }

    $x = imagesx($image);
    $y = imagesy($image);

    $new_height = $new_width / ($x / $y); 
}



$s = imagecreatetruecolor($new_width, $new_height);
imagecopyresampled($s, $image, 0, 0, 0, 0, $new_width, $new_height,	$x, $y);
imagejpeg($s, $destination);
return $destination;
}