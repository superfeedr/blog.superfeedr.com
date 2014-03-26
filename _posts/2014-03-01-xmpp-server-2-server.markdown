---
layout: post
title: "Develop custom XMPP Server-2-Server components with nodejs"
author_name: chris-rock
author_uri: http://lollyrock.com/
author_email_md5: f59cf51b88cf75171f7687652b19c5b0
---

### The challenge

One of Superfeedr messaging protocols is XMPP. It is offering a [XMPP Pub Sub API](http://documentation.superfeedr.com/subscribers.html#xmpppubsub) and using [Prosody](http://blog.superfeedr.com/moving-to-prosody/) at its core. XMPP is a mature protocol and is heavily used in the messaging space. It offers quite a lot [extensions](http://xmpp.org/xmpp-protocols/xmpp-extensions/) and covers various use cases that may come up.

At some point every XMPP developer face the issue, that adapting XMPP to your local needs may become quite cumbersome. Superfeedr sponsored the development of the Server-2-Server (S2S) for nodejs to improve the situation here.

### The solution

The latest master branch of [node-xmpp-server](https://github.com/node-xmpp/node-xmpp-server) includes an implementation of the S2S feature. Let's start with an example to see how easy the usage is:

    'use strict';
    
    // import node-xmpp server and the router
    var xmpp = require('node-xmpp-server'),
        r = new xmpp.Router();

    // register handler for own domain
    r.register('nodexmpp.com', function (stanza) {

        // output the recieved message
        console.log('GOT YA << ' + stanza.toString())

        // send back the message to the sender
        if (stanza.attrs.type !== 'error') {
            var me = stanza.attrs.to
            stanza.attrs.to = stanza.attrs.from
            stanza.attrs.from = me
            r.send(stanza)
        }
    });

    // parse raw xml message with ltx
    var ltx = require('ltx');
    var rawmsg = '<message to=\'mu@example.com\' from=\'juliet@nodexmpp.com/balcony\' type=\'chat\' xml:lang=\'en\'><body>Wherefore art thou, mu?</body></message>';
    var msg = ltx.parse(rawmsg);

    // send a message to mu@example.com
    r.send(msg);

It takes less than 20 lines of nodejs code to implement a full version xmpp S2S component. The above sample does not include TLS, but `node-xmpp-server` implements [TLS, too](https://github.com/node-xmpp/node-xmpp-server/blob/master/examples/s2s_echo_tls.js). 

The latest version of `node-xmpp-server` implements the following specifications:

 * [XEP-0220: Server Dialback] (http://xmpp.org/extensions/xep-0220.html)
 * [XEP-0185: Dialback Key Generation and Validation](http://xmpp.org/extensions/xep-0185.html) 

During development we tested `node-xmpp-server` against Prosody. To get it running, you need to change the prodsody configuration to:

    s2s_require_encryption = false

Be aware that this does not mean the connection between Prosody and `node-xmpp-server` is not encrypted the communication. `node-xmpp-server` establishes a secure TLS connection between the servers if possible. Prosody requires all servers that ship with server dialback instead certificate authentication to deactivate s2s_require_encryption. We do not recommend deactivating `s2s_require_encryption` in general, though. Instead you may try to use the [mod_s2s_never_encrypt_blacklist](https://code.google.com/p/prosody-modules/wiki/mod_s2s_never_encrypt_blacklist). Further information is available at [Prosody](https://prosody.im/doc/s2s).

We look into the implementation of [XEP-0288: Bidirectional Server-to-Server Connections](http://www.xmpp.org/extensions/xep-0288.html) to make the implementation via nodejs even more secure.

Happy hacking.




