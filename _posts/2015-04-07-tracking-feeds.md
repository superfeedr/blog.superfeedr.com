---
layout: post
title: "Tracking Feeds"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: [
"https://raw.githubusercontent.com/remy/polyfills/master/EventSource.js",
'../scripts/server-sent-events-tracking.js'
]
tags: tracking, stream, trackers
---

We're incredibly excited to introduce a new type of user on Superfeedr today: [trackers](https://superfeedr.com/tracker).

As you probably know, [publishers](https://superfeedr.com/publisher) are applications, like [Medium](https://medium.com/) or [Etsy](https://www.etsy.com/), which decided to host their PubSubHubbub hub with Superfeedr. [Subscribers](https://superfeedr.com/subscriber), on the other end, are applications which consume our **feed API** to agregate feeds from accross the web (whether they use hubs that we host, or not).

> [Trackers](https://superfeedr.com/tracker) are applications, which, rather than subscribing to feeds, subscribe to search queries.

### Complex queries

Tracking feeds come with a rich set of performing queries. By default, you can search for keywords, then combine them (using `or` or `and`), but also exclude others using `-`. We also let you use options like `site:` and `link:` which yield content from a specific domain, or linking to another page.

For example, one might want to subscribe to a search query of their name and be the first to ever know about mentions of their name. Somebody else might be interested in knowing, in real-time as soon as somebody makes a `link:` or a *webmention* to their site. Finally, it can also be useful to subscribe to any content published from a given `site:`. All of this (and much more!) is possible using Superfeedr's tracking feeds.

### A single API

Rather than re-inventing the wheel, we decided to rely on feeds for each query. For example, [this feed](http://track.superfeedr.com/?query=superfeedr) is the feed with results for any story that mentions *superfeedr* (note that you can see entries in the feed only if you load with a tracking account credentials)!

From there, all of our subscriber API calls can be used:

* [Subscribing](http://documentation.superfeedr.com/subscribers.html#adding-feeds-with-pubsubhubbub)
* [Unsubscribing](http://documentation.superfeedr.com/subscribers.html#removing-feeds-with-pubsubhubbub)
* [Listing subscriptions](http://documentation.superfeedr.com/subscribers.html#listing-subscriptions-with-pubsubhubbub)
* [Retrieving past entries](http://documentation.superfeedr.com/subscribers.html#retrieving-entries-with-pubsubhubbub)

For example, here is, in realtime, a list of stories that mention "Music". 

<ul id="sse-feed">Loading...</ul>

### Pricing

We wanted the pricing for tracking feeds to be fair and simple. So we made it a combination of 2 things:

* the number of track feeds to which you're subscribed.
* the amount of data we're sending to your endpoints.

Everytime a tracker user susbcribes to a new tracking feed, we will charge them $2.00 (the invoice is the sent at the end of a 30 day period). Each tracking feed comes with **2,000 free monthly notifications**. If the number of notifications exceeds this, we will apply [our subscriber pricing](https://superfeedr.com/subscriber/pricing). Of course, if you subscribed to 2 feeds which consume respectively 2,500 and 1,000 notifications, you will only be charged $4.00 as the allowances add-up.


