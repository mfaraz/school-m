<?php
header("Content-Type:text/xml");

$d  = file_get_contents("http://ibnlive.in.com/ibnrss/top.xml");
echo $d;
?>