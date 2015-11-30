---
layout: post
title: Sinatra, Heroku and Superfeedr
categories: []
tags: [ruby, sinatra, heroku]
js_includes: []
---

This is a short tutorial on how to deploy an Sinatra web app that uses Superfeedr to Heroku. This app provides a very simple home page that lists the latests entries of some of your favorites sites. It's greatly inspired by the awesome [start.io](http://start.io/) from the awesome [Peter Vidani](http://petervidani.com/) and [Jacob
Bijani](http://jacobbijani.com/)

### Set up

We will use [Sinatra](http://www.sinatrarb.com/), the [Rack Superfeedr gem](https://github.com/superfeedr/rack-superfeedr), as well as Twitter's bootstrap for the layout, because I suck at making things
shinny.

Let's start first by creating the application on Heroku.

Create the repo:

{% prism bash %}
 mkdir start-page && cd start-page
 git init
 git add .
 git commit -m "init"
{% endprism %}

Create the application on Heroku:
{% prism bash %}
 heroku create —stack cedar
{% endprism %}

Add the hostname as an environment variable. It is used by the rack
middleware to build the callback urls:
{% prism bash %}
 heroku config:add HOST=<YOUR APP DOMAIN>
{% endprism %}
 Add the superfeedr addon:
{% prism bash %}
 heroku addons:add superfeedr
{% endprism %}

### Implementation

This implementation is minimalistic, feel free to look at the code
closely.

Let's add the files:

{% prism bash %}
touch app.rb
touch config.ru
touch Gemfile
mkdir views/ && touch views/index.erb
{% endprism %}

In <code>app.rb</code>:

{% prism ruby %}

require 'sinatra'
require 'rack-superfeedr'
require 'cgi'

configure do
  # Application settings
  set :host, ENV['HOST']
  set :login, ENV['SUPERFEEDR_LOGIN']
  set :password, ENV['SUPERFEEDR_PASSWORD']
  
  # List all the feeds you want to subscribe to below.
  set :feeds, [
    'http://blog.superfeedr.com/atom.xml',
    'https://github.com/superfeedr',
    'http://feeds.feedburner.com/avc',
    'http://push-pub.appspot.com/feed'
  ]
  # The datastore... (volatile for this application)
  set :stories, {} 
end

# We use JSON for the data format
use(Rack::Superfeedr, { :host => settings.host, :login => settings.login, :password => settings.password, :format => 'json', :async => true }) do |superfeedr| 
  superfeedr.on_notification do |notification|
    notification['items'].each do |item|
      settings.stories[CGI::escape(item['id'])] = item # keeping the story
    end
  end
  
  # Subscribing to all the feeds we want. 
  # Subscriptions are stateful, so we could avoid resubscribing them everytime we boot the application, 
  # but we want to keep this application stateless for demo purposes
  settings.feeds.each do |url|
    superfeedr.subscribe(url)
  end
end

# Home page
get '/' do
  erb :index
end

# Redirects. Important for marking the stories as read!
get '/read/:id' do
  if params[:id] && entry = settings.stories[params[:id]] 
    settings.stories.delete(params[:id])
    if url = entry['permalinkUrl']
      redirect to(entry['permalinkUrl'])
    end
  else
    halt 404
  end
end

{% endprism %}

In <code>config.ru</code>:

{% prism ruby %}
require './app'
run Sinatra::Application
{% endprism %}

In <code>Gemfile</code>:

{% prism ruby %}
source 'http://rubygems.org'
gem 'sinatra'
gem 'rack-superfeedr'
{% endprism %}

In <code>views/index.erb</code>:

{% prism markup %}
<!DOCTYPE html>
<html>
<head>
    <title>Start Page</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script src="http://twitter.github.com/bootstrap/1.4.0/bootstrap-dropdown.js"></script>
    <script src="http://twitter.github.com/bootstrap/1.4.0/bootstrap-alerts.js"></script>
    <link rel="stylesheet" href="http://twitter.github.com/bootstrap/1.4.0/bootstrap.min.css">
</head>
<body style="padding-top: 50px;">
    <section id="navigation">
        <div class="topbar-wrapper" style="z-index: 5;">
            <div class="topbar" data-dropdown="dropdown">
                <div class="topbar-inner">
                    <div class="container">
                        <h3><a href="/">Start Page</a></h3>
                        <ul class="nav">

                        </ul>
                    </div>
                </div><!-- /topbar-inner -->
            </div><!-- /topbar -->
        </div><!-- /topbar-wrapper -->
    </section>
    <div class="container">
        <% index = 0 %>
        <% settings.stories.each do |id, story| %>
        <% if (index % 3) == 0 %>
        <div class="row">
        <% end %>
            <div class="span5">  
                <h2><%= story["title"] %></h2>
                <p><%= (story["summary"].nil? || story["summary"] == ""  ? story["content"] : story["content"]).gsub(/<\/?[^>]*>/, "")[0..280] %></p>
                <p><a class="btn" href="/read/<%= CGI::escape(id) %>" target="_blank">Read &raquo;</a></p>
                              
            </div>
        <% if (index % 3) == 2 %>
        </div>
        <% end %>
        <% index += 1 %>
        <% end %>
    </div>
</body>
</html>
{% endprism %}

Let's commit all files.

{% prism bash %}
 git add .
 git commit -m "implemented" -a
{% endprism %}

### Deploying

That's the simplest part:

First, let's install the gems.
{% prism bash %}
 bundle install
 git add Gemfile.lock
 git commit -m "adding Gemfile.lock" -a
{% endprism %}

And push the code
{% prism bash %}
 git push heroku master
{% endprism %}

... And that's it!

Point your browser to your Heroku application. It is likely that you'll have to wait for the feeds you have added to have new content before you see it appear on your home page. The last step is to make this page your default start page in your favorite web browser.

Gotchas
-------

Heroku will put this application to sleep if you only use a single dyno... and since we store the entries in memory for now, that means you'll lose that data if the app goes idle. The solution is very simple: store the data, using another [Heroku addon](https://addons.heroku.com/)!

Of course, this is a very simple application and there is a ton of
little things that one can do to improve it:

* add the ability to dynamically subscribe to feeds
* show meta data, like the number of bit.ly clicks on each of the stories
* auto-refresh the page
* ...

The **Superfeedr Heroku addon** is still in alpha to this date, so if
you want to run, this, please [email us](http://superfeedr.com/about)
and we'll get you in!

