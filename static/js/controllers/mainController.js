
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

        $scope.getList = function() {
            gapi.client.events.greetings.listGreeting().execute(function(resp) {
                $scope.results = resp.items;
                console.log($scope.results);
            });
        };
    });


angular.module('myApp')
    .controller('AboutCtrl', function($scope) {
        $scope.message = 'this is the about controller';
    });
