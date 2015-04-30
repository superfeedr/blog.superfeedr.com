---
layout: post
title: "Heartbleed: change your passwords and tokens"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
tags: company, security
---

Two days ago, a security flaw in OpenSSL [was made public](http://heartbleed.com/). This flaw, named **Heartbleed** is *Catastrophic* in Bruce Schneier's [words](https://www.schneier.com/blog/archives/2014/04/heartbleed.html), because it exposes a chunk of memory from any vulnerable server.

After checking thoroughly, we found that our servers themselves were not exposed as we currently use an old(er) version of Debian, yet, the [loadbalancers we use](https://blog.linode.com/2014/04/08/heartbleed-openssl-vulnerability/) have been vulnerable. Even though **there is no trace (or proof)** of that at this point, it is possible that user credentials and private data exchanged over a secure connection have been leaked, including passwords and tokens.

The *vulnerability has been fixed* and we have *changed our SSL certificates* as they could have been compromised. That means that it's now safe (and strongly recommanded) for you to **change your passwords and the tokens you use to authenticate against our API**.

Please, note that it is also possible, but not confirmed, that an attacker stole your credit card information if you entered your credit card number on *any site* that asks for payment which was vulnerable (including Superfeedr). We also communicate with our provider using their API using SSL in a way which could have exposed this information. Because of this, we suggest *you call your bank and ask them to issue a new card and invalidate the previous one*.

Finally, as we know most of our customers run their own web applications, if you're looking for a list of things to look for and fix in the wake of **Heartbleed**, we suggest you [check Thomas's post](http://mir.aculo.us/2014/04/08/heartbleed-exploit-tldr/).

We also kindly ask that you report any suspicious activity under your account as soon as possible so we can take adequate measures for your accounts.




