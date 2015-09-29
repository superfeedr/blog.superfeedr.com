---
layout: post
title: "A new PubSubHubbub endpoint"
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
tags: [http, feed api, backend]
---

We've been a bit silent in the past couple months here at Superfeedr.It's because we've been working on a complete rewrite of our [PubSubHubbub endpoint](http://push.superfeedr.com/).

### Before

Up until now, our PubSubHubbub endpoint was part of our main frontend **Rails** app. 4 years ago, Rails was still the most advanced framework to build web applications. This frontend would then interract directly with the *database* (adding feeds, subscriptions) and put messages in a *queue* (pings) for the backend to process.

Almost, 2 years ago, [we rewrote our backend using Node.js](http://blog.superfeedr.com/node-superfeedr/) and since we've been neglicted the frontend because often times it would mean replicating some of the logic between the 2 apps.

### After

Each of our 80 backend server is now a full blown web server (using [Express.js](http://expressjs.com/)) and they're all directly listening to the subscription requests for both our hosted hubs and our default hub. Luckily (and quite timely), Linode introduced last week [SSL load balancing ](https://blog.linode.com/2013/11/07/nodebalancer-ssl/), so we use them to do the load balancing.

### What does it change?

If you're a [Superfeedr subscriber](http://superfeedr.com/subscriber), it does not change much on the short term. The new endpoint's capabilities [strictly map the previous one](http://documentation.superfeedr.com/subscribers.html#webhooks) and we will keep the previous endpoint up for a couple more months. However, in the coming days and weeks we will introduce new features which are *only* available thru the new endpoint. We will also monitor our logs closely to make sure everyone has been moved to the new endpoint before we retire it!

If you're a [Superfeedr publisher](http://superfeedr.com/publisher), your hub might have already been moved to the new endpoint has it was just a *DNS change*. It's all completely transparent to you and your subscribers. (Some higher traffif hubs still need to be moved).



