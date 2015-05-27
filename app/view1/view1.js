'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, importNames) {

  $scope.data = {
    '1':"",
    '2':"",
    '3':"",
    '4':"",
    '5':"",
    '6':"",
    '7':"",
    '8':"",
    '9':"",
    '10':"",
    '11':"",
    '12':"",
    '13':"",
    '14':"",
    '15':""
  };

  $scope.options = ['jared', 'maria is smelly', 'santi'];

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
    $scope.namesEmails =  names_emails;
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



  $scope.submit1 = function() {
    console.log($scope.choices);
    //$httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
    //$http.get('names_emails.json')
    //    .success(function(names_emailJSON) {
    //      console.log(names_emailJSON);
    //    })
    //    .error(function (error) {
    //      console.log(error);
    //    });

  };

  //$scope.startsWith = function(state, viewValue) {
  //  //return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
  //};






    //
    //  $scope.result = 'hidden'
    //  $scope.resultMessage;
    //  $scope.formData; //formData is an object holding the name, email, subject, and message
    //  $scope.submitButtonDisabled = false;
    //  $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    //
    //
    //  $scope.submit = function() {
    //$scope.submitted = true;
    //$scope.submitButtonDisabled = true;
    //    //var data = $.param($scope.formData);
    //    $http.post('test.php' );
    //
    ////if (contactform.$valid) {
    //  $http({
    //    method  : 'POST',
    //    //url     : window.location.href +'contact-form.php',
    //    url     : 'contact-form.php',
    //    data    : $.param($scope.formData),  //param method from jQuery
    //    headers: {'Content-Type': 'application/x-www-form-urlencoded'} //set the headers so angular passing info as form data (not request payload)
    //  }).success(function(data){
    //    console.log(data);
    //    if (data.success) { //success comes from the return json object
    //      $scope.submitButtonDisabled = true;
    //      $scope.resultMessage = data.message;
    //      $scope.result='bg-success';
    //    } else {
    //      $scope.submitButtonDisabled = false;
    //      $scope.resultMessage = data.message;
    //      $scope.result='bg-danger';
    //    }
    //  });
    //} else {
    //  $scope.submitButtonDisabled = false;
    //  $scope.resultMessage = 'Failed :( Please fill out all the fields.';
    //  $scope.result='bg-danger';
    //}
  //};




});