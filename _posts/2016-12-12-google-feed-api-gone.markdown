---
title: "Google Feed API is gone: now what?"
description: "Switch to Superfeedr for the API and Embedly for the embeds."
tags: ["feed", "API", "Google", "embed"]
js_includes: []
---

As you [might have heard](https://blog.superfeedr.com/google-feed-api-alternative/), the **Google Feed API** is closing on December 15th, 2016. It’s not too late to look for a replacement and Superfeedr has you covered, either directly, or via Embedly.

The Google Feed API was used to build all types of  applications, from simple web page embeds to more advanced feed readers and podcasts players. [Superfeedr](https://superfeedr.com) is a powerful replacement which also provides tools for all of these use cases. We also have solutions for feed [publishers](https://superfeedr.com/publisher) or even for people looking for [real-time search filters](https://superfeedr.com/tracker).

> Compared to the Google Feed API, we provide a [richer schema](http://documentation.superfeedr.com/schema.html) (with [more metadata](https://blog.superfeedr.com/more-metadata/)!).

## Push vs. Pull

One of the largest benefits of using Superfeedr’s infrastructure is that rather than polling data from us, you can **subscribe** to the feeds and be notified using **webhooks** when these are updated. That means you do not have to load data from Superfeedr on your web pages, but can conveniently store it on your server and serve it from there.

## Embedding feeds

In addition to consuming feeds, if you’re looking to _embed feeds_, consider using [Embedly](http://embed.ly/). Embedly is a Superfeedr customer and the processing of feeds is handled transparently by us.

Their embed is very simple to configure and is responsive which means it will look great on both desktop and mobile web. Here’s an example with the feed for [this blog](https://blog.superfeedr.com/) (you can replace the value of the `href` attribute with any feed):

{% prism markup %}
<a class="embedly-card" href="https://superfeedr-blog-feed.herokuapp.com/">Feed</a>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>
{% endprism %}

And here is the output:

<a class="embedly-card" href="https://superfeedr-blog-feed.herokuapp.com/">Feed</a>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>


