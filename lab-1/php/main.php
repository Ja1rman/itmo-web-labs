<?php
session_start();



function validateFormat($x, $y, $r): bool
{
    if (!($x == '-3' || $x == '-2' || $x == '-1' || $x == '0' || $x == '1' || $x == '2' || $x == '3' || $x == '4' || $x == '5'))
        return false;
    if (strlen($y) > 5 || !is_numeric($y))
        return false;
    if ($y >= 3 || $y <= -5)
        return false;
    if (!($r == '1' || $r == '1.5' || $r == '2' || $r == '2.5' || $r == '3'))
        return false;
    return true;
}


function validateValue($x, $y, $r): bool
{
    if ($x <= 0 && $y <= 0){
        if ($x >= -$r && $y >= $r/2)
            return true;
    }
    if ($x >= 0 && $y >= 0){
        if ($x == $r/2 - $y/2)
            return true;
    }
    if ($x >= 0 && $y <= 0){
        if ($x * $x + $y * $y <= $r*$r / 4)
            return true;
    }
    return false;
}

function main() 
    {
    $startTime = microtime(true);
    $session = $_GET['session'];
    if ($session == '1') {
        if (count($_SESSION) > 0 && $_SESSION['reqs'] != null)
            echo json_encode($_SESSION['reqs']);
        else echo null;
        return;
    }
    $x = $_GET['x'];
    $y = $_GET['y'];
    $r = $_GET['r'];

    $validate = validateFormat($x, $y, $r);
    if ($validate)
        $answer = validateValue(floatval($x), floatval($y), floatval($r));
    else
        $answer = null;
    $array = [
        'isCorrect' => $validate,
        'answer' => $answer,
        'x' => $x,
        'y' => $y,
        'r' => $r,
        'date' => date('d.m.Y H:i:s', time()),
        'time' => round(microtime(true) - $startTime, 8)
    ];
    if (count($_SESSION) > 0 && $_SESSION['reqs'] != null)
        $_SESSION['reqs'] = array_merge_recursive($_SESSION['reqs'], array($array));
    else 
        $_SESSION['reqs'] = array($array);
    echo json_encode($array);
}


main();