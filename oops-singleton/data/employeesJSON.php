<?php

mysql_connect("localhost","root","");
mysql_select_db("classicmodels");

$q = mysql_query("SELECT * from employees");


$str = '{"employees":[';

$arr = array();
while($row = mysql_fetch_object($q)){
	$str2 = '{"id":"'.$row->employeeNumber.'","title":"'.$row->firstName.'","text":"'.$row->jobTitle.'"}';
array_push($arr,$str2);
}

$str3 = implode(",",$arr);
$str .= $str3;

$str .= ']}';
echo $str;
?>