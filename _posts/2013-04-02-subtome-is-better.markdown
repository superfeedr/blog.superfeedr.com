---
layout: post
title: Why SubToMe is better
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
---

A couple weeks ago (before the Google Reader demise!), we soft launched [SubToMe](https://www.subtome.com/) as a universal subscribe button. As weeks passed, we  tried to promote it. We offered a [SubToMe Wordpress plugin](http://wordpress.org/extend/plugins/subtome/), a [Chrome Extension](https://chrome.google.com/webstore/detail/subtome/cjkhnlmkkfheepafpgppmpdahbjgkjfc?hl=en), a [Firefox Extension](https://addons.mozilla.org/en-us/firefox/addon/subtome-subscribe-button/)... etc.

Yet, several people came to us and said: *Why is it better than a Google Reader button?* (replace Google Reader by Newsblur, BlogLovin, or Feedly). The answer is that it's agnostic. It's a button that works for any of these services. But even more than agnostic, it's a button that works for **the subscriber**.

### It's better for publishers

Publishers *want* people to follow them and subscribe to their content. Yet, they cannot realistically put buttons for each and every reader out there, not only because it would be ugly, but also because it means that when a new reader comes out, they will have to think about adding a new button. 

By being agnostic, SubToMe can be the single button publishers put on their site, but still allow all of their readers to follow them on *their* favorite reader.

### It's better for subscribers

SubToMe includes a [transparent registration mechanism](https://www.subtome.com/developers.html) so that once you use a subscribing application, SubToMe **remembers** it and will only show the services you used, rather than an infinite list of tools.

For example, if you are a [Kippt](https://kippt.com/) user, you can use [Feedleap](https://feedleap.herokuapp.com) to save your favorite feeds content there. Feedleap [implemented](https://github.com/jpadilla/feedleap/commit/8b57d5096a9834e9821c9a111f9306aeb0245973) the registration mechanism. Once you've set up a Feedleap account, click on  <input type="button" onclick="(function(){var z=document.createElement('script');z.src='https://www.subtome.com/load.js';document.body.appendChild(z);})()" value="Follow this site!" />. You will now see that Feeleap is an option there :)

<p>
<img src="http://f.cl.ly/items/3T3r2N323P3o471F2T32/Screen%20Shot%202013-04-02%20at%206.19.04%20PM.png" /> </p>


Several other readers, like [The Old Reader](http://theoldreader.com/) or [Msgboy](http://msgboy.com/) implement that registration mechanism. **This makes following sites easier**.







