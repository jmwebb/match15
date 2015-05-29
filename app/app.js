'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'myApp.view1'
    //'myApp.validators'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .otherwise({
            redirectTo: '/view1'
          });
  }])
    .factory('importNames', function($http) {
      var promise;
      var jsondata = {
        get: function() {
          if ( !promise ) {
            return $http.get('names_emails.json');
            //  .success(function(response) {
            //    var name_emailJSON = response;
            //    var names_emails = [];
            //    name_emailJSON.forEach(function(name_email) {
            //      var name = name_email.current_name_sort; // names come last, first, middle?
            //      var email = name_email.pref_email;
            //      var name_array = name.split(',');
            //
            //      if (name_array.length == 3) {   // has a middle name
            //        var first_name = name_array[1];
            //
            //        name_array[1] = name_array[2]         //  middle name to the middle
            //        name_array[2] = name_array[0];        //  last names moves last
            //        name_array[0] = first_name;
            //
            //      } else {     // no middle name
            //        var first_name = name_array[1];
            //        name_array[1] = name_array[0];
            //        name_array[0] = first_name;
            //      }
            //      name = name_array.join(' ');
            //
            //      var name_emailObj = {};
            //      name_emailObj.name = name;
            //      name_emailObj.email = email;
            //      names_emails.push(name_emailObj);
            //    });
            //    return names_emails; //names_emails;
            //  });
            //return promise; //promise;
          }
        }
      };
      return jsondata;
    })



;

//if('production' == app.get('env')) {
//  app.use(express.static(path.join(__dirname, '/dist')));
//}