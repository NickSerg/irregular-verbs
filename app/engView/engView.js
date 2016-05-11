'use strict';

angular.module('myApp.engView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/engView', {
        templateUrl: 'engView/engView.html',
        controller: 'EngViewCtrl'
    });
}])

.factory('Verbs', function ($http) {
    var verbs = {};    
    verbs.query = function () {
        return $http.get('irregular-verbs.json');
    };
    return verbs;
})

.controller('EngViewCtrl', ['$scope', 'Verbs', function($scope, Verbs) {
    Verbs.query().then(function (response) {
        var verbs = response.data;
        $scope.totalVerbs = verbs.length;
        $scope.countVerbs = Math.min(15, verbs.length);
        $scope.verbs = getVerbsForStudy(verbs, $scope.countVerbs);

        $scope.refreshQuestions = function () {
            $scope.showAnswers = false;
            $scope.verbs = getVerbsForStudy(verbs, $scope.countVerbs);
        };

        $scope.checkAnswers = function () {
            var mistakesCount = 0;
            $scope.verbs.forEach(function (verb) {
                [0, 1, 2].forEach(function (i) {
                    verb[i].correct = verb[i].input && verb[i].value.toLowerCase() === verb[i].input.toLowerCase();
                    if (!verb[i].correct)
                        mistakesCount++;
                });
            });

            $scope.mistakesCount = mistakesCount;
            $scope.showAnswers = true;
        };
    });
}]);

var getVerbsForStudy = function (verbs, count) {
    var indexes = [];
    while (indexes.length < verbs.length && indexes.length < count)
    {
        var i = randomInteger(0, verbs.length - 1);
        if(indexes.indexOf(i) == -1)
            indexes.push(i);
    }

    var verbsForStudy = indexes.map(function (item) {
        var verbForStudy = { 0:{}, 1:{}, 2:{} };
        verbForStudy[0].value = verbs[item].first;
        verbForStudy[1].value = verbs[item].second;
        verbForStudy[2].value = verbs[item].third;
        var form = randomInteger(0, 2);
        verbForStudy.answered = form;
        verbForStudy[form].input = verbForStudy[form].value;        
        return verbForStudy;
    });

    return verbsForStudy;
};

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};