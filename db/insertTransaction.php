
<?php
header("Access-Control-Allow-Origin:*");
$dbName = "bankingsystem";
$uName = "root";
$pass = "";
$host = "localhost";
$sql = "";
$id = "";

$conn = new mysqli($host, $uName, $pass, $dbName);
$method = $_SERVER['REQUEST_METHOD'];

$json = file_get_contents('php://input');
$obj = json_decode($json, true);
        $sender = $obj['sender'];
        $receiver = $obj['receiver'];
        $amount = $obj['amount'];
        $transactionTime = $obj['transactionTime'];
        $purpose = $obj['purpose'];
        $sql = "INSERT INTO transactions (sender, receiver, amount, transactionTime, purpose) VALUES('$sender', '$receiver', '$amount', '$transactionTime', '$purpose')";
$result = mysqli_query($conn, $sql);


if(!$result){
    http_response_code(404);
    die(mysqli_error($conn));
}

if($method == "GET"){
    if(!$id) echo '[';
    for($i = 0; $i < mysqli_num_rows(($result)); $i++){
        echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if(!$id) echo ']';
}elseif($method == "POST"){
    echo json_encode($result);
}
else{
    echo mysqli_affected_rows($conn);
}
$conn->close();