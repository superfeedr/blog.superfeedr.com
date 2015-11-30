---
layout: post
title: Rack Middleware for Superfeedr
categories: []
tags: [ruby, rack, sinatra, rails]
---

I am a bit ashamed that this comes so late... but it's always better late than never: we have a [rack middleware for Superfeedr](http://rubygems.org/gems/rack-superfeedr).

What it does is simple: *subscribe*, *unsubscribe* and help you *handle notifications* by hiding all the [PubSubHubbub](http://documentation.superfeedr.com/subscribers.html#webhooks) -complexity- magic. Since it's Rack, it should work with any Ruby web framework that supports Rack, including Rails and Sinatra.

{% prism ruby %}
require 'sinatra'
require 'rack-superfeedr'

use Rack::Superfeedr, { :host => "plant-leg.showoff.io", :login => "demo", :password => "demo", :format => "json", :async => false } do |superfeedr|
  set :superfeedr, superfeedr # so that we can use `settings.superfeedr` to access the superfeedr object in our application.
  
  superfeedr.on_notification do |notification|
    puts notification.to_s # You probably want to persist that data in some kind of data store...
  end
  
end

get '/hi' do
  "Hello World!" # Maybe serve the data you saved from Superfeedr's handler.
end

get '/subscribe' do
  settings.superfeedr.subscribe("http://push-pub.appspot.com/feed") 
end

get '/unsubscribe' do
  settings.superfeedr.unsubscribe("http://push-pub.appspot.com/feed")
end
{% endprism %}


Get it while it's hot: `gem install rack-superfeedr`, and check the code on [github](https://github.com/superfeedr/rack-superfeedr). If you build something awesome, please let us know and we'll link to it.

As you can see it's quite elegant :) 

**Update**: if you're using a Rails application, we suggest you use this [Superfeedr Engine](http://blog.superfeedr.com/consuming-rss-feeds-rails/) as it will handle a lot more things on your behalf.
