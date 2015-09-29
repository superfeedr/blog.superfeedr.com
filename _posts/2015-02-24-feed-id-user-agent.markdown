---
layout: post
title: "Feed-Id in User Agents"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
tags: [http, webhook, user-agent]
---

At Superfeedr, we're *[selfdogfooding](https://indiewebcamp.com/selfdogfood)*. When we started [looking at the User-Agents](http://blog.superfeedr.com/wh-fetches-our-blog-feed/) of services polling our feeds, we found numerous interesting things. One of them is that several feed reader do include a **feed-id** in the User-Agent strings. This is quite convenient for debugging purposes and we also believe it should help us provide more information to the publisher of these feeds in the coming weeks.

Starting today, you should see that Superfeedr's User-Agent now includes a `feed-id` as well! Stay tuned for more on this front very soon!