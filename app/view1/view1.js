'use strict';

angular.module('myApp')
//    .view1', ['ngRoute', 'firebase'])
//


.controller('View1Ctrl', function($scope, $http, $firebaseObject, $firebaseAuth, importNames, FIREBASE_URL, $modal) {

    $scope.showRules = false;
    $scope.choicesLust = ['choice0', 'choice1', 'choice2', 'choice3', 'choice4', 'choice5', 'choice6', 'choice7', 'choice8', 'choice9'];

    $scope.choicesFriends = [ 'choice10', 'choice11', 'choice12', 'choice13', 'choice14'];




    $scope.loadUser = function() {

        //var userName = $('#userName').text();
        var userName = 'Santiago Seira Silva-herzog';
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
        // split name into firstmMiddleLast
        // eliminate any . .", "#", "$", "[", or "]".git
        //var user_ref = new Firebase(FIREBASE_URL + '/' + $scope.userName.replace(/\W/g, ''));

        var user_ref = new Firebase(FIREBASE_URL + '/sdfasd');        // for development

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
    $scope.loadUser();
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

  $scope.startsWith = function(string, viewValue) {
    if (typeof(string) == 'string') {
      var words = string.split(" ");

      var startsWith = false;
      words.forEach(function(word) {
        if (word.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase()) {
          startsWith = true;
        }
      });

    if(string.toLowerCase().indexOf(viewValue.toLowerCase()) > -1){
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