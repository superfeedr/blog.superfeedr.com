---
layout: post
title: "Full Text Trackers"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
description: "We are matching full text content for against your tracking queries. This helps us find new content even in truncated RSS feeds."
tags: [tracking, trackers, search, prospective, fulltext]
js_includes: []
---

You can only use search engine to find *past* documents, articles or pages which mention specific keywords. If you want to **search in the future** (that's often called *prospective search*), you should look at our [tracking feeds](/tracking-feeds/). They let you define search queries which are executed against each new feed entry that goes through Superfeedr.

Similar to *past-search*, one of the challenges is to **expand the coverage of the web**, as well as to get a **better idea of how popular** (and eventually relevant) any given matching document can be.

Of course, many feeds are truncated because publishers want their content to be consumed and read directly on their sites. However, for search engines like Superfeedr's tracking feeds, it's important to match against the full documents.

For example, no later than 4 days ago, this approach helped us find [this article on Medium's engineering blog](https://medium.com/medium-eng/the-stack-that-helped-medium-drive-2-6-millennia-of-reading-time-e56801f7c492) which mentions Superfeedr. If we only looked at the content of the RSS entry, we would have missed this mention, as the truncated feed does not include `superfeedr`:

{% prism markup %}
<item>
  <title><![CDATA[The Stack That Helped Medium Drive 2.6 Millennia of Reading Time]]></title>
  <description><![CDATA[<div class="medium-feed-item"><p class="medium-feed-image"><a href="https://medium.com/medium-eng/the-stack-that-helped-medium-drive-2-6-millennia-of-reading-time-e56801f7c492?source=rss----2817475205d3---4"><img src="https://d262ilb51hltx0.cloudfront.net/fit/c/600/200/1*-idr0gCmklKx3cxRRXkk4A.jpeg" width="600" height="200"></a></p><p class="medium-feed-snippet">Originally posted on StackShare</p><p class="medium-feed-link"><a href="https://medium.com/medium-eng/the-stack-that-helped-medium-drive-2-6-millennia-of-reading-time-e56801f7c492?source=rss----2817475205d3---4">Continue reading on Medium »</a></p></div>]]></description>
  <link>https://medium.com/medium-eng/the-stack-that-helped-medium-drive-2-6-millennia-of-reading-time-e56801f7c492?source=rss----2817475205d3---4</link>
  <guid isPermaLink="false">https://medium.com/p/e56801f7c492</guid>
  <dc:creator><![CDATA[Dan Pupius]]></dc:creator>
  <pubDate>Fri, 23 Oct 2015 22:03:38 GMT</pubDate>
</item>
{% endprism %}

We currently extract content from the whole HTML document but we're already working on removing the **boilerplate elements** (navigation, ads, sit level features... etc) to only focus on the main content of any HTML document.

RSS is the perfect mechanism for **content discovery and subscriptions**. HTML, on the other end, is the richest document format and our tracking feeds are able to combine both to match complex queries against large documents, in realtime.

