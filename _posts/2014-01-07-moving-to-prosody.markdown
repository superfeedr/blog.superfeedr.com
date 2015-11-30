---
title: "Moving to Prosody.im"
tags: [xmpp, backend, prosody]
---

We have recently updated our XMPP servers and we're now using [Prosody.im](https://prosody.im/). It does not change much for our existing users.

There should be no interruption of service as the previous XMPP servers will be kept running for as long as there clients connected to them. All notifications are sent to both the old servers and the new servers. We also have offline messages enabled (limited to 1MB) on the new server, so when you'll disconnect your listeners and reconnect to the new server (as we have now changed the DNS), you'll get any message you might have missed while no client was connected.

There are a lot of great things about Prosody and we've had a great time exploring them. For example, Prosody has a great http-based auth (a webhook in a way!) which is really convenient to keep the code dry. 

Another cool benefit of this upgrade is that our XMPP servers are now rated A for both [C2S](https://xmpp.net/result.php?domain=superfeedr.com&type=client) and [S2S](https://xmpp.net/result.php?domain=superfeedr.com&type=server) communications.

Happy new year!







