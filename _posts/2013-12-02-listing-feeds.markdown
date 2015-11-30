---
title: "Listing feeds with our PuSH endpoint"
tags: [feed api, list, subscription]
---

Releasing our [new API endpoint](/push-endpoint/) last month has already enabled us to release the oldest feature request: [subscribing and retrieving feeds in one single call](/subscribe-retrieve/). Today, we're introducing another long time requested feature: the ability to [list PubSubHubbub subscriptions](http://documentation.superfeedr.com/subscribers.html#listingfeedswithpubsubhubbub).

### Listing subscriptions per endpoint

It's considered good practice when using *PubSubHubbub* to use **different callback urls** for each susbcription performed. This way it's much easier to debug, load balance (consistently!) or even handle notifications faster.

Our new API call allows you to quickly retrieve the susbcription matching a given callback url. It also allows for the inclusion of a **wildcard** character <code>%</code> to retrieve all subscriptions matching a given callback url template.

For example, when construction callback urls, it makes sense to include state information in them, like, maybe, a category for the feed. We could then use something like <code>https://mydomain.tld/push/tech/81239</code> for the feed 81239 in the 'tech' category.

It now becomes very easy to retrieve all subscriptions in the tech category by doing something like:

<script src="https://gist.github.com/julien51/7751088.js">
</script>

Of course, the callback url can be *just* <code>%</code>, and as you can see in this example, the subscriptions are listed with pages of up to 20 elements. Include a <code>page</code> parameter to navigate thru them.


