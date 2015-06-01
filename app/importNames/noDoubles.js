/**
 * Created by santi on 5/30/15.
 */
/**
 * Created by santi on 5/13/15.
 */
angular.module('myApp').directive('noDoubles', function() {

    return {
        require : 'ngModel',
        link : function($scope, element, attrs, ngModel) {
            ngModel.$validators.noDoubles = function(value) {
                if (typeof(value) == "undefined"
                    || value == "") {
                    return true;
                }

                var noDoubles = true;
                if(typeof(value.email) != 'undefined') {
                    var track_doubles = {};
                    angular.forEach($scope.user, function(user, key) {
                        if (value == "" || typeof(user) == 'undefined' || typeof(user.email) == 'undefined') {
                            // dont count invalid submissions
                        } else if (user.email == value.email && track_doubles[user.email]){
                            noDoubles = false;
                        } else {
                            track_doubles[user.email] = "recorded";
                        }
                    });
                }

                return noDoubles;
            };
        }
    }
});