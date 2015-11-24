---
layout: post
title: "Superfeedr's null device"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
description: "When subscribing to a feed, you should use https://push.superfeedr.com/dev/null if you want notifications to be ignored."
tags: [feed api, retrieve, subscribe]
js_includes: []
---

Many people, us included, see the web being a complex *operating system*. A consequence of this is that we embrace the [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of small components losely coupled using streams for data in and out.

With that in mind, for subscribers, Superfeedr is mostly a piece of code which takes a feed URL as input, and a webhook URL as output to create **subscriptions** which triggers **notifications**.

As [we've seen recently](/ways-to-use-superfeedr/), once a subscription has been created, a user can then [retrieve](http://documentation.superfeedr.com/subscribers.html#retrieving-entries-with-pubsubhubbub) the content of the feed directly from us[^1].

Now, if you go even further, there are cases where the user subscribes to a feed, but actually does not care about the notifications at all, because they just want to *retrieve* it from us. What happens to the callback url (webhook) then?

On Unix systems, when you have an output that you want to ignore, your typically redirect it to the [null device](https://en.wikipedia.org/wiki/Null_device): `/dev/null`:

> The null device is typically used for disposing of unwanted output streams of a process, or as a convenient empty file for input streams. This is usually done by redirection.

For example, if you wanted to fetch the home page of this blog to just get latency and bandwitdth you would do something like[^2]:
{% prism bash %}

$ curl "http://blog.superfeedr.com/" > /dev/null
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  4871  100  4871    0     0  20901      0 --:--:-- --:--:-- --:--:-- 20905

{% endprism bash %}

The last part of this command tells the OS to send the content it's downloading to `/dev/null/` which is another way to tell "just ignore it!".

So, using an identical approach, if you need to **subscribe to a feed with Superfeedr but you actually do not care about the notifications**, you can subscribe using this webhook URL: [`https://push.superfeedr.com/dev/null`](http://push.superfeedr.com/dev/null) which is Superfeedr's null device!


[^1]: It's important to create the subscripton *before* so we keep polling the feed on the user's behalf.

[^2]: Yes, there are better ways to do so... and yes, `curl` as a `-o` option... but for the sake of using Unix approaches I wanted to show `>`!