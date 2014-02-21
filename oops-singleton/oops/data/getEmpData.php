<?php

mysql_connect("localhost","root","");
mysql_select_db("classicmodels");

$empid = $_POST['empid'];

$q = mysql_query("SELECT * from employees WHERE employeeNumber='$empid'");



$row = mysql_fetch_object($q);
	
	
	$str = '{"id":"'.$row->employeeNumber.'","title":"'.$row->jobTitle.'","text":"'.$row->email.'"}';



echo $str;
?>