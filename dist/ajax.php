<?php

$sessionId = $_GET['JSESSIONID'];

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "http://m.coke-food.com/cola-gift-exchange-manager/trade/?jtStartIndex=0&jtPageSize=10",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "start_time=2019.03.12&end_time=2019.03.19",
    CURLOPT_HTTPHEADER => array(
        "Content-Type: application/x-www-form-urlencoded",
        "Cookie: JSESSIONID={$sessionId}",
        "cache-control: no-cache"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}