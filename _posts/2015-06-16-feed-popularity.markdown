---
title: "Feed Popularity"
description: "In our effort to provide more meta-data about RSS feeds on the web, today, we're adding popularity."
tags: [metadata, popularity, feed api]
---

In our effort to provide more meta-data about RSS feeds on the web, today, we're adding **popularity**.
The popularity of a feed is a good indication of the impact of its stories. When dealing with an information overload it can be interesting to provide hints to your customers about how popular a feed is.

### Computation

Our `popularity` rank is a positive float value. It starts at 0 and the greater it is, the more popular a feed is.
We compute it using many different signals which include:

* Number of subscribers
* Impact on social networks
* Popularity of the web pages which link to the feed
* ... etc

It is refreshed every couple days for each feed, but you should expect its value to stay relatively stable over short periods of time. Of course, we're still adding more signals to improve its accuracy.

The distribution of the popularity accross the Superfeedr feeds is pretty aggressive and very **popular feeds (>=10) are orders of magnitude less frequent** than feeds with a pretty good popularity (>=5) [^1].

|---------------------|---------|---------|---------|---------|---------|---------|
| Popularity[^2]      | 0       | 1       | 2       | 3       | 4       | 5       | 
|---------------------|---------|---------|---------|---------|---------|---------|
| Percentile          | 85.5%   | 4.38%   | 3.50%   | 2.84%   | 1.96%   | 1.06%   |
|---------------------|---------|---------|---------|---------|---------|---------|


|---------------------|---------|---------|---------|---------|---------|---------|
| Popularity          | 6       | 7       | 8       | 9       | 10      | 11      | 
|---------------------|---------|---------|---------|---------|---------|---------|
| Percentile          | 0.51%   |0.184%   | 0.028%  | 0.004%  | 0.0006% | 0.0001% |
|---------------------|---------|---------|---------|---------|---------|---------|



### Accessing the popularity

It's part of [our schema](http://documentation.superfeedr.com/schema.html#status), which means that you'll find the popularity in every item which has the feed's status.

#### In the notifications

The notifications do include the popularity, whether they're ATOM or Json:

{% prism javascript %}

{
  "status": {
    "code": 200,
    "http": "Fetched (ping) 200 43200 and parsed 1/20 entries",
    "nextFetch": 1434490007,
    "entriesCountSinceLastMaintenance": 7,
    "velocity": 1.1,
    "popularity": 3,
    "period": 43200,
    "lastFetch": 1434446807,
    "lastParse": 1434446807,
    "lastMaintenanceAt": 1434400440,
    "feed": "http://push-pub.appspot.com/feed"
  },
  // ...
}

{% endprism %}

#### When retrieving

It's also available when retrieving a feed's past entries and status:

{% prism javascript %}

curl -G https://push.superfeedr.com/
  -d 'hub.mode=retrieve' 
  -d 'hub.topic=http://blog.superfeedr.com/atom.xml' 
  -d 'format=json'

200 Success
content-type: application/json; charset=utf-8

{
  "status": {
    "entriesCountSinceLastMaintenance": 0,
    "velocity": 0.5,
    "popularity": 5.23,
    "pornRank": 0,
    "bozoRank": 0,
    "lastParse": 1434444387000,
    "period": 43200,
    "lastMaintenanceAt": 1434444388000,
    "feed": "http://blog.superfeedr.com/atom.xml",
    "lastFetch": 1434444387000,
    "code": 200,
    "title": "Superfeedr Blog : Real-time cloudy thoughts from a super-hero",
    "nextFetch": 1434487587000,
    "http": "Fetched (ring) 200 43200 and parsed 0/10 entries"
  },
  // ..
}


{% endprism %}

#### When searching

Finally, it's also available when searching for feeds, which means you can easily list the most popular feeds to which you're subscribed.
You can of course use a range syntax (>, <, <=, >=) to identify feeds whose popularity is greater or smaller than a given value:

{% prism javascript%}

curl -G https://push.superfeedr.com/ 
  -d 'hub.mode=list' 
  -d 'page=1' 
  -d 'by_page=20' 
  -d 'detailed=true' 
  -d 'search[feed.popularity]=>5'
{% endprism %}

This will yield all feed's to which you are subscribed for which the popularity is greater than 5.

[^1]: One thing to note is that this is a distribution of feeds, not of published entries. We have found the most popular feeds have a higher velocity than average, which means that you may see more notifications from popular feeds than notifications from less popular feeds.

[^2]: This is actually floor(popularity) as popularity is a float.
