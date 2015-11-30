---
layout: post
title: "Subscribing to backlinks"
js_includes: []
description: "Knowing when someone links to your site is extremly important for SEO, but also community management. Tracking feeds let you do that very easily"
tags: [tracking, search, backlinks, SEO, webmentions]
---

Anyone who's spent at least 5 minutes looking at Search Engine Optimizations found how crucial [backlinks](https://en.wikipedia.org/wiki/Backlink) are. In practice for search engines, they're *votes* that lets them rank all sites together. In the social web world, people often talk about [@mentions](http://en.wikipedia.org/wiki/Mention_%28blogging%29), which are ways to link a post or a picture to someone else. 

Outside of search engines, knowing when someone links to your site is also extremly important. For the longest time, search engines have provided you with a `link:` operator which lets you find the most relevant links to a site... but search engines also filter a lot of content from this list (because it's their secret sauce!), and it's really not adequate to find links which have just been made to your site.

### Link: with tracking feeds

Luckily, Superfeedr also supports the `link:` command in [tracking feeds](http://blog.superfeedr.com/tracking-feeds/). This means you can **subscribe** using our API an **receive a realtime ping for every new backlink** we foud to your site or page.

Values for the `link` can either be a full page, a subdomain, or a domain. We also match if the query strings differ... etc.

For example, this page will match the following queries:

* `link: superfeedr.com`
* `link: blog.superfeedr.com`
* `link: https://en.wikipedia.org/wiki/Backlink`
* `link: http://blog.superfeedr.com/tracking-feeds/?utm_source=blog`

Also, you can of course, combine the `link` operator with other keywords and operators, such as `site`. If we wanted to track all links to superfeedr, but not coming from a superfeedr site, we would use: `link:superfeedr.com -site:superfeedr.com`.

### Want to get started? 

[Create your Tracker account](https://superfeedr.com/tracker) NOW! and check our docs on how to [build your tracking feeds](http://documentation.superfeedr.com/trackers.html#building-track-feeds).



