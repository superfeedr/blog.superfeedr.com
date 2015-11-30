---
layout: post
title: "Podcast is RSS"
js_includes: []
tags: [podcast, rss, feed api, openweb]
---

2014 was the biggest year for **Podcasts** to date. Of course, this came from massively popular shows: [This American Life](http://www.thisamericanlife.org/podcast) and [Serial](http://serialpodcast.org/) come to mind, but more importantly, it came from the incredibly long tail of smaller or even niche podcasts thousands of indie people create out there. Platforms like [Soundcloud](https://soundcloud.com/) are  to Podcasts what Tumblr is to blogs.

Podcasts are also incredibly popular because they are perfectly fit to the smartphone form factor. Not only the un-removable iTunes is a podcast player on *every* iOS device, but other popular applications like [Marco](http://www.marco.org/)'s [Overcast](https://overcast.fm/) are showing that there's room in the shade of Apple. On Android too there are a lot of amazing apps like [Player.fm](https://player.fm/) or the oldtimers like [Stitcher](https://www.stitcher.com/) (or [uPod](https://play.google.com/store/apps/details?id=mobi.upod.app)).

The amazing feat about podcasts is that *almost everyone* knows about them and understands what they are... even though *almost no-one* knows that a podcasts is an RSS feed with media elements (the soundtrack mostly!).

For example, here's the latest entry of our beloved [Radiolab](http://www.radiolab.org/)'s podcasts:

{% prism markup %}
<item>
  <title>Radiolab Presents: Invisibilia</title>
  <link>http://feeds.wnyc.org/~r/radiolab/~3/CzhLHp0z_p4/</link>
  <description>The lines between boy and girl can be blurry but NPR's Invisibilia introduces us to someone with a very new idea of how blurry they can be.&lt;img src="//feeds.feedburner.com/~r/radiolab/~4/CzhLHp0z_p4" height="1" width="1" alt=""/&gt;</description>
  <pubDate>Fri, 09 Jan 2015 17:26:17 -0500</pubDate>
  <guid isPermaLink="false">http://www.radiolab.org/story/invisibilia/</guid>
  <category>gender</category>
  <category>invisibilia</category>
  <category>psychology</category>
  <category>science</category>
  <category>storytelling</category>
  <media:content url="http://feeds.wnyc.org/~r/radiolab/~5/q91CLJH0xHc/radiolab_podcast15invisibilia.mp3" type="audio/mpeg" />
  <media:description type="plain">Radiolab Presents: Invisibilia</media:description>
  <media:thumbnail url="https://media2.wnyc.org/i/130/130/c/80/1/invisibiliasquare.jpg" width="130" height="130" />
  <itunes:duration>31:43</itunes:duration>
  <itunes:summary>Former Radiolab producer Lulu Miller and NPR reporter Alix Spiegel come to the studio to give us a sneak peak of their new show, Invisibilia. Invisibilia has an upcoming episode about categories, so Alix tells us a story about two very basic categories: boy and girl. We've heard lots of stories about the sometimes blurry boundaries between boy and girl, but Alix introduces us to someone who experiences those categories in a way that was totally, completely new to us.</itunes:summary>
  <description>The&amp;nbsp;lines between&amp;nbsp;boy and girl can be blurry but NPR's Invisibilia&amp;nbsp;introduces us to someone&amp;nbsp;with a&amp;nbsp;very&amp;nbsp;new idea of how blurry they can be.</description>
  <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">WNYC, New York Public Radio</dc:creator>
  <itunes:explicit>no</itunes:explicit>
  <itunes:subtitle>The lines between boy and girl can be blurry but NPR's Invisibilia introduces us to someone with a very new idea of how blurry they can be.</itunes:subtitle>
  <itunes:author>WNYC, New York Public Radio</itunes:author>
  <itunes:keywords>Science,Technology,Philosophy,Education,radiolab,jad,abumrad,krulwich,Radio,Lab</itunes:keywords>
  <feedburner:origLink>http://www.radiolab.org/story/invisibilia/</feedburner:origLink>
  <enclosure url="http://feeds.wnyc.org/~r/radiolab/~5/q91CLJH0xHc/radiolab_podcast15invisibilia.mp3" length="0" type="audio/mpeg" />
  <feedburner:origEnclosureLink>http://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast15invisibilia.mp3</feedburner:origEnclosureLink>
</item>
{% endprism %}  

In a way, the **podcast ecosystem succeeded** where the rest of the RSS ecosystem failed: it was able to break through the glass ceiling of tech-aware crowd. My take is that this is almost only due to the fact that the word "**Podcast**" exists. 

However, next time you hear someone tell you "RSS is dead", just ask them about the latest podcast episode they listened to :)

