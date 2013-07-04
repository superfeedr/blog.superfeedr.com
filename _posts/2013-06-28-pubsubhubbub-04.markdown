---
layout: post
title: "PubSubHubbub v0.4"
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
---

It's been brewing for almost 2 years now, but it's finally here. Superfeedr now supports the [version 0.4 of the PubSubHubbub](https://superfeedr-misc.s3.amazonaws.com/pubsubhubbub-core-0.4.html) spec. We're also proud to say that Superfeedr has taken the lead on the PubSubHubbub spec. We now also offer a [complete compliance test suite](http://tests.superfeedr.com/) for anyone who wants to implement a hub on their end:

> Code > Spec!

Of course, all the **Superfeedr hosted hubs are compatible** with both 0.3 and 0.4 versions of the spec. [Get yours now!](http://superfeedr.com/publisher)

## What's new

We've learnt a lot from running hubs all these years. There are at least 3 things that people wanted to see happenining:

* **Arbitrary contents**: PubSubHubbub is a HTTP based delivery mechanism and should not interfere with the data itself. That's now  the case. The new version of the spec makes an extensive use of *HTTP and its headers* and does not assume anything about the content itself anymore. JSON, Vcards, Sitemaps... they're all welcome now :)

* **Simplification**: PubSubHubbub is based on webhooks, but to ensure security and trust in the delivery, it comes with a couple extra mechanisms: including a *dialback*, as well as *signatures*. These are non trivial but the new spec is now much clearer by being a bit stricter and removing optional parameters.

* **Protected Content**: PubsubHubbub makes a lot of sense in the *social web* context. With that in mind, it is important to allow for a transparent mechanism where the publishers gets to approve or deny subscriptions to a certain topic from certain subscribers. This is now also baked in the protocol.

## What's breaking

Unfortunately, some of these changes are partially breaking. However , most hub implementations, like [Superfeedr's](http://pubsubhubbub.superfeedr.com/) will support both transparently.

For example, if your subscriber relied on auto-refresh, you will probably have to update it to make sure you handle re-subscribing to expired content. The rationale behind is that that we found that hubs could not do garbage collection easily.

## What's next

One of the key next steps is to get a wider adoption of the protocol, with, hopefully a merge with existing PubSubHubbub-like implementations, like [Facebook](https://developers.facebook.com/docs/reference/api/realtime/)'s or [Github](http://developer.github.com/v3/repos/hooks/#pubsubhubbub)'s.

It is also time to slowly move the *governance* around the PubSubHubbub spec toward a web standard's body. Google is going to support 0.4 with their hub too, but it's now obvious that this protocol goes far beyond Google and should not be tied too much to it.

For those interested in contributing, we believe the best place at this point it the [PubSubHubbub spec repository](https://github.com/pubsubhubbub/PubSubHubbub).





