angular.module('myApp')
    .factory('eventapi', function($q) {
        return {
            init: function() {
                console.log('eventapi.init called');
                var endpointDefer = $q.defer();
                var oauthLoadDefer = $q.defer();

                // load endpoints api
                gapi.client.load('events', 'v1', function() {
                    endpointDefer.resolve(gapi);
                }, '//' + window.location.host + '/_ah/api');

                // load oauth2 api
                gapi.client.load('oauth2', 'v2', function() {
                    oauthLoadDefer.resolve(gapi);
                });

                var chain = $q.all([
                    endpointDefer.promise,
                    oauthLoadDefer.promised
                ]);
                return chain;
            }
        };
    });
