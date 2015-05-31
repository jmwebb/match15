/**
 * Created by santi on 5/13/15.
 */
angular.module('myApp').directive('doYouEvenGoHere', function() {

    return {
        require : 'ngModel',
        link : function($scope, element, attrs, ngModel) {
            ngModel.$validators.atStanford = function(value) {

                if (typeof(value) == "undefined"
                    || value == "") {
                    return true;
                }
                var isValid = false;

                if(typeof(value.name) !== 'undefined') {        //typeform option chosen, object submitted

                    $scope.namesEmails.forEach(function(name_email) {
                        var name =  value.name.toLowerCase();
                        if (name_email.name.toLowerCase().indexOf(name) > -1) {
                            isValid =  true;
                        }
                    });
                } else {                // user input, string submitted
                    $scope.namesEmails.forEach(function(name_email) {
                        var name =  value.toString().toLowerCase();
                        if (name_email.name.toLowerCase().indexOf(name) > -1) {
                            isValid =  true;
                        }
                    });
                }

                return isValid;
            };
        }
    }
});