---
title: "Twitter Firehose shuts down partners"
js_includes: [
"https://raw.githubusercontent.com/remy/polyfills/master/EventSource.js"
]
tags: [twitter, feed api, openweb]
---

> "Those who cannot remember the past are condemned to repeat it." 

History repeats itself. Yesterday, Twitter announced that it was **unilaterally** [shutting down its firehose partners](https://blog.gnip.com/twitter-data-ecosystem/). It's not very different from what Twitter did a couple years ago when they started limiting the 3rd party client's API accesses.

## APIs as whips

I've read a [bunch](http://techcrunch.com/2015/04/11/twitter-cuts-off-datasift-to-step-up-its-own-b2b-big-data-analytics-business/#.asuw5f:tGBc) of [posts](http://blog.datasift.com/2015/04/11/twitter-ends-its-partnership-with-datasift-firehose-access-expires-on-august-13-2015/) and comments on this. Most of them indicate that Twitter data is one thing, but Facebook's data will easily match in terms of data. I don't really know if Facebook's data is as valuable as Twitter's to marketers and advertisers, but I can certainly say that Facebook's firehose access suffers from the exact **same limitation**: *Facebook can and will alter its access, either partialy or completely without any significant recourse for people consuming it*. Whatever happens with Twitter will happen with Facebook, LinkedIn, Google+... and any service for which the data can only be consumed via an API.

The problem isn't the company. The problem is the pattern. When using an API, developers are completely surrendering any kind of bargain power they have. There's a reason we talk about *slave and master* in computer science. **API's are whips for web companies**. This is the very tool they use to enforce a strong coupling and dependence to their platform.

## The Open Web

On the other end, the **open web**, and **RSS** (as the only universal data format) act as a decoupling mechanism. An application which consumes RSS feeds can consume data from *any platform* using the **same code, the same interface**. It does not rely on a single point of failure.
Of course, nothing forces a company to always provide (or consume) RSS feeds. However, when a company drops its RSS feeds, they don't cut other people's acces, they cut *their own distribution*. 

At Superfeedr, not only do we build on **open formats and protocols**, we also *explicitly* pick these as the way to communicate with us so that even if *we* decided to stop providing you service, you could still easily consume the same data, using the same code base. Of course, it also helps that our business models is 100% aligned with providing you the data you need!

We're also convinced that, even though it's not as easy to collect and make sense of the, [the web's data](https://superfeedr.com/tracker) is richer and a lot more diverse. Check our [new tracking feeds](http://blog.superfeedr.com/tracking-feeds/)!







