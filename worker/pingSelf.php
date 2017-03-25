<?php
/**
 * Created by PhpStorm.
 * User: harrisonchow
 * Date: 1/2/17
 * Time: 2:50 PM
 */

$sites = array('https://explainthatagain.herokuapp.com/');
$handles = array();

foreach ($sites as $i => $url) {
    $ch = $handles[$i] = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
}

$mh = curl_multi_init();
foreach ($handles as $ch) {
    curl_multi_add_handle($mh, $ch);
}

$active = null;
do {
    $mrc = curl_multi_exec($mh, $active);
} while ($mrc == CURLM_CALL_MULTI_PERFORM);

while ($active && $mrc == CURLM_OK) {
    if (curl_multi_select($mh) != -1) {
        do {
            $mrc = curl_multi_exec($mh, $active);
        } while ($mrc == CURLM_CALL_MULTI_PERFORM);
    }
}


foreach ($handles as $ch) {
    curl_multi_remove_handle($mh, $ch);
}
curl_multi_close($mh);

// heroku logs -t
error_log('Completed at ' . date('r'));