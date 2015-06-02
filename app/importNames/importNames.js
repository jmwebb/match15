/**
 * Created by santi on 5/29/15.
 */
angular.module('myApp').factory('importNames', function($http) {
    var promise;
    var jsondata = {
        get: function() {
            if ( !promise ) {
                return $http.get('importNames/names_emails.json');
            }
        }
    };
    return jsondata;
});