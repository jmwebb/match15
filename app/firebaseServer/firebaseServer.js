/**
 * Created by santi on 5/29/15.
 */
angular.module('myApp').factory('FirebaseServer', function($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var posts = $firebase(ref.child('posts')).$asArray();

    var Post = {
        all: posts,
        create: function (post) {
            return posts.$add(post);
        },
        get: function (postId) {
            return $firebase(ref.child('posts').child(postId)).$asObject();
        },
        delete: function (post) {
            return posts.$remove(post);
        }
    };

    return Post;
});

