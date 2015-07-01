/*

curl -G http://track.superfeedr.com/?query=popularity%3A%3E5%20language%3Aen&format=json&authorization=dHJhY2tlcjphZjQ2ODkzODNhY2UxN2U2NGU0ZTNjMWRmNjYyMTNlOA==

http%3A%2F%2Ftrack.superfeedr.com%2F%3Fquery%3Dpopularity>5 language%3Den
*/


// First, we create the event source object, using the right URL.
//         https://push.superfeedr.com/?hub.mode=retrieve&hub.topic=http%3A%2F%2Ftrack.superfeedr.com%2F%3Fquery%3Dpopularity%253A%253E5%2520language%253Aen&count=5&format=json&authorization=dHJhY2tlcjphZjQ2ODkzODNhY2UxN2U2NGU0ZTNjMWRmNjYyMTNlOA==&
var url = "https://stream.superfeedr.com/?hub.mode=retrieve&hub.topic=http%3A%2F%2Ftrack.superfeedr.com%2F%3Fquery%3Dpopularity%253A%253E5%2520language%253Aen&count=5&format=json&authorization=dHJhY2tlcjphZjQ2ODkzODNhY2UxN2U2NGU0ZTNjMWRmNjYyMTNlOA==&";
var source = new EventSource(url);

// When the socket has been open, let's cleanup the UI.
source.onopen = function () {
	var node = document.getElementById('sse-feed');
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
};

// Dang, got an error. Log it.
source.onerror = function (error) {
  console.error(error);
};

// Superfeedr will trigger 'notification' events, which corresponds exactly to the data sent to your subscription endpoint (webhook or XMPP JID), with a JSON payload by default.
source.addEventListener("notification", function(e) {
  var notification = JSON.parse(e.data);

  notification.items.forEach(function(i) {
		var node = document.getElementById('sse-feed');
  	
    var item =document.createElement("li");
    var h = '<span>' + i.source.title + '</span> -- <a href="' + i.permalinkUrl + '">' + i.title + '</a>';

  	item.innerHTML = h;
  	node.insertBefore(item, node.firstChild);
    if(node.childNodes.length > 10)
      node.removeChild(node.lastChild);
  });
});