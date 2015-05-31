'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'firebase'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        })
            .otherwise({
                redirectTo: '/view1'
            });
    }])
    .constant('FIREBASE_URL', 'https://dazzling-fire-5423.firebaseio.com');
