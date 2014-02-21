<?php
header("Content-Type:text/xml");


mysql_connect("localhost","root","");
mysql_select_db("classicmodels");

$q = mysql_query("SELECT * from customers");

$node = "<employees>";

while($row = mysql_fetch_object($q)){
$node .= "<employee>";
$node .= "<id>".$row->customerNumber."</id>";
$node .= "<title>".$row->phone."</title>";
$node .= "<desc>".$row->country."</desc>";
$node .= "</employee>";		
}

$node .= "</employees>";

echo $node;
?>