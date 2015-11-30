---
title: "Converting RSS to JSON"
description: "Converting RSS to JSON is one of the most frequent tasks for anyone implementing an RSS application. Using Superfeedr can do it for you so you don't have to worry about the original format"
tags: [feed api, XML, RSS, JSON]
image: "/images/json-logo.png"
---

<img src="/images/json-logo.png" style="float:right; width: 160px; margin-left: 10px; margin-bottom:5px" />

Every year which passes makes it more obvious that **JSON is the format of choice when it comes APIs**. Yet, the web is based on HTML and RSS feeds also use XML-like formats. JSON is also often how mobile or web application share data between the backend and the frontent. As such, consuming RSS feeds means that your application has to be ready to consume XML, and usually immediately translate it into JSON.

Luckily, when using Superfeedr as a [subscriber](http://superfeedr.com/subscriber/), you can **safely ignore the original format** of the feed. Whether it's Atom, RSS, any flavor of the two, and even broken syntaxes, you can use Superfeedr to retrieve and be notified of changes in the feed using our [RSS to JSON schema](http://documentation.superfeedr.com/schema.html#json).

For example, here's what this very blog's previous entry looks like, *converted to JSON*:

{% prism javascript %}
{
  "id": "blog.superfeedr.com:/null-device",
  "title": "Superfeedr's null device",
  "summary": "When subscribing to a feed, you should use https://push.superfeedr.com/dev/null if you want notifications to be ignored.",
  "content": "<p>Many people, us included, see the web being a complex <em>operating system</em>. A consequence of this is that we embrace the <a href=\"https://en.wikipedia.org/wiki/Unix_philosophy\">Unix philosophy</a> of small components loosely coupled using streams for data in and out.</p>\n\n<p>With that in mind, for subscribers, Superfeedr is mostly a piece of code which takes a feed URL as input, and a webhook URL as output to create <strong>subscriptions</strong> which triggers <strong>notifications</strong>.</p>\n\n<p>As <a href=\"http://blog.superfeedr.com/ways-to-use-superfeedr/\">we’ve seen recently</a>, once a subscription has been created, a user can then <a href=\"http://documentation.superfeedr.com/subscribers.html#retrieving-entries-with-pubsubhubbub\">retrieve</a> the content of the feed directly from us<sup id=\"fnref:1\"><a href=\"#fn:1\" class=\"footnote\">1</a></sup>.</p>\n\n<p>Now, if you go even further, there are cases where the user subscribes to a feed, but actually does not care about the notifications at all, because they just want to <em>retrieve</em> it from us. What happens to the callback url (webhook) then?</p>\n\n<p>On Unix systems, when you have an output that you want to ignore, your typically redirect it to the <a href=\"https://en.wikipedia.org/wiki/Null_device\">null device</a>: <code>/dev/null</code>:</p>\n\n<blockquote>\n  <p>The null device is typically used for disposing of unwanted output streams of a process, or as a convenient empty file for input streams. This is usually done by redirection.</p>\n</blockquote>\n\n<p>For example, if you wanted to fetch the home page of this blog to just get latency and bandwidth you would do something like<sup id=\"fnref:2\"><a href=\"#fn:2\" class=\"footnote\">2</a></sup>:</p>\n\n<pre data-line=\"\"><code class=\"language-bash\">$ curl &quot;http://blog.superfeedr.com/&quot; &gt; /dev/null\n  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n                                 Dload  Upload   Total   Spent    Left  Speed\n100  4871  100  4871    0     0  20901      0 --:--:-- --:--:-- --:--:-- 20905</code></pre>\n\n<p>The last part of this command tells the OS to send the content it’s downloading to <code>/dev/null/</code> which is another way to tell “just ignore it!”.</p>\n\n<p>So, using an identical approach, if you need to <strong>subscribe to a feed with Superfeedr but you actually do not care about the notifications</strong>, you can subscribe using this webhook URL: <a href=\"http://push.superfeedr.com/dev/null\"><code>https://push.superfeedr.com/dev/null</code></a> which is Superfeedr’s null device!</p>\n\n<div class=\"footnotes\">\n  <ol>\n    <li id=\"fn:1\">\n      <p>It’s important to create the subscription <em>before</em> so we keep polling the feed on the user’s behalf. <a href=\"#fnref:1\" class=\"reversefootnote\">&#8617;</a></p>\n    </li>\n    <li id=\"fn:2\">\n      <p>Yes, there are better ways to do so… and yes, <code>curl</code> as a <code>-o</code> option… but for the sake of using Unix approaches I wanted to show <code>&gt;</code>! <a href=\"#fnref:2\" class=\"reversefootnote\">&#8617;</a></p>\n    </li>\n  </ol>\n</div>",
  "language": "en",
  "published": 1448352000,
  "updated": 1448352000,
  "permalinkUrl": "http://blog.superfeedr.com/null-device/",
}
{% endprism %}

For the sake of this post, we removed a lot of the meta-data (all converted to JSON), such as the author's information, all the source [related info](/more-metadata/), such as [popularity](/feed-popularity/), velocity... and [much more](https://gist.github.com/julien51/d0613d6b352206cfab2a).