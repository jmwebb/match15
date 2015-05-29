'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'myApp.view1',
  'firebase'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .otherwise({
            redirectTo: '/view1'
          });
  }])
    .constant('FIREBASE_URL', 'https://dazzling-fire-5423.firebaseio.com');
