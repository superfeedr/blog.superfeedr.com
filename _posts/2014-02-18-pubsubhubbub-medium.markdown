---
layout: post
title: "Medium supports PubSubHubbub"
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
tags: [pubsubhubbub, publisher, customer]
---

In the last couple months, the **blogging platform** world has been innovative again. [Medium](https://medium.com/), one of these new players have been leading the way with an amazing interface to write and read content.

Very early on, Medium also supported the *open web* through their addition of *RSS feeds*. You can consume content posted on Medium in your favorite news reader :) The great news, is that they now support **PubSubHubbub** as well.

Their hub is located at [https://medium.superfeedr.com/](https://medium.superfeedr.com/) and is now linked from all their RSS feeds: user feeds, [like mine](https://medium.com/@julien51) and category feeds too, [like this one](https://medium.com/feed/on-publishing).

If [your reader supports PubSubHubbub](http://blog.superfeedr.com/state-of-pubsubhubbub/), that means that new posts will come to you in **realtime**! They initially started to think about supporting the protocol because they were seeing a lot of our IPs polling some of their feeds on behalf of some of our customers like [IFTTT](https://ifttt.com/), but their hub is now subscribed by *almost 50 different applications* which consume their RSS.

I also want to point to [Dan's](https://medium.com/@dpup), [Go Library for PubSubHubbub](https://github.com/dpup/gohubbub). Dan (thank you!) works for Medium.
