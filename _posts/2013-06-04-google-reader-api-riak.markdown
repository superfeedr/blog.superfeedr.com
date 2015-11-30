---
layout: post
title: Google Reader API replacement, powered by Riak
categories: []
---

When Google announced it was shutting down Reader on July 1st, we took a couple days to announce that [we will be offering a replacement for its API](http://blog.superfeedr.com/google-reader-compatible-api/) as well as back up as much of the data that we can.

Finding the *right tool to store* all this data was tricky and as we have finally deployed that backend store we wanted. We have also started backing up significant amounts of data.

## Requirements

We [tried several times](http://blog.superfeedr.com/oss/open-source/database/nosql/kumofs-a-database-success-story/) to find the perfect datastore to store the content that goes thru Superfeedr, but the fact is the size of that store quickly adds up.

 * The average size of an entry that we store is about 2KB. Google Reader stores 1000 items per feed. We want to be able to store about 50M feeds at that this point (we only store feeds for which we have susbcribers, not the publisher feeds). That's **93.13TB** worth of data. 

 * Obviously, that data is growing fast too, so we needed a data store that is able to **scale horizontaly**: adding more servers increases the capacity. 

 * Availabilty is also a key requirement as we'd rather serve 'stale' (by a couple seconds or even minutes) data than no data. We also need to be able to **constantly write** to the store as we can't *stop the web from happening*.

 * This takes us to eventually consistent stores. Consistency at any given time is not a strict requirement as there is already a significant latency (couple seconds!) between the time a feed is updated and we know about it.

 * Finally, if we want to store 1000 entries for each feed, we can't do it in the same record, so we need some kind of schema where a <code>feed</code> record points to several <code>entry</code> records.

## Riak

We picked [Riak](http://basho.com/riak/). Not only there weren't too many choices out there, but we also heard a lot of great things about Riak and the community seems pretty strong.

<img src="http://upload.wikimedia.org/wikipedia/en/5/53/Riak_product_logo.png" style="witdh: 200px; float: left" />

Setting up a Riak store (with a single node) locally is quite easy and the *HTTP based API* is a breeze to use when you want to PUT, GET and DELETE records. The [Riak docs](http://docs.basho.com/) were also quite helpful, while still being digest. 

Beyond that, setting up a cluster is also fairly easy. We used the [chef cookbook](http://docs.basho.com/riak/latest/cookbooks/Installing-With-Chef/) and quickly enough we had a cluster of 5 with enough disk storage to get things started.

However, we also quickly bumped into problems because eventual consistency is *hard* and because Riak's default behavior with conflicting values (siblings) made things harder for us.

### Siblings


Riak is eventually consistent, and is also distributed, which means it's fairly common that 2 clients will set a conflicting value to a single key. That's the dreaded and common **race-condition**. By default, Riak will keep the latest one, but that can be a problem.

> In our case, the feed object contains a list of entries. For example, feed A may include entries 1,2 and 3. So far, so good. Now, let's say that 2 of our supernoders (in charge of parsing the feeds and writing the entries to Riak) get started. They both get `[1,2,3]` from Riak. The first one finds 4. It's great, it quickly adds it to the list and writes `[1,2,3,4]` back to Riak. In the meantime, the 2nd one found 5, and quickly writes `[1,2,3,5]` to Riak. If the last value wins, then, we've lost 4 :(

Now, Riak is smart enough to keep multiple version of the same objects stored, as long as your client is smart enough to tie the knot next time it reads the object. In our case, that's fairly simple: when we get conflicting values, we just merge the 2 arrays, make it unique and save the result back.

### MapReduce and schemas


Riak has some **MapReduce** capabilities. The most common usage for it is to 'group' sequences of complex requests in one, rather than to run a piece of code on all objects stored in Riak.

For us, the most common use is to retrieve the full content of a feed. Basically, we execute a MapReduce request which fetches the feed's value and, then fetches K of its entries from the value directly and returns them all at once. It's pretty handy and saves some precious time rather than doing K+1 request to fetch the feed and then all of its entries.

However, it's also important to *not abuse* these requests because they put some of the load which ws historically on the client's side back to the server side. For example, it's probably not such a great idea to run mapReduce requests on thousands of keys at once, or which would do a complex computation.

### Deleting

**Riak is very good to access objects by their keys directly. On the other end it's also very bad at 'listing' items**. It's good at handling objects one by one, but not so good to play with 'unknown' collections.

Since our backend storage will only store a limited (high, but limited) amount of entries per feed, we have to trim the list every now and then. We have to be extremely careful to first delete the entry object, and then remove it from the feed's list of entries, because if we do it the other way around, we may 'lose' track of the entry if we're unable to delete it.

> That's exactly what happened in one of our initial deployments. The conflict resolution algorithm that we had was too aggressive and dropped some entry's keys from the list of entries stored for each feed. After 2 days worth of 'leaked' entry, we had nearly 5M extra entries that we needed to delete, without knowing their id. Yikes.

The solution consisted in running a very expensive MapReduce job to list all the entries keys. Then, as the entries's keys includes the feedId (we use a feedId-EntryId form on purpose!), we groupped the entries by feed, compared the list of entries actualy kept and deleted the rest. This was long and painful (it took almost a full day to deal with all the accumulated data!) and taught us to be **extremely careful as to not 'lose' track** of items in Riak.

### Monitoring

Monitoring is a key aspect to running any kind of server. Monitoring our Riak cluster is obviously key to controlling its performance and making sure it scales up nicely. We use [collectd](http://blog.superfeedr.com/oss/open-source/infrastructure/collectd/performance-monitoring-with-collectd/), but there was no collectd plugin for Riak, so we hooked it up [to a script](https://gist.github.com/julien51/5717367.js). We keep track of the object's sizes, the response times, the number of siblings... etc. Pretty handy to detect problems :) We also use [Riak Control](http://basho.com/riak-control/) to quickly learn more about our cluster.

## Next

We are now storing more and more data and we should have backed up as much as we can before July 1st. In the next couple days we will work on our APIs for this data store. It's currently accessible thru our <code>retrieve</code> feature (both [XMPP](http://documentation.superfeedr.com/subscribers.html#retrievingentrieswithxmpp) and [PubSubHubbub](http://documentation.superfeedr.com/subscribers.html#retrievingentrieswithpubsubhubbub)), as well as our [Google Reader API](https://github.com/superfeedr/documentation/tree/master/google-reader-api). We will also support the [Open Reader API](http://rss-sync.github.io/Open-Reader-API/resources/). Please, get in touch if you'd like to test them.






