---
title: Static files hosting with SSL on custom domain
---

[SubToMe](http://www.subtome.com/) is a *universal subscribe button*. One of its key design goals was to use **only static files**. There should be no server involved: it's not an app, it's a button.

Another key aspects of the SubToMe button is that it's included on many page, and needs to be able to run on any page (thanks to the bookmarklet), **including https pages**. With that in mind, we are forced
to host the button on a system that supports SSL.

The third (and final) constraint is that we must be **using the subtome.com domain** for it, because it stores the user's default in his browser's localstorage. As we know browsers have different localStorage instances for each domain. If we used different domains, then, we'll found ourselves with different versions of the users default.

### We needed a platform to host static files, with our domain and SSL.


When thinking about static files in a very scalable and fully managed way, the almost immediate answer is [AWS S3](http://aws.amazon.com/s3/). That's what we initially tried... create a <code>www.subtome.com</code> bucket, create the right CNAME, upload and hope for profit. The problem is that this does not match the SSL requirement. Amazon offers SSL, but only on their <code>xxx.aws.amazon.com</code> domain. 

In despair, we started considering running a small box somewhere, put Nginx on top, get an SSL cert and run it like in the old days: hoping that I'll always find the courage to do the basic ops this box will eventually need.

At that point, my first savior comes in the picture. [Paddy Foran](http://paddy.io/) tweets:

<blockquote class="twitter-tweet">
  <p>@<a href="https://twitter.com/julien51">julien51</a> <a href="https://t.co/uSizmul6Cf" title="https://developers.google.com/appengine/docs/ssl">developers.google.com/appengine/docs…</a> ?</p>&mdash; Paddy Foran (@paddyforan) <a href="https://twitter.com/paddyforan/status/309611169071652865">March 7, 2013</a>
</blockquote>

<script src="https://platform.twitter.com/widgets.js">
</script>

After reading that doc, I felt that this could be a solution, but was still a bit *worried* about *[Google App Engine](https://developers.google.com/appengine/)'s heavy bills*. Of course, if that worked, it meant I wouldn't have to maintain any box after all, but that could cost me more than a full time engineer to maintain these boxes =)

And that's where my 2nd hero of the day comes to the party. In one of his posts, [Harper Reed](https://harperreed.org/) wrote this:

> I am constantly telling my friends about the new technology tricks that I learn in my internet travels. I learn a lot, which has caused my friends to ignore around 90% of what I say about technology. I don't mind, because I know that I am a genius(heh) and they will come around some day.

Well, in [this exact same post](https://www.nata2.org/2011/01/26/how-to-use-app-engine-to-host-static-sites-for-free), Harper gives out a little secret that I ignored for too long: hosting static files on GAE is *free*, free as in beer.

The GAE pricing machine is triggered only when instances are running. For static files, Google uses some kind of cache which means that there is no CPU involved in running them... 

### Hosting any static site on GAE is easy.

Here is what it took to run SubToMe for free on Google App Engine: a [small app.yaml file](https://github.com/superfeedr/subtome/blob/master/app.yaml). That's it.

Configuring SSL was a bit trickier, but I followed the docs, got a free cert from [startssl](http://www.startssl.com/); configured it and [added Javascript redirects](https://github.com/superfeedr/subtome/blob/master/index.html#L64) to all the SubToMe files.

All in all, we get static files hosting, under our own domain, with SSL, unlimited free traffic (and bandwidth) for $9/month, which is what GAE charges for 5 SSL SNI Certificates. I'd say it's a good deal which becomes even better when I remember that it's fully managed!


