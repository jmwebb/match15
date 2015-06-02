'use strict';

angular.module('myApp')

.controller('View1Ctrl', function($scope, $http, $firebaseObject, importNames, FIREBASE_URL, $modal) {

    $scope.showRules = true;
    $scope.choices = ['choice0', 'choice1', 'choice2', 'choice3', 'choice4', 'choice5', 'choice6', 'choice7', 'choice8', 'choice9', 'choice10', 'choice11', 'choice12', 'choice13', 'choice14'];



    $scope.loadUser = function() {

        var userName = $('#userName').text();
        var userEmail = $('#userEmail').text();
        $scope.namesEmails.forEach(function(user) {
            if(userName.toLowerCase().indexOf(user.name.toLowerCase()) > -1) {                   // check name first as it is guaranteed by WebAuth
                $scope.userEmail = user.email;
                $scope.userName = user.name;
            } else if(userEmail.toLowerCase().indexOf(user.email.toLowerCase()) > -1) {          // check email if there is a discrepancy in name
                $scope.userEmail = user.email;
                $scope.userName = user.name;
            }
        });

        $scope.firstName =  $scope.userName.split(' ')[0];
        // eliminate any . .", "#", "$", "[", or "]".git
        var user_ref = new Firebase(FIREBASE_URL + '/' + $scope.userName.replace(/\W/g, ''));

        //var user_ref = new Firebase(FIREBASE_URL + '/testing');        // for development

        $scope.user = $firebaseObject(user_ref);

        // ----------- Checking if user has already submitted preferences -------------//
        $scope.user.$loaded().then(function() {
            if ($scope.user['submited']) {
                $scope.alreadySubmitted = true;
                $scope.submittedChoices = [];
                angular.forEach($scope.user, function(value, key) {
                    if (typeof(value.name) != 'undefined') {
                        $scope.submittedChoices.push(value.name);
                    }
                });
            } else {
                $scope.alreadySubmitted = false;
                $scope.loggedIn = true;
            }
        });
    };

    // -------submit choices ---------//
    $scope.open = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                user: function () {
                    return $scope.user;
                }
            }
        });

        modalInstance.result.then(function (choices) {
            $scope.submittedChoices = choices;
            $scope.submitChoices();
            $scope.justSubmitted = true;
        }, function () {
            // called on dismiss
        });

    };

    $scope.submitChoices = function () {
        $scope.user['submited'] = true;
        $scope.user.$save().then(function(ref) {
            //$scope.open();
        }, function(error) {
          console.log("Error:", error);
        });

      };




// -----------------  typeahead methods ----------------------------- //
  importNames.get().success(function(response) {
    var name_emailJSON = response;
    var names_emails = [];

    name_emailJSON.forEach(function(name_email) {
      names_emails.push(name_email);
    });
    $scope.namesEmails = names_emails;
    $scope.loadUser();
  });

  //$scope.capitalizeEveryWord = function(string) {
  //    var words = string.split(" ");
  //    var arr = [];
  //    words.forEach(function(name) {
  //      var temp = name.toLowerCase();
  //      temp = temp.charAt(0).toUpperCase() + temp.substring(1);
  //      arr.push(temp);
  //    });
  //    return arr.join(" ");
  //};

  $scope.startsWith = function(string, viewValue) {         //          eventually implement search skipping words...
    if (typeof(string) == 'string') {
      var words = string.split(" ");

      var startsWith = false;
      words.forEach(function(word) {
        if (word.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase()) {        //start search at beginning of every word
          startsWith = true;
        }
      });

      if(string.toLowerCase().indexOf(viewValue.toLowerCase()) > -1){           // continue search through words
          startsWith = true;
      }

      return startsWith;
    }
  };

})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, user) {

        $scope.user = user;
        $scope.submittedChoices = [];
        angular.forEach($scope.user, function(value, key) {
            if (typeof(value.name) != 'undefined') {
                $scope.submittedChoices.push(value.name);
            }
        });

        $scope.ok = function () {
            $modalInstance.close($scope.submittedChoices);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });