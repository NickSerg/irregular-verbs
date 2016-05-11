'use strict';

angular.module('myApp.ruView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ruView', {
    templateUrl: 'ruView/ruView.html',
    controller: 'RuViewCtrl'
  });
}])

.controller('RuViewCtrl', [function() {

}]);