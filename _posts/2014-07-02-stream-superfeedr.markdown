---
layout: post
title: "RSS streaming"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: ["https://www.embedcurl.com/embedcurl.min.js"]
---

In the last year, we focused a lot on storing data from the feeds inside Superfeedr. We started by storing a lot of Google Reader content, [using our Riak backend](http://blog.superfeedr.com/google-reader-api-riak/). When introducing our [new PubSubHubbub endpoint](http://blog.superfeedr.com/push-endpoint/), we had the opportunity to add things like [subscribe and retrieve](http://blog.superfeedr.com/subscribe-retrieve/) and later, params like [before and after](http://blog.superfeedr.com/retrieve-before-after/). 

We also introduced a [Jquery plugin for Superfeedr](http://blog.superfeedr.com/jquery-superfeedr/) which made it extremely easy to add any **RSS feed to any web page**.

### Streaming RSS

Today, we're moving forward by adding **HTTP streaming** support to the RSS stored in Superfeedr. In English, this mean, you can ask Superfeedr something like this:

> Please, give me the last 5 items from that feed, but keep the connection open and give me any new item that's coming for as long as I'm listening.

Translating in curl language that would be something like that:

<pre class="embedcurl" width="800">curl "http://stream.superfeedr.com/?hub.mode=retrieve&wait=stream&hub.topic=http://push-pub.appspot.com/feed" 
-udemo:6f74cbf1c5d30fd0c668f2ac0592204c</pre>

<small>You're more than welcome to try that in your shell</small>

You'll see that the connection is then *hanging*. You can easily [update the feed by filling this form](http://push-pub.appspot.com/) and you should see the *new entry appear* in your shell.

You can also get all this [RSS/Atom converted to JSON](http://documentation.superfeedr.com/schema.html#json) by adding <code>-H'Accept: application/json'</code>.

### Fanout

Of course building and maintaining an infrastructure to handle this kind of *traffic and concurrent connections* is far from trivial. In the same way that we would not write from scratch our very own database to store the content we process, it made sense to find a existing infrastructure and rely on their expertise to achieve that.

We picked [Fanout](https://fanout.io/) because they provide a completely transparent approach by allowing us to use our very own CNAME's and proxy calls made to our API. 

The first step is to setup a sub domain and point it to Fanout's servers. *Fanout will proxy any call* to our backend that it can't handle. If your request to `stream.superfeedr.com` includes a `wait=stream` param, then, Fanout will proxy the request to Superfeedr's main backend. We will serve the data to be returned to the client, as well as a [GRIP](http://blog.fanout.io/2013/02/10/http-grip-proxy-hold-technique/). Fanout will serve the data, but keep the connection open.

Later, when the feed updates, we will notify Fanout and they will just serve the content to any existing connection, in a completely *transparent* way.

### Long polling

One of the benefits of using Fanout is that they provide multiple options when [building a Realtime API](https://fanout.io/docs/devguide.html#building-a-realtime-api). **HTTP streaming** really works extremely well when used from a HTTP client, but browsers are not always great to deal with streams. In the browser, an option is to look at our <code>wait=poll</code> option, combined with the <code>after</code> parameter.

Basically, the first request will look like this:

<pre class="embedcurl" width="800">curl -udemo:6f74cbf1c5d30fd0c668f2ac0592204c "https://stream.superfeedr.com?hub.mode=retrieve&wait=stream&hub.topic=http%3A%2F%2Fpush-pub.appspot.com%2Ffeed"</pre>

The response will come immediately with the current content of the feed. From there, you should extract the <code>id</code> element of the latest entry. At the time of writing this post, it is <code>http://push-pub.appspot.com/feed/5637036128075776</code>. We will re-use this element as the value for the <code>after</code> query parameter:

<pre class="embedcurl" width="800">curl -udemo:6f74cbf1c5d30fd0c668f2ac0592204c "https://stream.superfeedr.com?format=json&hub.mode=retrieve&wait=poll&after=hhttp%3A%2F%2Fpush-pub.appspot.com%2Ffeed%2F5637036128075776&hub.topic=http%3A%2F%2Fpush-pub.appspot.com%2Ffeed"</pre>

If one (or more) new entry has been added during the small lag between the 2 queries, it will be served right away. However, in the more likely event that nothing was served, the connection will wait for a new item to be added to the feed. This technique will **guarantee that no item is ever missed**, even with a single concurrent HTTP request.




