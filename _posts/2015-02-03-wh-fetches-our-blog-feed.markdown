---
layout: post
title: "Who fetches our blog feed"
js_includes: []
tags: [http, user-agent, pubsubhubbub]
---

A couple weeks ago, we moved this static blog from github pages to Amazon S3. The move itself was uneventful, as both plaforms handle CNAME's pretty well. However, S3 provides a feature that we needed: **redirects**. We wanted to redirect [our feed address](http://blog.superfeedr.com/atom.xml) to an app which we could use to monitor who is polling our feed. We created a very simple Node application application which proxies our Atom feed while recording hits (both user-agent and IP) in a Redis database.

We believe every decent feed reader should follow redirects (we do it transparently if you use Superfeedr). After a couple weeks we got a pretty clear view of services polling our feeds. The numbers below account for **2 weeks worth of traffic, with 1 significant update to the feed** ([last week's post](http://blog.superfeedr.com/inoreader-superfeedr/)).

## A lot of waste.

We registered **36,413 hits** for **152 different user-agents**, with 6 referers accounting for 50% of the traffic and 16 of them accounting for 73% of the traffic. 

What's more interesting is that, since our [feed supports PubSubHubbub](http://pubsubhubbub.superfeedr.com/), we can match the subscribers to their user agents. A lot of feed readers such as [Feedly](http://feedly.com/i/welcome), [Inoreader](http://www.inoreader.com/), [MnmlReader](https://minimalreader.com/), [Feedbin](https://feedbin.com/), or [Newsblur](http://newsblur.com/) are subscribed via PubSubHubbub. The net result is that, these subscribers, all combined, hit our feed **only 4,637 times** (12.7% of all hits). Of course, their reduced polling saved them (and us) a lot of resources... but this did not impact their users *who were still the first ones* to learn about our new posts.

We're a sad that our followers using [Bloglovin](http://www.bloglovin.com/), [Digg Reader](http://digg.com/reader), [AOL Reader](http://reader.aol.com/) and a few others learn about our stuff significantly later.

Finally, [Fever](http://feedafever.com/), [TT-RSS](http://tt-rss.org/redmine/projects/tt-rss/wiki) and a few other 'installable' feed readers were among the largest offenders because *all installs* will hit *our feed quite often*. These two alone account for more traffic than all the PubSubHubbub subscribers combined (5,788 hits)!

## User-Agents 

The second thing we confirmed is that User-Agents are... strange beasts. First, it's a another big waste (HTTP headers are not compressed) that 69 of them start with `Mozilla/5.0`. That's a [pointless legacy](http://webaim.org/blog/user-agent-string-history/). They can also be *very* long: NewsBlur's UA has 242 characters for our feed!

Having great User-Agents is hard. We identied the following steps to epiphany when it comes to them:

1. Actually *have* a User-Agent. Some fetches will not identify themselves. This is considered bad practice and several publishers will block these without any further effort.

2. Make sure you do not use the *default* User-Agent of your HTTP library. Our biggest hitter uses `Go 1.1 package http`, but we also have a bunch of `feedzirra http://github.com/pauldix/feedzirra/tree/master` or `curl/7.26.0`... Don't hide!

3. Add a way to get in touch: a URL or an email address will help publishers clarify who you are, why you're polling their feeds and how to report problems.

4. Include debugging information: several of the people fetching our feeds have added a `feed-id=` value in their User-Agents. We believe this is a pretty good practice (and we're [adding this to the Superfeedr User-Agent](https://github.com/superfeedr/documentation/issues/59))

5. If you're a feed reader, include the number of subscribers in the User-Agent. But this also tends to behave quite erratically when the number of subscribers changes often. For example, we have 10 different User-Agents for MnmlReader since our number of subscribers seems to very a lot in that reader...

The web is an abstraction layer, which means that the content published here should be displayed similarly in *any* browser, using *any* OS. We understand that this may not be true for more advanced Javascript techniques, but for RSS feeds, it's certainly pointless to include architecture, or OS information: don't clog the tubes with that!

TL;DR If you're polling our feeds, you should do the following:

* **Identify yourself** with a great User-Agent: make sure we can contact you, and help us learn more about why you're polling it and on behalf of how many people.
* **Implement PubSubHubbub** (it's [not that complex](http://stackoverflow.com/a/3847385/73987)) so that you get real-time updates to our feed, without polling very frequently

