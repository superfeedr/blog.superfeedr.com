---
layout: post
title: "Unsubscribing without the hub.callback"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
tags: feed api, unsubscribe, pubsubhubbub
---


We love getting feedback from our customers on our API and improve that API to match their needs and comments.

Most recently, one of our new customers indicated that asking for both `hub.topic` and `hub.callback` was redundant when [removing a feed from their subscription](http://documentation.superfeedr.com/subscribers.html#removingfeedswithpubsubhubbub) list. This is true... if and only if the user has a single subscription to that topic. 

So, starting today, it is **optional** to submit the `hub.callback` when you unsubscribe from a feed, as long as you have a single subscription to that feed, obviously. 

Of course, this change is perfectly downward compatible and compatible with the [PubSubHubbub protocol](http://en.wikipedia.org/wiki/PubSubHubbub) as well if you use a library that implements it.

What else would *you* change in our API to make it easier to use?


