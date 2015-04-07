/*
curl -G 'https://stream.superfeedr.com?authorization=dHJhY2tlcjoyMjgyYzRjNzFmNjU3Mjk2NjUzOTkwNjRkNzRlMDhmYg==&wait=stream&hub.mode=retrieve&hub.topic=http%3A%2F%2Ftrack.superfeedr.com%2F%3Fquery%3Dmusic&format=json' -D-
*/

// First, we create the event source object, using the right URL.
var url = "https://stream.superfeedr.com/?authorization=dHJhY2tlcjoyMjgyYzRjNzFmNjU3Mjk2NjUzOTkwNjRkNzRlMDhmYg==&count=5&hub.mode=retrieve&hub.topic=http%3A%2F%2Ftrack.superfeedr.com%2F%3Fquery%3Dmusic";
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
  	var txt = document.createTextNode(i.title);
  	item.appendChild(txt);
  	node.insertBefore(item, node.firstChild);
    if(node.childNodes.length > 10)
      node.removeChild(node.lastChild);
  });
});