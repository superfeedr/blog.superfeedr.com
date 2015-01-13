
// First, we create the event source object, using the right URL.
var url = "https://stream.superfeedr.com/?count=5&hub.mode=retrieve&hub.topic=http%3A%2F%2Fpush-pub.appspot.com%2Ffeed&authorization=anVsaWVuOjJkNTVjNDhjMDY5MmIzZWFkMjA4NDFiMGViZDVlYzM5";
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
  notification.items.sort(function(x, y) {
  	return x.published - y.published;
  });
  notification.items.forEach(function(i) {
		var node = document.getElementById('sse-feed');
  	var item =document.createElement("li");
  	var txt = document.createTextNode([new Date(i.published * 1000), i.title, i.content].join(' '));
  	item.appendChild(txt);
  	node.insertBefore(item, node.firstChild);
  });
  // We add the element to the UI.
});