
// init runs as soon as client.js loads
function init() {
    angular.element(document).ready(function() {
        // when document is ready
        // run initapi() specified inside the angular $window.initapi()
        window.initapi();
    });
}

angular.module('myApp')
    .controller('MainCtrl', function($scope, $window, eventapi) {

        $scope.greetingId = null;
        var CLIENT_ID = "605388530161-kcb09odvpb5fua2mragqqi1kfij6lbkn.apps.googleusercontent.com";

        $window.initapi = function() {
            // apply the effect of initapi
            $scope.$apply($scope.load_api);
        };

        $scope.load_api = function() {
            console.log('load_api() called');

            // use eventapi.init to load the 'events' service api
            eventapi.init()
                .then(function() {
                    $scope.backend_ready = true;
                    console.log('backend ready');
                });
        };

        $scope.getGreeting = function(greetingId) {
            gapi.client.events
                .greetings.getGreeting({'id': greetingId})
                .execute(function(resp) {
                    console.log(resp);
                });
        };

        $scope.getGreetingsList = function() {
            gapi.client.events
                .greetings.listGreeting().execute(function(resp) {
                    $scope.results = resp.items;
                    $scope.$apply($scope.results);
                    console.log($scope.results);
            });
        };

        $scope.signIn = function() {

            // gapi.auth.authorize offers build-in OAuth support
            // inside the Google Javascript client library.

            gapi.auth.authorize({
                client_id: CLIENT_ID,
                scope: 'https://www.googleapis.com/auth/userinfo.email',
                immediate: false
            }, function signInCallback() {
                // use the gapi client to retrieve the logged in user's info
                gapi.client.oauth2.userinfo.get().execute(function(resp) {
                        var results = resp.result;
                        $scope.profile = {};
                        $scope.profile.fullname = results.given_name + ' ' + results.family_name;
                        $scope.profile.email = results.email;
                        $scope.profile.photo = results.photo;
                        $scope.$apply($scope.profile);
                        console.log(resp);
                        console.log($scope.profile);
                });
            });
        };
    });


angular.module('myApp')
    .controller('AboutCtrl', function($scope) {
        $scope.message = 'this is the about controller';
    });
