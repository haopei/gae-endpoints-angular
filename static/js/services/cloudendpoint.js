angular.module('myApp')
    .factory('eventapi', function($q) {
        return {
            init: function() {
                console.log('eventapi.init called');
                var endpointDefer = $q.defer();
                gapi.client.load('events', 'v1', function() {
                    endpointDefer.resolve(gapi);
                }, '//' + window.location.host + '/_ah/api');
                return endpointDefer.promise;
            }
        };
    });
