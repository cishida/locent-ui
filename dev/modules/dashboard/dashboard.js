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
    console.log("Dashboard View")
}])
