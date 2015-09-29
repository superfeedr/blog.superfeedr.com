---
layout: post
title: "Subscribe to popular feeds"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
description: "The web has hundreds of millions of RSS feeds. Only a hadful of them is popular and Superfeedr lets you subscribe only to the most popular RSS feeds."
tags: [RSS, tracker, popularity, feed api, metadata]
js_includes: [
"https://raw.githubusercontent.com/remy/polyfills/master/EventSource.js",
'../scripts/server-sent-events-popular-feeds.js',
'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js',
'../scripts/popular-feeds-charts.js'
]
---

Our tracking feeds are very powerful: not only they let you subscribe to keywords and boolean expressions, but they also let you subscribe by filtering on meta-data. 

As [you know](http://blog.superfeedr.com/feed-popularity/), each feed processed by superfeedr has a **popularity rank**, combining several signals. Using this, our tracking feeds can be used to subscribe to the most peopular feeds. It's fairly simple: 

1. Build a track feed with this query: <code>/?query=popularity>5</code>
2. Test it by using our [search API](http://documentation.superfeedr.com/trackers.html#testing).
3. Subscribe to the track feed.
4. After this, your endpoint will receive each entry from all the feed which match your query. 

#### Example

Here's lthe stream of stories published by sources with a popularity rank greater than 5, in english only (<code>query=popularity>6</code>). We use [Server Sent Events](/server-sent-events/) to stream the new items to this page as they arrive.

<ul id="sse-feed">Loading...</ul>

Of course, this tracking feed can be subscribed to via [XMPP](http://documentation.superfeedr.com/subscribers.html#xmpp-pubsub), [PubSubHubbub](http://documentation.superfeedr.com/subscribers.html#webhooks) or our [HTTP streaming API](http://documentation.superfeedr.com/subscribers.html#streaming-rss).

### Distribution of content published by popular feeds

When we introduced our popularity ranking, people asked what was the ranks distribution for the feeds. The distribution is **exponential**: there are orders of magnitude less feeds with popularity P than with popularity P-1. The graph below shows the distribution (percentage of total feeds) for feeds with a popularity greater than 1. (we removed anything below because it acconts for 85% of feeds!)

<canvas id="feed-distribution" width="700" height="300"></canvas>

Each of these feeds obviously have a different [velocity](http://documentation.superfeedr.com/schema.html#velocity), which means that the distribution of published items by popularity of their feed is slightly different. Here, stories published by feeds with a popularity smaller than 1 account got 97.1% of stories, so we decided to skip it in the graph below as well.

<canvas id="entry-distribution" width="700" height="300"></canvas>

As you can see, below a popularity of 5, the order of magnitude of stories published is similar. This means that feeds with a popularity of 1, 3, 4 and 5 are each more a lot more verbose than feeds with lower velocities. This is not surprising as this represents feeds from forums, verbose blogs (with multiple authors) or 2nd-tier news sites which tend to publish a lot more than less popular individual blogs for example.

After 5, though, the number of stories drops sharply as there are so few very popular feeds.
