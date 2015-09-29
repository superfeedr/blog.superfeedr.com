---
layout: post
title: "Server Sent Events"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: [
"https://raw.githubusercontent.com/remy/polyfills/master/EventSource.js"
]
tags: [openweb, html5, server-sent-events, eventsource, stream]
---
<script src="../scripts/server-sent-events.js" >
</script>

[Server Sent Events](http://www.w3.org/TR/eventsource/) (also called EventSource) are clearly one of the *unsung heros* of the **HTML5** specs for the **realtime web**. It's a very simple and consice protocol to implement realtime applications which get data from the server. In practice, it's a long-lived HTTP socket, which means that it goes thru firewall and proxies pretty well and does not require a lot of learning.

As of today, Superfeedr is able to deliver **RSS/Atom feed content via Server Sent Events**. This means that it's trivial to include any feed into any HTML page, and to self update the page's content when the feed is updated: no need for flash or proprietary javascript libraries!

### Retrieving items and getting new ones

The API is quite similar to our [streaming API](), introduced [last month](/stream-superfeedr/). Actually, the URL for the EventSource endpoint is exactly the one you would use to connect to our HTTP streaming. The browser will add the only bit that differentiates it from other requests: an <code>Accept</code> header with <code>text/event-stream</code>.

The list below is dynamically loaded using **Server Sent Events**. It loads the content from [this feed](http://push-pub.appspot.com/feed), to which you can easily add content via [this interface](http://push-pub.appspot.com/). Just enter a new messaage there and wait a few seconds for it to show up right below, without reloading this page! *This probably won't work if you're reading this from a feed reader...*

<ul id="sse-feed">Loading...</ul>

The code is rather simple:
{% prism javascript%}// First, we create the event source object, using the right URL.
var url = "https://stream.superfeedr.com/?";
url += "&hub.mode=retrieve";
url += "&hub.topic=http%3A%2F%2Fpush-pub.appspot.com%2Ffeed";
url += "&authorization=anVsaWVuOjJkNTVjNDhjMDY5MmIzZWFkMjA4NDFiMGViZDVlYzM5";

var source = new EventSource(url);

// When the socket has been open, let's cleanup the UI.
source.onopen = function () {
  var node = document.getElementById('sse-feed');
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

// Superfeedr will trigger 'notification' events, which corresponds
// exactly to the data sent to your subscription endpoint 
// (webhook or XMPP JID), with a JSON payload by default.
source.addEventListener("notification", function(e) {
  var notification = JSON.parse(e.data);
  notification.items.sort(function(x, y) {
    return x.published - y.published;
  });
  notification.items.forEach(function(i) {
    var node = document.getElementById('sse-feed');
    var item = document.createElement("li");
    var t = document.createTextNode([new Date(i.published * 1000), i.title, i.content].join(' '));
    item.appendChild(t);
    node.insertBefore(item, node.firstChild);
    // We add the element to the UI.
  });
});
{% endprism%}

The browser will take care of the HTTP connection, reconnect to the server if needed. 

### Caveats!

There are 2 things to remember when using Superfeedr's server sent events: IE and authentication.

Even though the EventSource spec has been published a couple years ago and [every other major browser supports it](http://caniuse.com/#feat=eventsource), **Internet Explorer lacks support**. There are, however existing shims which mimick this API on the browser side. This page, for example, includes [Remy Sharp's](https://github.com/remy/polyfills/blob/master/EventSource.js) so you can view the example, even with IE!

Another caveat is that as far as we know, you cannot change the HTTP headers when using EventSource, which means you have to submit an <code>authorization</code> **query string param** with the value that you would have inserted using HTTP Basic Auth: a base64 encoded concatenation of your superfeedr login and a token which allows for the *retrieve* right.

Read more about Server Sent Events:

* [On HTML5Rocks](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
* [MDN's article](https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events)




