---
layout: post
title: "HTTP Raw Body"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
description: "Most modern web frameworks and languages will make assumption about the body of HTTP POST requests and try to parse it. However, often, with webhooks, you'll want to access its raw version."
tags: debugging, webhook, pubsubhubbub, http
---

> The request is empty!

This is by far the **most frequent misunderstanding with PubSubHubbub**. They can see the HTTP POST request in their logs, but for some reason, they're unable to access its content. The reason for this is that most web frameworks and languages assume that POST requests are sent by forms and will usually expose the *parsed* version of the raw body. If they can't parse it (because the `Content-Type` header does not match), they'll show it as empty.

For each language and framework, we list the ways to access the raw body of an HTTP post request. 

### PHP

PHP exposes `$_POST` but that's hopelessly empty when the data is not `multipart/form-data` or `application/x-www-form-urlencoded`. The [PHP docs](http://php.net/manual/en/wrappers.php.php#wrappers.php.input) are pretty clear: you need to use `php://input` which is a is a read-only stream.

{% prism php %}
$entityBody = file_get_contents('php://input');
{% endprism %}

However, the trick is that this stream can only be *read once*, so if you do it, make sure you copy the data somewhere so you can access it again. Unfortunately, frameworks are probably already reading from that stream.

#### Symphony

[Symphony](http://symfony.com/) provides `Request` objects to access the internals of the HTTP requests. These objects have a [getContent](http://api.symfony.com/2.0/Symfony/Component/HttpFoundation/Request.html#method_getContent) method which you can use to access the string representation of the raw body. [Laravel](http://laravel.com/), [Drupal](https://www.drupal.org/), [eZPublish](http://ez.no/) and all PHP frameworks based on Symphony use a similar mechanism.

{% prism php %}
// Laravel example.
$request = Request::instance(); // Access the instance
$request->getContent(); // Get its content
{% endprism %}

#### CakePHP

[Cake](http://cakephp.org/) uses another approach and lets you [define a callback](http://book.cakephp.org/2.0/en/controllers/request-response.html#CakeRequest::input) wich will be called to handle the data from the request:

{% prism php %}
// For JSON bodies, you'll want to use the json_decode function:
$json = $this->request->input('json_decode');
// For XML/Atom, you might use the builder:
$xml = $data = $this->request->input('Xml::build', ...);
{% endprism %}

### Node.js

[Node.js](https://nodejs.org/) is one of these platforms which do not try to parse the raw body of the POST request. By default, Node does not even *read* the body of POST requests.

Here's an example of a very basic echo server. The only trick is that the data may have been truncated, which means we need to append any data we get to a buffer.

{% prism javascript %}
var http = require('http');
var s = http.createServer(function (req, res) {
  var raw = '';
  req.on('data', function(d) {
    raw += d; 
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(raw);   
  });
});
s.listen(9999);
{% endprism %}

#### Express & Connect

[Express](http://expressjs.com/) (or anything built on [Connect](https://github.com/senchalabs/connect#readme)) provides a lot of syntactic sugar on top of Node's default HTTP APIs. However, you can always "revert" to the Node.js way which means you can use the technique above to get the raw body. Another popular option is to offload this to a middleware by using a *pipe*.

Here's an example which writes to a [concat stream](https://www.npmjs.com/package/concat-stream). We assign the full body to the request for handling further down the middleware chain.

{% prism javascript %}
var concat = require('concat-stream');
app.use(function(request, response, next){
  request.pipe(concat(function(data){
    request.body = data; 
    next();
  }));
});
{% endprism %}

#### Hapi

[Hapi](http://hapijs.com/) does not use middlewares but can be configured to handle POST requests differently. You should use one of the following values for the `payload` configuration:

* `parse` is the default. Hapi will assign both `rawBody` and `payload` to your requests objects with respectively a raw buffer of the POST body and its parsed value.
* `stream` lefts the POST body untouched. You can access Node's Reqest object using `raw.req` on the Request object.
* `raw` will just assign `rawBody` to the request object with the content of the body. 

### Ruby

Ruby itself does not provide an HTTP parsing library to handle requests outside of a web framework. 

#### Rack

Rack is the common denominator between [Ramaze](http://ramaze.net/), [Sinatra](http://www.sinatrarb.com/) and many other micro frameworks. It provides some helpers which can be convenient when handling HTTP requests, in the form of `Rack::Request`. If you're looking for the raw HTTP body, check the [rack.input](http://www.rubydoc.info/github/rack/rack/master/file/SPEC#The_Input_Stream). 

It's an IO stream which can be to read to access the content of the request. It's passed to the ruby object using `body` or `@env["rack.input"]`.

Here's a Sinatra example:

{% prism ruby %}
post "/path" do
  request.body.rewind  # back to the head, if needed
  data = request.body.read
  "#{data}" # echo server!
end
{% endprism %}

#### Rails

Ruby On Rails controllers have a `request` method to access the HTTP request object. These objects have a `raw_post` method to get the raw body of any request.

Our [Rails Engine](https://rubygems.org/gems/superfeedr_engine/) uses this exact technique to  [access the raw body](https://github.com/superfeedr/superfeedr-engine/blob/master/app/controllers/superfeedr_engine/pubsubhubbub_controller.rb#L21) and compute the signature.


### Python

Similar to Ruby, Python itself does not have an HTTP library.

#### Django

Django is arguable the most popular python web framework. For each request received, Django creates an [HttpRequest](https://docs.djangoproject.com/en/1.8/ref/request-response/#django.http.HttpRequest) object that contains metadata about the request. The `body` property contains the bytes of the raw request.

#### Flask

Flask is a microframework for Python. It's compliant with WSGI which is Python's main Web Server Gateway Interface.

{% prism python %}
from flask import Flask
app = Flask(__name__)
@app.route('/', methods=['POST'])
def parse_request():
    data = flask.request.get_data()

{% endprism %}

#### AppEngine

AppEngine is a popular platform for running Python applications. The framework and runtime provided by Google define a [RequestHandler Class](https://cloud.google.com/appengine/docs/python/tools/webapp/requesthandlerclass?csw=1), which can is instantiated for each request. Accessing the raw body is then trivial as it's a property of the request object.

Here's an example:

{% prism python %}

class myHandler(webapp.RequestHandler):
def __init__(self):
  ...
def post(self):
  return self.request.body

{% endprism %}


### Erlang

#### Cowboy

Accessing the [request body](http://ninenines.eu/docs/en/cowboy/1.0/guide/req_body/) is a snap in [Cowboy](https://github.com/ninenines/cowboy), a small, fast, modular HTTP server for Erlang applications.

Use the this call in your handler function:

{% prism Erlang %}
{ok, Body, Req2} = cowboy_req:body(Req1).
{% endprism %}


### Haskell

For web applications in the Haskell programming language there exists a shared [Web Application Interface](http://hackage.haskell.org/package/wai-3.0.2.3/docs/Network-Wai.html#v:requestBody), quite similar to what Rack is to Ruby.

#### Yesod

The Yesod web framework provides access to the Wai request in handlers. This lets you read the body into a lazy [ByteString](http://hackage.haskell.org/package/bytestring/docs/Data-ByteString-Lazy.html), so that you can start consuming the data while it's being received.

{% prism Haskell %}
import Yesod
import qualified Network.Wai as Wai

-- |Handler function
postEndpointR = do
  body <- getRequest >>= Wai.lazyRequestBody
{% endprism %}


### There's more!

We're missing several! Go, Scala, Java, Perl, .net, ASP... etc! Please, help us by leaving details in the comments or [by sending a pull request](https://github.com/superfeedr/blog.superfeedr.com/edit/master/_posts/2015-05-05-http-raw-body.markdown).
