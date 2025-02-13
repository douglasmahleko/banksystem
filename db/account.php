<?php
header("Access-Control-Allow-Origin:*");
$dbName = "bootstrapcrud";
$uName = "root";
$pass = "";
$host = "localhost";
$sql = "";
$id = "";

$conn = new mysqli($host, $uName, $pass, $dbName);
$method = $_SERVER['REQUEST_METHOD'];

if(!$conn){
    die("connection falied : " . mysqli_connect_error());
}
$sql1 = "create table if not exists acounts(id int primary key AUTO_INCREMENT, fname varchar(255) not null, lname varchar(255) not null, contact int unique not null, email varchar(255) unique not null, balance varchar(255) not null, accountType varchar(255) not null, password varchar(255) not null, confirm varchar(255) not null)";
$result = mysqli_query($conn, $sql1);
$sql2 = "create table if not exists transactions(id int primary key AUTO_INCREMENT, sender varchar(255) not null, receiver varchar(255) not null, amount varchar(255) not null, transactionTime datetime NOT NULL)";
$result = mysqli_query($conn, $sql2);
switch ($method){
    case "GET":
        $sql = "SELECT * FROM acounts";
        break;
    case "POST":
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $contact = $_POST['contact'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm = $_POST['confirm'];
        $sql = "INSERT INTO acounts (fname,lname,contact, email, password, confirm) VALUES('$fname', '$lname', '$contact', '$email', '$password', '$confirm')";
        break;
}

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