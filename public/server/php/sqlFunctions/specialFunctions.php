<?php

//generar un color pastel hexadecimal
function generateRandomHexColor() {
    $r = mt_rand(127, 255);
    $g = mt_rand(127, 255);
    $b = mt_rand(127, 255);
    
    // Convertir a formato hexadecimal y asegurar que cada valor tenga 2 dígitos
    $randomPastelColor = '#' . str_pad(dechex($r), 2, '0', STR_PAD_LEFT)
                               . str_pad(dechex($g), 2, '0', STR_PAD_LEFT)
                               . str_pad(dechex($b), 2, '0', STR_PAD_LEFT);

    return $randomPastelColor;
}

