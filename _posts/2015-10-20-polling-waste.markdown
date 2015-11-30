---
title: "How wasteful is polling?"
description: "Polling is a very wasteful process. Even with relatively low frequencies (4 times per hour), we get a hit rate that's below 5%. Our unique feed graph lets us improve this drastically."
tags: [ping, polling, feed graph, stats]
---

Timeliness and latency are among the most crucial challenges to *increase engagement*. If you rely on polling to aggregate content or get your content distributed, you have to increase the polling frequency to make sure the content is always fresh. But how wasteful is this?

At [Superfeedr](http://superfeedr.com/), we poll feeds so that nobody else has to do it and we have 3 mechanisms which trigger a feed fetching:

* **External pings**: these are the pings we get from the [publishers](http://superfeedr.com/publisher/) which support **PuSH**, or from other hubs, as well as [RSSCloud](/rsscloud/api/pubsubhubbub/RSSCloud/) endpoints. It also includes things like [XML-RPC](/xml-rpc/ping/pubsubhubbub/xmpp/real-time/XMLRPC-Ping-to-PubSubHubbub/) pings and a bunch of other less frequent mechanisms.
* **Scheduled fetches**: For each feed, we keep track of the [next time it needs to be fetched](http://documentation.superfeedr.com/schema.html#status) if nothing else happened until then.
* **Self pings**: we maintain an internal **feed graph** which links feeds together so that when one updates, we are able to fetch other related feeds that might have been updated

For each of these mechanism, we are keeping track of a *hit rate*: the number of times we found at least one new entry divided by the number of times we tried to fetch the feed.

External pings get a hit rate of **58%**. There are a lot of cases in which we get pings for feeds which have not actually been updated... This includes feeds which have uncontrolled caching mechanisms, or even feeds for which we had *already* identified the new content. All in all, this is a pretty efficient mechanism and we try to convince publishers to [ping us](http://documentation.superfeedr.com/publishers.html#ping) when they can.

As expected, scheduled fetches have a low hit rate of barely 5%. This is obviously an area of concern for us when trying to save resources. This low number is the reason why we created our feed graph.

Self pings have a hit rate of 22%. In practice, we find roughly as many new entries through dumb polling than with our *self pings*, saving us a lot of resources: when **scheduled fetches requires 20 requests to find a new update, it takes less than 5 requests from our feed graph**.

The most important benefit of using Superfeedr as a subscriber means that you **never** have to poll a feed. **We push** the content so that **100% of your bandwidth is spent for fresh content**, instead of 5% if you rely on dumb polling.



