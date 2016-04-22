<?php
//get the q parameter from URL
$q=$_GET["q"];

//find out which feed was selected
if($q=="Google") {
  $xml=("https://www.youtube.com/feeds/videos.xml?channel_id=UCNtaDbQvj2i-6KN1araC3Hg");
} else if($q=="dublinWeather") {
  $xml=("http://www.rssweather.com/wx/ie/dublin/rss.php");
}
else if($q=="Android") {
  $xml=("http://feeds.feedburner.com/techcrunch/android?format=xml");
}

if($q=="dublin") {
  $xml=("http://www.rte.ie/news/rss/news-headlines.xml");
} 
if($q=="sport") {
  $xml=("http://www.rte.ie/rss/soccer.xml");
} 
//not 3 day, but best one i could find
//france - marseille http://www.rssweather.com/wx/fr/marseille/wx.php
//italy - http://www.rssweather.com/wx/it/milano/wx.php 

$xmlDoc = new DOMDocument();
$xmlDoc->load($xml);

//get elements from "<channel>"
$channel=$xmlDoc->getElementsByTagName('channel')->item(0);
$channel_title = $channel->getElementsByTagName('title')
->item(0)->childNodes->item(0)->nodeValue;
$channel_link = $channel->getElementsByTagName('link')
->item(0)->childNodes->item(0)->nodeValue;
$channel_desc = $channel->getElementsByTagName('description')
->item(0)->childNodes->item(0)->nodeValue;

//output elements from "<channel>"
print("<p><a href='" . $channel_link
  . "'>" . $channel_title . "</a>");
print("<br>");
if(!($q=="dublinWeather")) print($channel_desc . "</p><br>"); //don't print this if using dublin weather, too much of a description

//get and output "<item>" elements
$x=$xmlDoc->getElementsByTagName('item');
for ($i=0; $i<=5; $i++) {
  $item_title=$x->item($i)->getElementsByTagName('title')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_link=$x->item($i)->getElementsByTagName('link')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_desc=$x->item($i)->getElementsByTagName('description')
  ->item(0)->childNodes->item(0)->nodeValue;
  //get image if its the breaking news
  if($q=="dublin")
  {
	  $item_img=$x->item($i)->getElementsByTagName('enclosure')->item(0)->getAttribute('url'); //Referenece -> http://www.w3schools.com/php/php_xml_simplexml_get.asp // the url is an attribute of the enclosure tag
  }
  //print ("img src=". $item_img);
  if($q=="dublin"){
	 print ("<p><img src=". $item_img." height='81' width='144'><br>"); 
	   print ("<a href='" . $item_link
	  . "'>" . $item_title . "</a>");
	  print ("<br>");
	  print ($item_desc . "</p><hr>");
  }
  else{
	  //if cloudy but not windy
	  if(strpos($item_desc, 'cloud') && !strpos($item_desc, 'wind'))  //Referenece -> http://php.net/manual/en/function.strpos.php
	  {
		  print('<img src=img/cloud.png height=50 width=50> ');
	  }
	  //if windy but not cloudy
	  else if(strpos($item_desc, 'wind') && !strpos($item_desc, 'cloud'))  //Referenece -> http://php.net/manual/en/function.strpos.php
	  {
		  print('<img src=img/wind.png height=50 width=50> ');
	  }
	  //if windy and cloudy
	  else if(strpos($item_desc, 'wind') && strpos($item_desc, 'cloud'))  //Referenece -> http://php.net/manual/en/function.strpos.php
	  {
		  print('<img src=img/windcloud.png height=50 width=50> ');
	  }
	  if(strpos($item_desc, 'rain'))
	  {
		  print('<img src=img/rain.jpg height=50 width=50> ');
	  }
	  print ("<p><a href='" . $item_link
	  . "'>" . $item_title . "</a>");
	  print ("<br>");
	  print ($item_desc . "</p><hr>");
  }
  
  
}
?> 