---
layout: post
title: "More Feed Metadata"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
tags: [metadata, spam, porn, feed api]
---

All RSS/Atom feeds aren't born equal. As we process more and more we start to have a better understanding of them and one of our goals is to **share more of the knowledge with our customers**.

We've been working on extracting more *meta-information* from these feeds and today, we want to highlight 3 interesting example that you should probably be using in your applications.

## Velocity

When assessing a feed, it can be important to know its velocity: how many times it updates per day. This can obviously give you an idea of the cost involved in using them, but also maybe of their relevance. If a feed updates too often, it's probably hard to consume in its whole by humans, but if it barely updates, it's also unlikely to generate reading habits. At Superfeedr, we calculate it as an weighted average over time of updates per day.

Here are a couple examples:

* [Giga Om's feed](https://gigaom.com/feed/) has a velocity of 24.
* [Hacker News](https://news.ycombinator.com/rss) has a velocity of 116.
* This blog's feed has a velocity of 0.
* [Etsy's full catalog feed](https://www.etsy.com/api/push/listings/latest.atom) has a velocity of 157,928.


## Porn score

As for every other thing on the web, **porn in feeds is pretty popular**. To be honest, porn sites are also often times at the vanguard of many new technologies (white or black!). Many of our users wanted to filter out obvious porn sites from their subscriptions. Our goal was not to strip individual entries who could provide NSFW stories, but feeds which consistently publish this kind of content.

We use our [track feature](http://documentation.superfeedr.com/misc.html#track) to subscribe to terms often present along with porn content, and we compute a rank between 0 and 1 to indicate how likely it is that a feed is porn. 

At this point, you should consider this like most types of filters: **incomplete** (we do not handle well the feeds with no textual content by only images for example), and risk-prone. We have identifed a few sources which, even though they use "porn words" are not atcually porn. We have implemented ways around this, but please, do not consider our approach to be exempt of **false-positives** and **false-negatives**.

Whenever the porn rank is missing you can assume it's 0 (we may not have computed it yet).

## Bozo score

Another very annoying set of feeds are feeds which appear valid (or at least not invalid enough to be discarded as faulty), but who still show very incoherent behaviors or meta information which would be semantically wrong.

The most obvious example would the be case of feeds that auto-generate random unique ids for their entries. Take a look at [this feed](http://twool.vsw.jp/feed/mmwtmy1bftex.xml) for example: open it in a new tab and refresh: you'll see a new entry *every single time you referesh it*. 

The Bozo rank is named after [Tim Bray's Bozo factor](http://www.tbray.org/ongoing/When/200x/2004/01/11/PostelPilgrim). It's not exactly the same issue, but we think we can extend the definition :)

> There’s just no nice way to say this: Anyone who can’t make a syndication feed that’s well-formed XML is an incompetent fool. 

The rank is a number between 0 (no bozo at all) and 1. Whenever the porn rank is missing you can assume it's 0 (we may not have computed it yet).

## Track feeds

Starting today, all new track subscription will filter out any feed whose bozo rank is greater than 0.5 as well as any source with a porn rank higher than 0.3 If you still want to include these, feel free to include a `porn=ok` or `bozo=ok` query string to your track feeds and you'll get these.









