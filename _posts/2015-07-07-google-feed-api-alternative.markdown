---
title: "A Google Feed API alternative"
description: "The Google Feed API bas been deprecated. Replace it with Superfeedr."
tags: [RSS, feed api, Google, shim, javascript]
---

> **[UPDATE]**: Google has now started to return errors when using their *feed API*. If you've reached this place when looking for a replacement, please, read this other article to help you [get started with Superfeedr](/google-feeds-api-welcome/).


The [Google Feed API](https://developers.google.com/feed/v1/devguide) is one of the most **popular feed APIs**. It lets you download any public Atom, RSS, or Media RSS feed using only Javascript:

> With the Feed API, you can download any public Atom, RSS, or Media RSS feed using only JavaScript, so you can mash up feeds with your content and other APIs with just a few lines of JavaScript. This makes it easy to quickly integrate feeds on your website.

<img src="/images/google-feed-api.png" style="width:200px; float: left; margin-right: 10px"> It turns out that **Google has deprecated their Feed API**, which means that it's probably unsafe to use for any new projects. Luckily **Superfeedr's Feed API** is a very good alternative and our API offers the same capabilities so it's quite easy to move from the Google Feed API to Superfeedr's.

### The "Hello World" of Feed

If you want to use Superfeedr's API, you need to create a (free) [subscriber account](https://superfeedr.com/subscriber/). You also need to *subscribe* to the feed(s) you want to retrieve using Superfeedr's management interface, as well as create an authentication token.

All of this should not take more than a couple minutes and you're ready to start implementing: the most notable differences with [Google's code](https://developers.google.com/feed/v1/devguide#hiworld) is that we use an extra `auth` method which takes both a subscriber login and a token.

{% prism markup %}
<html>
  <head>
    <script type="text/javascript" src="./superfeedr.js"></script>
    <script type="text/javascript">
    function initialize() {
      var feed = new superfeedr.Feed("http://blog.superfeedr.com/atom.xml");
      feed.load(function(result) {
        if (!result.error) {
          console.log(result)
          var container = document.getElementById("feed");
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(entry.title));
            container.appendChild(div);
          }
        }
      });
    }
    superfeedr.auth('superfeedr', 'c77d4103dfe9fe2f32b19b9b4653c09b');
    superfeedr.setOnLoadCallback(initialize);
    </script>
  </head>
  <body>
    <div id="feed"></div>
  </body>
</html>
{% endprism %}

Want to make sure it's running? [check it here](/feed-api/hello-world.html).

### Going further

The code above uses the [`superfeedr.js`](/feed-api/superfeedr.js) shim which **maps the Superfeedr API into the Google Feed API**. It's the very first step if you want to port an existing application from Google to Superfeedr. However, the [Superfeedr API for subscribers](http://documentation.superfeedr.com/subscribers.html) is a lot richer and you can easily benefit from a [better schema](http://documentation.superfeedr.com/schema.html) (with [more](/feed-popularity/) [metadata](/more-metadata/)!).

The Superfeedr API is quite simple and we have wrappers for [Jquery](http://plugins.jquery.com/superfeedr/), [Angular](http://blog.superfeedr.com/angularjs-superfeedr/), [React](https://github.com/superfeedr/readernews) and more! You want also want to benefit from our streaming capabilities using [Server Sent Events](/server-sent-events/).

Superfeedr is a very powerful **Google Feed alternative**!
