'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, importNames, FirebaseServer) {

  $scope.first_choice = "";



  $scope.choices = FirebaseServer.all;

  //$scope.choice1 = {};

  $scope.submitChoices = function () {
    FirebaseServer.create($scope.choice1).then(function () {
      console.log(FirebaseServer.all);
    });
  };

  $scope.deletePost = function (choice) {
    FirebaseServer.delete(choice);
  };

  $scope.submit = function() {
    console.log(FirebaseServer.all);
  };





  importNames.get().success(function(response) {
    var name_emailJSON = response;
    var names_emails = [];
    var suid_array = [];
    var suids = "";
    var namesWithoutSUIDS = [];
    name_emailJSON.forEach(function(name_email) {
      var name = name_email.current_name_sort; // names come last, first, middle?
      var email = name_email.pref_email;
      var name_array = name.split(',');

      if (name_array.length == 3) {   // has a middle name
        var first_name = name_array[1];

        name_array[1] = name_array[2]         //  middle name to the middle
        name_array[2] = name_array[0];        //  last names moves last
        name_array[0] = first_name;

      } else {     // no middle name
        var first_name = name_array[1];
        name_array[1] = name_array[0];
        name_array[0] = first_name;
      }
      name = name_array.join(' ');

      name = $scope.capitalizeEveryWord(name);

      // -----------------  emails to SUIDs separate into comma separated values-------------------------//

      var email_domain = email.split('@')[1];

      if (email_domain == 'stanford.edu') {
        suid_array.push(email.split('@')[0]);
      } else {
        namesWithoutSUIDS.push(name);
      }

      var name_emailObj = {};
      name_emailObj.name = name;
      name_emailObj.email = email;
      names_emails.push(name_emailObj);
    });

    suids = suid_array.join(',');
    var noSUID = namesWithoutSUIDS.join(', ');
    $scope.namesEmails = names_emails;
  });

  $scope.capitalizeEveryWord = function(string) {
      var words = string.split(" ");
      var arr = [];
      words.forEach(function(name) {
        var temp = name.toLowerCase();
        temp = temp.charAt(0).toUpperCase() + temp.substring(1);
        arr.push(temp);
      });
      return arr.join(" ");
  };



  //$scope.startsWith = function(state, viewValue) {
  //  //return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
  //};





});