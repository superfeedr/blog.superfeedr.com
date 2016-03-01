---
title: "Instant Articles and the future of RSS"
description: ""
tags: [feed, publishing, RSS, instant articles, reboot]
js_includes: []
image: ""
---

In the past couple months, a lot has been happening on the *syndication* front. The mobile and social worlds have become more and more aware of the importance of the **open web** and we've seen several new efforts to improve the user experience on these fronts.

## Mobile

Despite increasing bandwidth, the constraints of the mobile internet are still extremely tight: latency, spotty connections, limited memory and power... etc. The [web's constant growth](http://idlewords.com/talks/website_obesity.htm) when it comes to page size, number of loaded resources and the need for more and more beams and advertisement have been colliding with this.

## Social

In parallel, more than ever, we discover our content through the filter of the social networks. A couple months ago, our friends at Parsely shared that [Facebook was dominating the referral traffic](https://blog.parsely.com/post/2296/facebook-dominates-referral-traffic-a-coverage-overview/). The actual mileage varies from site to site, but it's obvious that the golden days of SEO and search-engine based discovery are behind us.

## Space vs. Time

Another, more massive trend is supported by these 2: the [web is going toward a spatial organisation toward a time-based organization](http://www.ouvre-boite.com/space-to-time/): time-lines have replaced site-maps and URLs are slowly being hidden from the user interfaces: where we consume the content is less important than what it was.

## Syndication rebooted

[Instant Articles](https://instantarticles.fb.com/) are Facebook's answer to these trends. (So is [Google's AMP](https://www.ampproject.org/)). In practice, these HTML documents are **embedded inside RSS feeds** so that Facebook can easily import the web's content into its apps. Like RSS, they're *not as rich as full HTML document*. For example, they can't include scripts or styles. They also require a certain number of elements which would be optional with HTML.

On their end, Facebook will **replicate** the content of the publisher's site, using the Instant Article format. Each open web URL is mapped to an Instant Article inside Facebook. This is what lets them serve content much faster as they are in charge of caching and content delivery. The consequence of this approach is that once a publisher starts supporting Instant Articles, Facebook will show the Instant Article version of the content **as soon as anyone shares a link to this site**. You don't have to share the links from a Facebook page : any link to the content will be served as its Instant Article version.

Some may be scared by this which results in building a **shadow web**, inside Facebook, but I'd like to to highlight a couple things:

* This is exactly how RSS has worked since it was conceived
* This is also how [Google's AMP](https://www.ampproject.org/) work except that of course, in this case, Google's cache is applied
* Anyone, not just Facebook, could also cache the Instant Article version of the pages shared on their platform.

You guessed it: at [Superfeedr](https://superfeedr.com), we're evaluating this final and last point. Exactly [like for Google's AMP](/bridging-amp-and-rss/), we're working on supporting Facebook's Instant Article as a subscription format so that when you subscribe to a feed, you could request to only be notified with the Instant Article version of content, if it's available.

