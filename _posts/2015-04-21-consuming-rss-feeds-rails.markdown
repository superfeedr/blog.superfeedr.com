---
layout: post
title: "Consuming RSS feeds in Rails Application"
description: "Agregating RSS feeds in a web application is easier than ever with the Superfeedr Rails Engine. Here's a tutorial on how to consume RSS/atom in a Ruby On Rails web application."
js_includes: []
tags: [ruby, rails, engine]
---

*Consuming RSS feeds in a web application* is often **complex** and requires *offline workers* or *queue systems* which are yet another infrastructure to maintain. This scheduling algorithm also means that this application will be "late" at detecting updates or will check the feeds too frequently for most publishers.

### A Rails Engine

As you know, [Superfeedr](https://superfeedr.com/) offers a **feed API** which you can now easily integrate in your Ruby on Rails application, using the [Superfeedr Engine](https://rubygems.org/gems/superfeedr_engine). From the [Ruby On Rails Guide](http://guides.rubyonrails.org/engines.html):

> Engines can be considered miniature applications that provide functionality to their host applications. A Rails application is actually just a "supercharged" engine, with the `Rails::application` class inheriting a lot of its behavior from `Rails::Engine`.

In practice, the Superfeedr Engine handles interactions with Superfeedr's endpoints on your behalf, while hiding details such as the callback URLs, the signatures and a couple other things. It lets you very easily:

 * subscribe to resources using your `ActiveRecord` objects,
 * unsubcribe form these resources,
 * retrieve the past content and entries from them,
 * handle notifications when the resources have been updated.

### How-to

#### Install

First, install the `gem` and its dependencies. Add the following line to your `Gemfile`: 

{% prism bash %}
gem 'superfeedr_engine'
{% endprism %}

And run:

{% prism bash %}
bundle install
{% endprism %}

#### Configure the engine

Create a configuration file: `config/initailizers/superfeedr_engine.rb` with the following content:

{% prism bash %}
SuperfeedrEngine::Engine.feed_class = "Feed" 
# Use the class you use for feeds. (Its name as a string)
# This class needs to have the following attributes/methods:
# * url: should be the main feed url
# * id: a unique id (string) for each feed (can be the primary key in your relational table)
# * secret: a secret which should never change and be unique for each feed. It must be hard to guess. (a md5 or sha1 string works fine!)

SuperfeedrEngine::Engine.base_path = "/superfeedr_engine/" 
# Base path for the engine don't forget the trailing / and make it hard to guess!

SuperfeedrEngine::Engine.host = "my-fancy-app.com" # Your hostname (no http). Used for webhooks! 
# When debugging, you can use tools like https://www.runscope.com/docs/passageway to share your local web server with superfeedr's API via a public URL

# Superfeedr username
SuperfeedrEngine::Engine.login = "demo" 

# Token value. Make sure it has the associated rights your application needs
SuperfeedrEngine::Engine.password = "8ac38a53cc32f91a6445e880fc6fc865"

# Scheme for your webhooks. Defaults to "http", but you should use https in production.
SuperfeedrEngine::Engine.scheme = "http"

# Port for your webhooks. Default to 80. Change it if you use another one or https!
SuperfeedrEngine::Engine.port = 80
{% endprism %}

#### Mount

Update routes in `config/routes.rb` to mount the Engine.

{% prism bash %}
mount SuperfeedrEngine::Engine => SuperfeedrEngine::Engine.base_path 
{% endprism %}

#### Subscribe, unsubscribe and receive notifications

You can call now perform the following calls from inside your application:

{% prism bash %}
# Will subscribe your application to the feed object and will retrieve its past content yielded as a JSON string in body.
body, ok = SuperfeedrEngine::Engine.subscribe(feed, {:retrieve => true}) 

# Will retrieve the past content of a feed (but you must be subscribed to it first)
body, ok = SuperfeedrEngine::Engine.retrieve(feed) 

# Will stop receiving notifications when a feed changes.
body, ok = SuperfeedrEngine::Engine.unsubscribe(feed) 
{% endprism %}

Finally, make sure your `SuperfeedrEngine::Engine.feed_class` has a `notified` method which will be called by the engine when new content is received by your application. You'll probably want to save the content of this notification. By default, this engine will subscribe to Superfeedr using the `JSON` format. Please check our [JSON schema](http://documentation.superfeedr.com/schema.html#json) for more details. 

Here's an example:

{% prism ruby %}

class Feed < ActiveRecord::Base
  has_many :entries, dependent: :destroy

  ##
  # When notified, we save the status of the feed and, for each item
  # we create a new entry by saving its title, atom_id, url and 
  # content.
  def notified params
    update_attributes(:status => params["status"]["http"])
    params['items'].each do |i|
      entries.create(:atom_id => i["id"], :title => i["title"], :url => i["permalinkUrl"], :content => i["content"])
    end
  end
end
{% endprism %}

### Full example

We deployed a very basic feed reader to [Heroku](https://heroku.com/) which uses this engine. Feel free to [check it out](https://cryptic-peak-7737.herokuapp.com/) to see how simple it is to consume RSS feeds in your Rails application with this engine. One of its great features is that it runs using a single [Dyno](https://devcenter.heroku.com/articles/dyno-size) (without any worker) and stays in Heroku's free tier.

It's [source code is also available](https://github.com/julien51/heroku-app-superfeedr-engine) in case you're looking for inspiration on how to implement things on your end!

We really believe it's never been easier to **consume RSS feeds in a Ruby on Rails application**.







