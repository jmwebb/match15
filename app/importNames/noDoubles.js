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

               var noDoubles = true;

                var track_doubles = {};
                angular.forEach($scope.user, function(value, key) {
                    if (track_doubles[value.email]){
                        noDoubles = false;
                    } else {
                        track_doubles[value.email] = "recorded";
                    }
                });

                return noDoubles;
            };
        }
    }
});