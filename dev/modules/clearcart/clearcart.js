angular.module('app.clearcart', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.clearcart', {
            url: '/clearcart-checkout',
            templateUrl: 'modules/clearcart/index.html',
            controller: 'clearcartCtrl'
        })
    }
])

.controller('clearcartCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    console.log("clearcart View")
}])
