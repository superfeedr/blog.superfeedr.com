var app = angular.module('demo-app', ['ngSuperfeedr']);

app.config(["SuperfeedrProvider", function(Superfeedr) {
  Superfeedr.configure({
    login: "demo",
    token: "6ba4adcbdc8723a6bab99a826d53840e"
  });
}])

app.controller('listCtrl', function($scope, Superfeedr) {

  $scope.page = 1;
  $scope.formats = ['atom', 'json', ''];
  $scope.format = '';
  $scope.topic = 'http://push-pub.appspot.com/feed';
  $scope.callback = 'http://my.webhook.com/path';

  Superfeedr.list($scope.page, 'http%', function(result, data) {
    $scope.subscriptions = data;
  });

  $scope.next = function next() {
    $scope.page += 1;
    Superfeedr.list($scope.page, 'http%', function(result, data) {
      $scope.subscriptions = data;
    });    
  }

  $scope.previous = function previous() {
    $scope.page = Math.max(1, $scope.page - 1);
    Superfeedr.list($scope.page, 'http%', function(result, data) {
      $scope.subscriptions = data;
    });    
  }

  $scope.subscribe = function() {
    Superfeedr.subscribe($scope.topic, $scope.callback, {format: $scope.format}, function(error, result) {
      if(!error) {
        // Refesh list! Hum. Does it make sense? What if the user has more then the limit per page? We should show him the page on which the subscription was added....
        // As a matter of facts, the list is sorted by creation... so we should refresh to the *last* page.
        Superfeedr.list($scope.page, 'http%', function(result, data) {
          $scope.subscriptions = data;
        });
      }
    });
  }
});

app.controller('subscriptionController', function($scope, Superfeedr) {
  $scope.count = 0;

  $scope.retrieve = function retrieve() {
    Superfeedr.retrieve($scope.item.subscription.feed.url, {}, function(error, result) {
      $scope.item.subscription.feed.details = result;
    });
  };

  $scope.unsubscribe = function unsubscribe() {
    Superfeedr.unsubscribe($scope.item.subscription.feed.url, $scope.item.subscription.endpoint, {}, function(error, result) {
      if(!error) {
        $scope.$parent.subscriptions.splice($scope.$index, 1);
      }
    });
  }
});


app.controller('retrieveCtrl', function($scope, Superfeedr) {

  $scope.url = 'http://blog.superfeedr.com/atom.xml';
  
  $scope.retrieve = function() {
    Superfeedr.retrieve($scope.url, {format: 'json'}, function(error, result) {
      console.log(result);
      $scope.feed = result; 
    });
  }

});




