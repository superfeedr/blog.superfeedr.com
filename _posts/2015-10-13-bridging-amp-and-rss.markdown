---
layout: post
title: "Bridging AMP and RSS"
description: "The AMP project became public last week. "
tags: [openweb, RSS, Twitter, Google, Facebook]
js_includes: ["//platform.twitter.com/widgets.js"]
---


Last week, after a [couple week's wait](http://blog.superfeedr.com/it-is-called-rss/),  Google unveiled its [AMP project](https://www.ampproject.org/). 

> The Accelerated Mobile Pages (AMP) Project is an open source initiative that embodies the vision that publishers can create mobile optimized content once and have it load instantly everywhere.

In practice, AMP is a combination of 2 things:

* **AMP HTML** which is a custom flavor of HTML with a minimalist subset of tags and which explictly excludes "heavy" or blocking things
* A **caching** mechanism so that User-Agents such as Twitter can show the content directly in the timeline without loading content from the publisher itself.

There's been a lot of great posts out there about what this means and we invite you to read more about it both [on NiemanLab](http://www.niemanlab.org/2015/10/get-ampd-heres-what-publishers-need-to-know-about-googles-new-plan-to-speed-up-your-website/) and [Adactio's blog](https://adactio.com/journal/9646/). However, we feel like [Michael](https://twitter.com/donohoe)'s [tweet](https://twitter.com/donohoe/status/652473840027742208) sums it up pretty well:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">How to be a publisher:&#10;HTML ✓&#10;RSS ✓&#10;OG/Twitter Cards ✓&#10;Flipboard ✓&#10;Google Newsstand ✓&#10;FB Instant ✓&#10;Apple News ✓&#10;AMP <a href="https://twitter.com/hashtag/wtf?src=hash">#wtf</a>&#10;What did I miss?</p>&mdash; Michael (@donohoe) <a href="https://twitter.com/donohoe/status/652473840027742208">October 9, 2015</a></blockquote>

### Avoiding balkanization

The fact that *each* of Facebook, Apple, Google (and Twitter), Flipboard... now **have different and competing markup languages** to ingest content in their platform is pretty bad. Of course, all of these claim to provide "open" solutions where anyone can "opt-in" to use their format. Real open solutions would mean that these players **also** give away custom and platform specific requirements, or at least accept (as first class citizens) requirements from the other players. 

At Superfeedr, we want to play this role and we will embrace *all* of these markups so that if you use Superfeedr to subscribe to feeds, we will perform the following steps:

* **Find and extract** the *most complete* content we can. This means that if you're subscribed to a truncated RSS feed, we will fetch the full HTML or the AMP version when they're available.
* **Normalize the various markups** so that whatever the publisher's format is, we provide you with something that is syntactically equivalent but consistent accross publishers.

As always, we are building on shoulders of giants. We do not want to *invent* our own markup and schema and we often wished these big players would have the same motivation to prevent a format war where nobody wins.

Details of this integration will be coming very soon. We already have performed a couple tests and we're excited about the outcome!
