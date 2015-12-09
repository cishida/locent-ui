angular.module('app.dashboard', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/dashboard/index.html',
            controller: 'DashboardCtrl'
        })
    }
])

.controller('DashboardCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = {
        "today" : [70, 100, 30, 50, 60, 90, 10],
        "yesterday" : [70, 100, 40, 90, 60, 90, 10],
        "lastweek" : [70, 50, 30, 20, 60, 90, 10],
        "lastmonth" : [70, 10, 30, 90, 60, 90, 10]
    };
    $scope.series = ['Transaction Amount'];
}])
