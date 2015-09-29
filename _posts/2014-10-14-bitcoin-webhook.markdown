---
layout: post
title: "Bitcoin Webhook"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
tags: [bitcoin, webhook, fragment]
---

At this point, you have certainly heard about [Bitcoin](https://bitcoin.org/). It's the most famous crypto-currency which relies on a shared ledger to determine every account's balance.

![](https://en.bitcoin.it/w/images/en/c/cb/BC_Logotype.png)

The network is made of clients that run the bitcoin protocol. Everyone can participate, but if you run a web app, it's not trivial to also run a bitcoin client in order to look at transactions. 

Several services, including the popular [Blockchain.info](https://blockchain.info/) provide JSON APIs which will yield information about a transaction or a Bitcoin address. Using our [JSON fragment subscriptions](http://blog.superfeedr.com/json-path/), you can easily turn this into a webhook system and be notified when an specific address received a payment. This can be very useful when monitoring payments to your bitcoin addresses!

Let's take an example. We create a new address and added to our bitcoin wallet: `1HLCuQ48xzZPYGUVbbWmdDwhdwpB1DK1Ss`.

The [Blockchain URL for this address](https://blockchain.info/address/1HLCuQ48xzZPYGUVbbWmdDwhdwpB1DK1Ss?format=json) includes transaction info, as well as balances.

Then, we wanted to be notified of the total amount of BTC received on that address, so we subscribed to `https://blockchain.info/address/1HLCuQ48xzZPYGUVbbWmdDwhdwpB1DK1Ss?format=json#%24.total_received`, because `$.total_received` includes the sum of all transactions sent to that address.

We used [Webhookinbox](http://webhookinbox.com) to [inspect the notifications](http://webhookinbox.com/view/xh5yIKaC/), but obviously, we could have used any webhook to susbcribe to the updates to trigger other things!

Feel free to try it yourself: send a couple satoshis to `1HLCuQ48xzZPYGUVbbWmdDwhdwpB1DK1Ss`, and then check [this webhookinbox](http://webhookinbox.com/view/xh5yIKaC/) to make sure we received it... (you may have to wait a couple minutes for the transaction to be committed and for us to check that transation info URL!).








