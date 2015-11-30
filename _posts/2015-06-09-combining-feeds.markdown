---
layout: post
title: "Combining Feeds"
js_includes: []
description: "Combining RSS feeds is one of the most basic use case and provides a great way to aggregate content from several websites on a single page. Here's a quick tutorial on how to combine feeds with Superfeedr."
tags: [API, react, javascript, jquery]
---

RSS feeds are very powerful when it comes to aggregation and syndication. One of the main advantages of using a **single format** is that it becomes very simple to **aggregate and combine** several of them. 

Let's say we have identified 3 RSS feeds which we want to combine in a single feed and later display that combined feed on this page. The three feeds are [this blog's feed](https://superfeedr-blog-feed.herokuapp.com/), our [Tumblr feed](http://superfeedr.tumblr.com/rss) (where we post RSS and open web related news) and our [documentation's commit log](https://github.com/superfeedr/documentation/commits/master.atom).

### Subscribing

Even though our application will be executed in the browser, we need to make sure Superfeedr knows about these feeds and knows that we want to **aggregate** them. Let's first [create a subscriber account](https://superfeedr.com/subscriber/). Once the account has been created and confirmed (by email), we can [log into Superfeedr](http://superfeedr.com/login) and click on "Manage Susbcriptions".

<img src="/images/combining-feeds/manage-subscriptions.png">

This page now lets us easily **list, add or remove feeds** (subscriptions). Since we have not subscribed to any feed yet, that list is empty. Click on the "New Subscription" button in the lower right corner. A modal opens and shows options when subscribing to a feed. 

* The `hub.topic` field is for the feed URL
* The `format` field lets us pick between `JSON` or `Atom`. (we can pick either here because this only applies to *notifications*)
* The 3rd item can be confusing. Since our browser side application will just pull the data from Superfeedr, we don't need Superfeedr to push the data anywhere[^1] so we'll just put `https://push.superfeedr.com/dev/null` which is Superfeedr's [Null Device](https://en.wikipedia.org/wiki/Null_device). 
* We can leave the `secret` empty.

<img src="/images/combining-feeds/new-subscription.png">

Once we clicked on *Create*, the modal should close and we should see the new subscription appear in the list of subscription. Rinse and repeat to add other feeds.

### Retrieving the combined feed

Superfeedr's API lets us [retrieve each feed](http://documentation.superfeedr.com/subscribers.html#retrieving-entries-with-pubsubhubbub) individually, using its url (as `hub.topic`) or several feeds matching the same criteria, using the `hub.callback` parameter. Here, we'll use the latter.

However, before that, we need to create a token to authenticate our API call. In our Superfeedr dashboard, click on *[Authentication tokens](https://superfeedr.com/tokens/new)*. Pick a token name (be creative!) and select **only** the `retrieve` capability. This is important, because this token will be visibile to anyone who looks at the source code of the HTML page and we don't want them to use the token to add new subscriptions. Once created, click on its name and copy the value from the modal.

<img src="/images/combining-feeds/token-value.png">

Let's now build the API request using [Superfeedr's PubSubHubbub Console](http://superfeedr.com/push_console). From the Dashboard, we click on *Debug PuSH API requests*. This console let's us build and execute API requests. This is very convenient to get started. Let's fill the field:

* Step 1 let's select the token we've just created in the first field
* Step 2 asks to pick a `hub.mode`. We use `retrieve`.
* Step 3 lets us set the parameters:
	* We leave `hub.topic` empty because we want to retrieve multiple subscriptions using their callback.
	* Let's leave `count` to `5` items.
	* Select `Atom` for the `format` of the combined feed.
	* And put `https://push.superfeedr.com/dev/null` in the `hub.callback` field.
	* Leave all other fields unchanged <small>(we removed them from the screenshot below for clarity).</small>

<img src="/images/combining-feeds/push-console.png">

You can visualize the full request, and click on `Send Request` to execute it from this console. You can also copy it to the clipboard if we'd like to run it in our Terminal application, rather than this javascription application. Since this is a `GET` request, we can also open the request in a new tab of the browser to see exactly what the feed looks like. (feel free to reuse this URL in any kind of feed reader!). For our specific example, [this is the combined feed](https://push.superfeedr.com/?hub.mode=retrieve&count=20&format=atom&hub.callback=https%3A%2F%2Fpush.superfeedr.com%2Fdev%2Fnull&authorization=c3VwZXJmZWVkcjpjNzU1ZjMyYjkzZmQ1MGM3NTQyZTIwNzYxOWJjMmI4NQ%3D%3D&).

### Displaying the feed in the browser

We now have a *combined*, *aggregated* feed. Let's display it in the browser. We won't be using any framework here, but feel free to check how superfeedr works with [Jquery](http://blog.superfeedr.com/jquery-superfeedr/), [Angular](http://blog.superfeedr.com/angularjs-superfeedr/) or [React](http://blog.superfeedr.com/readers-news/) if you're using any of these in your application already.

We're string believer in the open web and when great open web protocols exist, we should use them. Here, [EventSource](/server-sent-events/) is appropriate. We need to build the EventSource url:

* We use the `stream.superfeedr.com` domain
* we encode the `hub.callback` query string
* we create an `authorization` query string parameter which is just a `base64` encoded version of the `login:token` string. (you can also copy it from the URL when opening the combined feed in a new tab).

Here's a code sample:

{% prism javascript%}

// First, we create the event source object, using the right URL.
var url = "https://stream.superfeedr.com/?";
url += "&hub.mode=retrieve";
url += "&hub.callback=https%3A%2F%2Fpush.superfeedr.com%2Fdev%2Fnull";
url += "&authorization=c3VwZXJmZWVkcjpjNzU1ZjMyYjkzZmQ1MGM3NTQyZTIwNzYxOWJjMmI4NQ%3D%3D&";

{% endprism %}

We can then create the `EventSource` object:

{% prism javascript%}

var source = new EventSource(url);

// When the socket has been open, let's cleanup the UI.
source.onopen = function () {
  var node = document.getElementById('combined-feed');
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

// Superfeedr will trigger 'notification' events, for each entry in the feed
// We can just create a new DOM element for each item in in the combined feed.
// And add it to the UI
source.addEventListener("notification", function(e) {
  var notification = JSON.parse(e.data);

  notification.items.forEach(function(i) {
    var li = document.createElement("li");
    li.innerHTML = '<a href="' + i.permalinkUrl + '"">' + i.title + '</a>';
    var node = document.getElementById('combined-feed');
    node.insertBefore(li, node.firstChild);
  });
});

{% endprism%}

And here is the final result (it should also update in realtime, without refreshing the page if an item is added to any of the feeds):

<div id="combined-feed">Loading...</div>


[^1]: If we wanted Superfeed to ping a server side application (like a Ruby on Rails application or a Wordpress blog... or anything really, we'd put that application URL in there).

<script>
var url = "https://stream.superfeedr.com/?";
url += "&hub.mode=retrieve";
url += "&hub.callback=https%3A%2F%2Fpush.superfeedr.com%2Fdev%2Fnull";
url += "&authorization=c3VwZXJmZWVkcjpjNzU1ZjMyYjkzZmQ1MGM3NTQyZTIwNzYxOWJjMmI4NQ%3D%3D&";


var source = new EventSource(url);

source.onopen = function () {
  var node = document.getElementById('combined-feed');
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

source.addEventListener("notification", function(e) {
  var notification = JSON.parse(e.data);

  notification.items.forEach(function(i) {
    var li = document.createElement("li");
    li.innerHTML = '<a href="' + i.permalinkUrl + '"">' + i.title + '</a>';
    var node = document.getElementById('combined-feed');
    node.insertBefore(li, node.firstChild);
  });
});

</script>



