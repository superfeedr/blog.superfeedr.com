---
layout: post
title: "Searching Subscriptions"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
description: "You can now search subscriptions to feeds using their porn rank and bozo rank or their velocity."
tags: search, subscriptions, feeds, bozo, porn, velocity, feed api
---

Last november, we started adding [more metadata](/more-metadata/) to the notifications we send:

* **Velocity** : the average number of updates a feed yields per day
* **Porn Rank**: the likeliness of a feed to be porn
* **Bozo Rank**: the likeliness of a feed to be *garbage*

We usually recommend pruning subscriptions using these when you receive notifications, but there are also cases where you may just want to analyze the set of subscriptions and quickly identity the most verbose or the porn ones.

Starting today, you can directly search for these feeds and their subscriptions.

### Using ranges

These fieds all accept numerical values, but they also accept *range notations* which means it's easy to search for values like this:

* `feed.velocity=>=3` will yield subscriptions to feeds with a velocity *greater or equal to* 3.
* `feed.bozo=<0.5` will yield subscriptions to feeds whose bozo rank is *lower than* 0.5.
* `feed.porn=0.2` will yield subscriptions to feeds whoe porn rank is *exactly* 0.2.


Here's a complete example of a request to list feeds with a velocity higher than 10, whose bozo rank is greater than 0.1:

{% prism bash %}
curl -G 'https://push.superfeedr.com/' \
	-u demo:410500924394d178014612599b5009d4 \
	-d 'hub.mode=list' \
	-d'search[feed.velocity]=>10' \
	-d'search[feed.bozo]=>0.1'
{% endprism%}

You can now easily identify (and maybe remove) the most verbose feeds, the ones which are clearly broken or the ones who are porn.



