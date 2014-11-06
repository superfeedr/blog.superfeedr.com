---
layout: post
title: "Detailed Subscription List"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
---

As we're closing on the redesign of [Superfeedr](https://superfeedr.com/), we found that there was a bunch of simple improvements we could bring to the API to bring **increase consistency and usability**.

### Subscriptions pagination

Our PuSH API always had the ability to paginate over results results when [listing subscriptions](http://documentation.superfeedr.com/subscribers.html#listing-subscriptions-with-pubsubhubbub). However, the page size was fixed to 20. Today we're introducing the ability to change that from *anywhere between 1 and 500*. This way you can get all search results in one page provided that your [search criteria](/search-subscriptions/) is narrow enough.

### Subscription and feed details

When listing subscription via our HTTP API, by default, we only return the feed url and its title. When debugging subscriptions, our customers will usually then issue another request for each feed to get its status. It's a bit of a waste of time and resources. From today, *you can get both the subscription details, and the feed's status*, using the simple <code>detailed=true</code> query string.
The status information is also consistent with our schema so you get the same information for each feed that you get upon notification.

{% highlight javascript %}  
{
  "subscriptions": [{
    "subscription": {
      "format": "json",
      "endpoint": "http://my.webhook.com/path",
      "secret": null,
      "feed": {
        "status": {
          "code": 200,
          "feed": "http://feeds.macbidouille.com/macbidouille/",
          "http": "Fetched (ring) 200 1800 and parsed 0/50 entries",
          "lastParse": 1415276972,
          "period": 1800,
          "lastMaintenanceAt": 1415201154,
          "nextFetch": 1415278772,
          "lastFetch": 1415276972,
          "entriesCountSinceLastMaintenance": 0
        },
        "title": "MacBidouille.com"
      }
    }
  }, {
    "subscription": {
      "format": null,
      "endpoint": "http://requestb.in/12j1ps91",
      "secret": null,
      "feed": {
        "status": {
          "code": 200,
          "feed": "https://irail.be/stations/NMBS/008892007#%24..%40graph%5B%3F(%40.headsign%3D%3D%22Knokke%22)%5D",
          "http": "Fetched (ring) 200 900 and parsed arbitrary content",
          "lastParse": 1238451905,
          "period": 900,
          "lastMaintenanceAt": 1415270282,
          "nextFetch": 1415277469,
          "lastFetch": 1415276568,
          "entriesCountSinceLastMaintenance": 0
        },
        "title": null
      }
    }
  }, {
    "subscription": {
      "format": "atom",
      "endpoint": "http://my.webhook.com/path",
      "secret": null,
      "feed": {
        "status": {
          "code": 0,
          "feed": "http://sakura.altervusta.org/feed/",
          "http": "Fetched (ring) 0 86400",
          "lastParse": 1238451905,
          "period": 86400,
          "lastMaintenanceAt": 1415142346,
          "nextFetch": 1415314120,
          "lastFetch": 1415227720,
          "entriesCountSinceLastMaintenance": 0
        },
        "title": null
      }
    }
  }],
  "meta": {
    "total": 12,
    "page": 0,
    "byPage": 3
  }
}
{% endhighlight %}  

Additionally, we're also including a <code>meta</code> element which includes the total number of elements matched by your query (when searching or not), the current page and the number of items per page, so you can easily paginate through all results.

