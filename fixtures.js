
$(document).ready(function () {

    loadDoc();
	showRSS("dublin");//automatically show breaking news first
	getTwitter(); //display twitter feed by default also

	$("#blogSelect").on('change', function () {	
			$str = $("#blogSelect").val();
			
			if($str == "twitter")
			{
				getTwitter();
			}
			if($str == "youtube")
			{
				getYoutube();
			}
    });
	
	//get tweets from the twitter json file *** not a live twitter feed (stored json file)
	function getTwitter()
	{
		/*Reference this?*/
		$.getJSON('twitter.json', function(data) {
			$output="";
			$(data.tweets).each(function (i) {
				console.log("In twitter");
				$output+="<div style='display: inline'> <img src='img/twitter.png' height='42' width='42'> </div><div style='display: inline'>";
				$output+="<b> "+data.tweets[i].name+"</b>";
				$output+="<img src='img/verified.jpg' height='20' width='20'>";
				$output+="<font color='#b3b3b3'>"+data.tweets[i].user+"</font><br>"; //#D3D3D3
				$output+=data.tweets[i].text+"<br>";
				$output+=data.tweets[i].url+"<br>";
				$date = new Date(data.tweets[i].date * 1000);
				$dateString = $date.getDate() + "/" +$date.getMonth() + "/" +$date.getFullYear() + " at "+$date.getHours()+":"+$date.getMinutes()+"0:"+$date.getSeconds();
				$output+="<i>"+$dateString+"</i></div><hr>";
			});
			$("#blogOutput").html($output);
			
		  });
	}
	//get tweets from the twitter json file *** not a live twitter feed (stored json file)
	function getYoutube()
	{
		/*Reference this?*/
		$.getJSON('youtube.json', function(data) {
			$output="";
			$(data.items).each(function (i) {
				console.log("In youtube");
				$output+="<h4>"+data.items[i].snippet.title+"</h4>";
				$output+="<div style='display: inline'> <a href='"+data.items[i].snippet.url+"'><img src='"+data.items[i].snippet.thumbnails.medium.url+"' height='180' width='320'></a> </div><div>";
				$output+="<font color='#595959'>" +data.items[i].snippet.description+"<br>";
				
				$date = data.items[i].snippet.publishedAt;//get date
				$stringDate = $date.split("T", 1);//cut it down to just the date eg "20/10/2016"
				
				$output+="Published at: " +$stringDate+" - ";
				$output+=data.items[i].statistics.viewCount+ " views </div><hr>";
			});
			$("#blogOutput").html($output);
			//<a href="http://www.w3schools.com"><img border="0" alt="W3Schools" src="logo_w3s.gif" width="100" height="100"</a>
		  });
	}

	/*
	var tweet = "";
		 $.getJSON("twitter.json", function(result){
			$.each(data, function(i, field){
				$("#twitter").append(field + "<br>" +data.tweets[0].text);
			});
		});
		*/
		
	$("#rssSelect").on('change', function () {	
			$str = $("#rssSelect").val();
			showRSS($str);
    });
	$("#weatherSelect").on('change', function () {	
			$str = $("#weatherSelect").val();
			showRSS($str);
    });
	//display the table with new query

	$("#select").val("all");//sets it to all
	$("#blogSelect").val("none");//sets it to "select feed"
	$("#weatherSelect").val("none");//sets it to "select feed"

	$( "#asc" ).change(function() {
		console.log( "Ascending Sort" );
	});
	$( "#dsc" ).change(function() {
		console.log( "Descending Sort" );
	});
	//change sorting arrow
	//check if arrow equals up/down when displaying the table
	$("#sortBtn").on('click', function () {	
		if($("#sortBtn").attr("src") == "img/up.png")
			$("#sortBtn").attr("src", "img/down.png");
		else
			$("#sortBtn").attr("src", "img/up.png");
    });	
	/*Reference this*/
	//displays the RSS feed on webpage
	function showRSS(str) {
		  if (str.length==0) {
			//document.getElementById("rssOutput").innerHTML="";
			$("#rssOutput").html("");
			return;
		  }
		  if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		  } 
		  else {  // code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		  xmlhttp.onreadystatechange=function() 
		  {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) 
			{
			  $("#rssOutput").html(xmlhttp.responseText);
			  $("#weatherOutput").html(xmlhttp.responseText);
			}
		  }
		  xmlhttp.open("GET","getrss.php?q="+str,true);
		  xmlhttp.send();
	}

	//Code to load xml file************** W3 schools...........
	/*Reference this*/	
	function loadDoc() {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				myFunction(xhttp);
			}
	   };
	  xhttp.open("GET", "fixtures.xml", true);
	  xhttp.send();
	}
	
function myFunction(xml) {
	//$index  = $("#select").prop("selectedIndex");
	var arr = [ "Ireland", "Sweden", "Italy", "Belgium" ];
	var i;
	var xmlDoc = xml.responseXML;
	var table="";
	var games = xmlDoc.getElementsByTagName("game"); 
	var gamesArray = [];

	
	// Loop through them and save their text content into an array
   for (i = 0; i <games.length; i++) 
	{
        gamesArray.push(games[i].firstChild.data);
    }
	for (i = 0; i <gamesArray.length; i++){
       console.log(gamesArray[i]);
    }
	
	//if all selected
	$country = $("#select").val();
	
	//get all dates
	var dates = []
	for (i = 0; i <games.length; i++) {
		//var date = games[i].getElementsByTagName("date")[0].childNodes[0].nodeValue; //get the date (eg. 2016-01-09)
		var date = Date.parse(games[i].getElementsByTagName("date")[0].childNodes[0].nodeValue)/1000; //convert it to unix
		dates[i] = date;//add the date to array
		//console.log(date);
	}
	
	//sort the array
	dates.sort(function(a, b){return b-a});//reverse order
	
	dates.sort(function(a,b){
     a = $(a).find("date").text();
     b = $(b).find("date").text();
     return (a.localeCompare(b));
    });
	
	/*Reference this*//*Reference this*//*Reference this*//*Reference this*/
	
	table = "";//set to empty each time
	for (i = 0; i <games.length; i++) {
		//$image = '<img src= ' +  games[i].getElementsByTagName('imageurl')[0].childNodes[0].nodeValue + ' >';
		table += "<tr><td>" +
		games[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
		"</td><td>" +
		'<img src= img/' +  games[i].getElementsByTagName('imagepath')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
		"</td><td><strong>" +
		games[i].getElementsByTagName("hometeam")[0].childNodes[0].nodeValue +
		"</td></strong><td>" +
		"v </td><td><strong>" +
		games[i].getElementsByTagName("awayteam")[0].childNodes[0].nodeValue +
		"</td></strong><td>" +
		'<img src= img/' +  games[i].getElementsByTagName('imagepath2')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
		"</td></tr>";
		
	}

	$("#demo").html(table);
	
	
	//get selected value of array
	$country = "";
	$('#select').on('change', function() {
	
		table = "";
		$country = $(this).val();
		//console.log($(this).val());
		
			//display table in reverse date order
			//************************************
			//******************************** on click
			if($("#sortBtn").attr("src") == "img/down.png")
			{
				table = "";//set to empty each time
				for (i=games.length - 1; i >= 0; i--) {
					 
					table += "<tr><td>" +
					games[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
					"</td><td>" +
					'<img src= img/' +  games[i].getElementsByTagName('imagepath')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
					"</td><td><strong>" +
					games[i].getElementsByTagName("hometeam")[0].childNodes[0].nodeValue +
					"</strong></td><td>" +
					"v </td><td><strong>" +
					games[i].getElementsByTagName("awayteam")[0].childNodes[0].nodeValue +
					"</strong></td><td>" +
					'<img src= img/' +  games[i].getElementsByTagName('imagepath2')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
					"</td></tr>";
					
				}
				$("#demo").html(table);
				console.log("all table")
			}
			
			if($country == "all")
			{
				table = "";//set to empty each time
				for (i = 0; i <games.length; i++) {
					
					table += "<tr><td>" +
					games[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
					"</td><td>" +
					'<img src= img/' +  games[i].getElementsByTagName('imagepath')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
					"</td><td><strong>" +
					games[i].getElementsByTagName("hometeam")[0].childNodes[0].nodeValue +
					"</strong></td><td>" +
					"v </td><td><strong>" +
					games[i].getElementsByTagName("awayteam")[0].childNodes[0].nodeValue +
					"</strong></td><td>" +
					'<img src= img/' +  games[i].getElementsByTagName('imagepath2')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
					"</td></tr>";
					
				}
				$("#demo").html(table);
				console.log("all table")
			}
			
			//************************
			//convert to unix timestamp
			//sort
			//$date = "2016-06-10"; 
			//console.log("date = " + $date);
			//Date.parse($date)/1000
			
			//sort through array (jquery)
			//Ref -  http://www.w3schools.com/jsref/jsref_sort.asp
			//points.sort(function(a, b){return a-b});
			//**********************************
			
			if($country != "all")
			{
				for (i = 0; i <games.length; i++) {
				if(games[i].getElementsByTagName("hometeam")[0].childNodes[0].nodeValue == $country || games[i].getElementsByTagName("awayteam")[0].childNodes[0].nodeValue == $country)
				{
					table += "<tr><td>" +
					games[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
					"</td><td>" +
					'<img src= img/' +  games[i].getElementsByTagName('imagepath')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
					"</td><td><strong>" +
					games[i].getElementsByTagName("hometeam")[0].childNodes[0].nodeValue +
					"</strong></td><td>" +
					"v </td><td><strong>" +
					games[i].getElementsByTagName("awayteam")[0].childNodes[0].nodeValue +
					"</strong></td><td>" +
					'<img src= img/' +  games[i].getElementsByTagName('imagepath2')[0].childNodes[0].nodeValue + ' height="50" width="60">' +
					"</td></tr>";
				}
				$("#demo").html(table);
				
				console.log(formatTime("1461260800"));
			}

			//document.getElementById("demo").innerHTML = table ;
			
			
		}
		
	
	});	
} 
//****reference: Slides - Gerard McCloskey - Murdoch
function formatTime(tweetDateTime) {

	var dateTimeString = tweetDateTime.substr(4, 7)+tweetDateTime.substr(26)+tweetDateTime.substr(10, 15);
	var tweetDate = new Date(tweetDateTime); 
	var tweetTime = tweetDate.getTime();
	var currentTime = new Date().getTime()
	var timeago = parseInt((currentTime-tweetTime) / 1000);

	if(timeago < (1*60)) 
		return "less than a minute ago";
	
	else if(timeago < (2*60)) 
		return "about a minute ago";
	
	else if(timeago < (45*60)) 
		return parseInt(timeago / 60).toString() +" minutes ago";
	
	else if(timeago < (90*60)) 
		return "about an hour ago";
	else if(timeago < (24*60*60)) 
		return "about " + (parseInt(timeago / 3600)).toString()+ " hours ago";
	
	else if(timeago < (48*60*60)) 
		return "1 day ago";
	
	else 
		return (parseInt(timeago / 86400)).toString() + " days ago";
}	
	
});