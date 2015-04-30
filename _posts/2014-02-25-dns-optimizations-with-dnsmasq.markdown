---
layout: post
title: "DNS Optimizations with Dnsmasq"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
tags: dns, backend, dnsmasq
---

We **currently fetch milions of feeds** and we need to do that in a very timely fashion. Since the beginning of 2014, it took about *600ms* to fetch a feed on average. The fetching time includes *DNS resolution*, the *establishment of the HTTP connection*, the *HTTP transfer*, and the *decoding of the answer* (if it was gzipped for example). This is by far what takes the longest [wall time](http://en.wikipedia.org/wiki/Wall-clock_time).

Luckily, we **use asynchronous IO**, which means, that we never really wait idly for the data to come: we usually start processing other feeds. However, this significantly increases the memory consumption, and eventually has a toll on performance. For this reason, it's important that we optimize our requests as much as possible. This starts with DNS.

### Dnsmasq locally

> Dnsmasq is a lightweight, easy to configure DNS forwarder...

We currently have 20 servers in charge of polling resources on the web. They perform the bulk of our DNS requests. They're now all running a [Dnsmasq](http://dnsmasq.org/) instance. Dnsmasq is only efficient if it stays small, so we limited the size of the cache to **1024 entries**.

To test the impact of Dnsmasq, we built a quick benchmark script. We extracted 10k urls from our database, and extracted their domains. We kept the buggy domains in them. We then used [this simple node.js script](https://gist.github.com/julien51/9208115) which takes a domain and resolves it with [`dns.resolve`](http://nodejs.org/api/dns.html#dns_dns_resolve_domain_rrtype_callback) before handling the next one. 

We changed the content of `/etc/resolv.conf` to include only the server which will be used by Node to resolve the requests. We tested with 3 different ones and here are the results:

* One of [Google's public DNS](https://developers.google.com/speed/public-dns/?csw=1) (`8.8.8.8`): *Min:7 Max:4097 Median:8 Average:33.66747*
* One of [OpenDNS](http://www.opendns.com/)'s public servers (`208.67.222.222`): *Min:29 Max:6030 Median:30 Average:100.3912*
* One of [Linode](https://www.linode.com/)'s local resolvers (`97.107.133.4`): *Min:49 Max:67166 Median:52 Average:183.1860*

The point here is not to compare these servers, but to see the impact of using a cache locally.

### Results

With dnsmasq installed and 127.0.0.1 as the first line of `/etc/resolv.conf`, we get the following results:

* Google: *Min:0 Max:3028 Median:8 Average:18.41814*
* OpenDNS: *Min:0 Max:8768 Median:29 Average:66.38854*
* Linode: *Min:0 Max:41248 Median:49 Average:110.6278*

The resolution time went down to 0 for 3605 requests, affecting the average pretty significantly (between 30% and 50%).

In practice, we get a **hit rate of about 50%** in our production environment, which is quite high and saves us a significant wall time. A 50% hit rate on our local caches is also a 50% miss rate, we'll see [next](/dns-optimizations-with-unbound/) how we can improve further our DNS resolution performance... 

