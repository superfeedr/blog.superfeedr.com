---
layout: post
title: "Debugging broken RSS feeds"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
description: ""
tags: debugging, RSS, metadata, feed api
---


RSS feeds, like any other type of HTTP web resource have a life of their own and even if they may be behaving as expected at a given point, they are likely to break in the future. As you know, Superfeedr will *always* [notify its subscribers when we encounter a problem with a feed](http://documentation.superfeedr.com/subscribers.html#errors). The main reason for this is that most applications can then display a message to their users or simply unsubscribe from these broken feeds.

We identified 2 types of problems with RSS feeds:

* [HTTP issues](#http-issues)
* [Parsing issues](#parsing-issues)

### HTTP issues

HTTP issues are not directly related to RSS, but, since most RSS feeds are distributed by HTTP servers, they have to be taken into account when polling feeds. Here's a list of common issues.

* **Server errors**: [5XX error codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_Error). Even though they should probably be considered temporary, sometimes, bugs in HTTP server take months to be fixed...
* **Client errors**: [4XX error codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_Error). The largest chunk of these errors is clearly 404 or 410. They both mean that the RSS is not there anymore and may likely never be back. This happens on blogging platforms when the users shut down their accounts for example. But also when a site is redesigned and the new version uses different URLs for its RSS feeds, with no redirect.
* **Redirects**: these are actually [handled transparently](http://documentation.superfeedr.com/subscribers.html#redirects) by Superfeedr.
* **Offline HTTP servers**: sometimes, an HTTP server goes offline. This time, it's not so much an HTTP error, than *no HTTP traffic* as it's impossible to reach the endpoint.
* **Expired domains and parked domains**: often, this does not yield an HTTP error as these parked domains will avoid returning 404 to lose their SEO juice... even though of course, they don't yield any RSS content.
* ...

There's more! Luckily after a couple years of handling these, we're slowly starting to have a pretty good coverage of them. 

When the notification does not include items, but just the [feed's status](http://documentation.superfeedr.com/schema.html#status), it's useful to check the its **HTTP Code**. Of course, a `0` means we have been completely unable to fetch the feed at all. 

### Parsing issues

It's not because we are successfully able to fetch a feed that the content is actually a feed! And even when it *is a feed*, it's not always valid and parseable. Our [SAX parser](https://en.wikipedia.org/wiki/Simple_API_for_XML) is **fault tolerant** and we will always try to correct small errors. We also correct things like **encoding issues** as we normalise everything to UTF-8. 

Also, as some HTTP features such as [`Etag`](https://en.wikipedia.org/wiki/HTTP_ETag) and `Last-Modified`, will save resources by not transferring content, we force ourselves to fetch the whole feed's data at least once a day to make sure we indeed try to parse each feed on a daily basis.

This means that our `last-parse` element in the [feed's schema](http://documentation.superfeedr.com/schema.html#status) is probably **the most important field** and can help you detect parsing issues quite easily. If it's older than a couple days, it's likely that the feed has XML issues.


### Tips and tricks

When building an application which consumes RSS feeds, the most important field to look at is the `last-parse` element. When the feed has HTTP issues, the `last-parse` date will of course remain untouched. When the problem is a parsing issue, the `last-parse` date will also remain untouched. The conclusion of this is that notifications with an *old* `last-parse` are a sure sign of a **broken feed**.

The `http` field will contain a **human readable status** for the feed. This field is also worth saving on the subscriber's side for easier debugging.

Other fields such as `velocity` can also be of great help to assess how **active** a feed is. It's a recursive average of the number of entries published by a feed between 2 maintenance cycles. A feed which has not published an entry in more than 10 days will have a velocity of 0.5 or less.

Finally, fields like `bozo_rank` or `porn_rank` can help [remove spammy feeds](/more-metadata/). 




