---
title: "Search in Subscriptions"
tags: [feed api, list, subscriptions, search]
---

Earlier, in July, when [we asked our customers](http://blog.superfeedr.com/survey-redesign/) what they wanted our redesign to include, a few of them mentionned that it was sometimes hard for them to find a given subscription or a set of subscriptions matching specific requirements.

Today, we're happy to introduce our **search in subscriptions** feature. It's a fairly simple mechanism: when asking for the list of subscriptions, you can just include a `search` extra query string parameter to match a more specific subset of subscriptions.

Our docs already include the [list of fieds you can use](http://documentation.superfeedr.com/subscribers.html#listingsubscriptionswithpubsubhubbub) to find specific subscriptions. They include:

* Format of the subscription
* Exact feed url
* Hostname of the feed url
* *inurl* for the feed url which will match subsets of the url
* Exact webhook url (hub.callback)
* Exact hostname of the webhook url
* *inurl* for the webhook url which will match subsets of the url.

Try it yourself!

{% prism javascript %}  
$ curl -D- -X GET https://push.superfeedr.com/ \
-u'demo:e5cab21156449745c2c0c4f77f6e3b69' \
-d'hub.mode=list' \
-d'search[feed][inurl]=nytimes'
{% endprism %}  
This should yield something like this:
{% prism javascript %}  
[
    {
        "subscription": {
            "format": null,
            "endpoint": "http://my.webhook.com/path",
            "secret": null,
            "feed": {
                "title": "NYT > Home Page",
                "url": "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
            }
        }
    }
]
{% endprism %}  

Obviously, we'll be [self-dogfooding](http://indiewebcamp.com/selfdogfood) this in our brand new dashboard, which is coming soon now!

