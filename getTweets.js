$(document).ready(function(){
 var url =
 "http://api.twitter.com/1/statuses/" +
 "user_timeline.json?" +
 "screen_name=microsoft&count=5" +
 "&include_rts=1&callback=?";
 var tweet = "";
 $.getJSON(url, function(data) {
 $.each(data, function(i,item) {
 tweet += item.text + "<br><br>";
 });
 $("#twitter").html(
 "<h3>Microsoft&rsquo;s Twitter Feed</h3>").append(
 tweet);
 });
});
