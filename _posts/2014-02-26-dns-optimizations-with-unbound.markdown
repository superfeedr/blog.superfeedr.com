---
layout: post
title: "DNS Optimizations with Unbound"
tags: [dns, backend, unbound]
description: "Caching DNS results locally is not always enough. At Superfeedr we're using a shared recursive DNS cache accross all of our pollers to make sure all DNS requests are served as fast as possible."
---

We've [seen yesterday](/dns-optimizations-with-dnsmasq/) that an easy way to significantly decrease the time spent doing DNS resolution was to put a small (1024 items!) cache on each of our fetchers.

This technique allowed us to save all network traffic on about 50% of our DNS requests: pretty significant, but still, for the rest (50%) we would be relying on remote servers which are both far (latency going thru the roof) and crowded (public servers are used by a lot of people!). 

### A shared cache

For that reason, we decided to host our very own recursive DNS cache: we picked [unbound](http://unbound.net/), but we could have gone with the older and venerable [Bind9](https://wiki.debian.org/Bind9) or [Powerdns](https://www.powerdns.com/)'s recursor.
The setup is pretty simple, even though the defaults are quite conservative.

The goal of this central DNS server (we actually have 2 for redundancy and load balancing) is to cache results accross all of our fetching servers while still provide a reliable resolution latency.

### Results

When adding our server's IP as the second line to our `/etc/resolv.conf` (right after `127.0.0.1` for dnsmasq), we get the following performance: **Min:0 Max:24565 Median:1 Average:5.572257**, to be compared to  **Min:0 Max:3028 Median:8 Average:18.41814*** (with Google's 8.8.8.8 server).

This is again a great gain compared to using only a local cache and public DNS servers, because the latency is about 1ms compared to 8ms with the 'best' public server in our tests.

The following graph illustrates the efficiency of our cache:

![Requests, hits and Misses](/images/unbound-requests-cache-miss.png)

You'll notice that the hit rate is still rather small, with only about 60% hit rate. 

### Publishers, fix your TTLs!

After investigating further we quickly found out that a lot of domains **had no TTLs or very low TTLs**, which means that caching is *impossible*. This has a performance impact on our side, but it also has a strong impact on the performance of their website too.

Here is a quick script to check what your TTL is. `300` seconds is a rather common default.

<script src="https://gist.github.com/julien51/9231364.js">
</script>

Of course, you should also make sure that whatever authoriative nameserver you're using is responsive! If you're looking for an awesome provider, we suggest you check our friends at [DNSimple](https://dnsimple.com/r/1fd305c2e2ca74) <sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>.

<p><small id="fn:1">1. This link has a referral code attached, which means if you become a DNSimple customer, we both get 1 additional month worth of free service.</small></p>




