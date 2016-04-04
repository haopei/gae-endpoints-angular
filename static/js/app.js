app = angular.module('myApp', ['ngRoute']);

app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/about', {
            templateUrl: '/partials/about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
