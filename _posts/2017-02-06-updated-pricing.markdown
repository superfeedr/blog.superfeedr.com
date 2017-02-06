---
title: "Updated Pricing"
description: "Our new pricing is based on the number of subscriptions that Superfeedr is handling for you. The first 10 feeds are always free."
tags: ["feed", "API", "pricing", "credits"]
js_includes: []
---

Today, we are introducing a **new pricing** for Superfeedr's subscribers.

In our early days, we wanted Superfeedr's pricing to be based on the amount of data our service would send you. As we were very young start-up, we made the assumption that verbose feeds would cost us more to process and that it would be fair to pass this cost down to customers. In retrospect, this was not the best approach as it means that our pricing was less predictable than it should be: _subscribers do not control how verbose the feeds they're subscribed to are_.

As the [Google Feed API is gone](/google-feed-api-gone/), a lot of our most recent customer are only using [our "pull" APIs](/ways-to-use-superfeedr/). This means that they often have no visibility in the number of update for any given feed. This is another reason to reconsider our pricing.

Our new approach is to charge our subscribers based on the number of feeds we process on their behalf. We analysed subscriber accounts and the recent invoices and came up with this beautiful scatter graph which allowed us to determine what would be the right breakdown.

<img src="/images/price-per-subscription.png" style="">

And here are the rules we will be applying to all new subscriber accounts:

* 10 cts per subscription for the first 50 feeds,
* 5 cts for each feed up to 5,000 feeds,
* 2 cts for each feed up to 50,000 feeds,
* 1 ct per feed for each feed beyond that.

You can also use [our simulator](https://superfeedr.com/subscriber#pricing) for a more detailed estimation.

Additionally, if your invoice is less than $1, we will waive it; this means that the **first 10 feeds are always free**.

Finally, even though this pricing should almost always mean lower invoices for our existing customers, we offer them the ability to remain on the current pricing for as long as they want.


