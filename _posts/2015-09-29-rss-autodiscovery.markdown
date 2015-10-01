---
layout: post
title: "RSS Auto Discovery"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
description: "RSS autodiscovery is a mechanism that makes it simple for browsers and other software to reliably find RSS feeds from HTML documents."
tags: [rss, openweb, discovery, practices]
---

RSS is **meant to be consumed by machines and software**, not by humans. The *accronym is meaningless* and we should not expose it to users. The *orange wave icon* is similarly cryptic and we should rather [show actionable buttons](https://www.subtome.com/#/) to our readers and users when we want them to subscribe to the content we publish.

When the users subscribe (or follow) to a pages, they do it *in the context of said page*. For example, on this very blog, you can subscribe using the button at the [bottom of this post](#blog-more). This means that the application which handles the *subscription* is probably passed something like this page's URL.

### Auto-discovery

From the URL, we should also make it as easy as possible for the machines to find the corresponding RSS feed. This mechanism is called **Auto-discovery** and is performed using a rather simple mechanism: a simple `<link>` tag to add inside the `<head>` section of the HTML document.

The tag includes 4 important elements:

* `rel` should include `alternate` which tells the application that the linked document contains an alternate view of the current document/page. You can [also use the `feed` value](https://blog.whatwg.org/feed-autodiscovery), even though, in our experience, this is much less frequent. Using both is probably a safe bet
* `type` indicates the MIME type of this alternate representation. RSS uses `application/rss+xml` while Atom uses `application/atom+xml`
* `title` is a human description of the document. It's good to re-use the page's title. Do not add RSS as it's meaningless for people :)
* `href` is the most important attribute: it's the URL (relative or absolute) of the feed.

Here's, for example, the discovery for this blog's main feed:

{% prism markup %}
  <link rel="alternate feed" type="application/atom+xml" title="Superfeedr Blog" href="/atom.xml">
{% endprism %}

You should probably **have a single feed per HTTP resource**. However, if you serve multiple resources, you should have one feed (alternate view of the content) per resource.

### Link Back

Finally, *inside your feeds*, it's important to link back to the HTML resource. This lets feed readers point to the right site (or section).

The mechanism using Atom is identical to auto-discovery: it's a `<link>` element with `rel="alternate" and `type="text/html"`. It's also safer to use an absolute URL here for the `href` attribute.

{% prism markup %}
	<link href="http://blog.superfeedr.com/" rel="alternate" type="text/html"/>
{% endprism %}

For RSS, it's a little less "defined", but you can easily include the Atom namespace and follow the Atom way. Alternatively, you can use RSS's `<link>` element like [Dave Winer's feed](http://scripting.com/rss.xml):

{% prism markup %}
		<link>http://scripting.com/</link>
{% endprism %}


