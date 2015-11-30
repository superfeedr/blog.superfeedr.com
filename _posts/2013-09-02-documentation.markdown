---
layout: post
title: "New Documentation"
categories: []
---

It was long overdue but we're finally introducing a completely [refactored documentation](http://documentation.superfeedr.com/). Up until now, the documentation was part of our main site. This was a **bad** choice for several reasons: 

* updating the docs means we'd have to deploy the whole frontend site
* taking pull requests was not easy/doable
* if the site was to go down for any reason, docs would be inaccessible

### Bootstrap, Wintersmith and Github

We suck at making shinny things and docs should *always* be the clearest part of any website: *Where would you read docs about docs?*

<img src="http://blog.getbootstrap.com/public/ico/apple-touch-icon-144-precomposed.png" style="float:right; width: 100px; margin-left: 20px; margin-bottom:10px">

Understanding that, we immediately looked at [Bootstrap](http://getbootstrap.com). Aside from being one of the most important efforts to the open web success of the last 18 months (more on that later), it was **designed with readers in mind**: fonts, spacing, margins, paddings... etc, everything is optimal for the reader, and [Bootstrap v3](http://blog.getbootstrap.com/2013/08/19/bootstrap-3-released/) just came out!

<img src="http://wintersmith.io/images/wintersmith.svg" style="float:left; width: 200px; margin-right: 20px; maring-bottom: 10px">

Now, though, Bootstrap is HTML and writing with HTML is not the most adequate. We've learnt to **love Markdown**. A quick search yielded [Wintersmith](http://wintersmith.io/) as the new cool static site generator. It's still a bit young (<small>and very coffeescript-y ... huh!</small>), but works as expected! Using [Jade templates](http://jade-lang.com/) to map our Bootstrap design was also relatively simple and straightforward. I briefly tried to create a "table-of-content-builder" plugin but quickly surrendered given the lack of docs.

Finally, since we host most of our code (public and private) on Github, we thought it'd make sense to host the documentation there. Of course, as it's just static HTML and a domain name, it could very well go to Amazon S3 as well!

A consequence of the move is that we're also moving away from our Google Group. Issues, questions and feature requests should now be sent to the [Issues section](https://github.com/superfeedr/documentation/issues?state=closed) of the [github repository of our documentation](https://github.com/superfeedr/documentation) :)


