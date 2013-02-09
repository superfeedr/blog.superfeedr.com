---
layout: post
title: Sources in Track
categories: []
author_name: Julien
author_uri: http://twitter.com/julien51
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
---

When we introduced our [latest revision of track](http://blog.superfeedr.com/stemming-track/) last week, we announced that we would grant **free access to anyone willing to hack on track**, as long as they would help us make it better.

Well, that's exactly what happened! One or our fellow users, who's working on some great little project asked whether there was any good way to *identify the feed of the entry* that matched his requests.

Luckily, that was easy for us, mostly because [Atom already defines](https://tools.ietf.org/html/rfc4287#section-4.2.11) a `<source>` element to include that. Here is an example:

<script src="https://gist.github.com/julien51/4747363.js"></script>

We include by default the feed's `id`, `title`, `updated` date, `author`, `information`, `categories` and `links` ... You could then use the link to subscribe to feeds that tend to match a certain keyword.

We have also obviously added that to the [JSON mapping of our schema](http://superfeedr.com/documentation#json_schema) too.

Keep the feedback and feature requests coming, we're here to help make the web better! Also, again, get in touch if you'd like to access our track feature for free.


