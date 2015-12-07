angular.module('app.safetext', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.safetext', {
            url: '/safetext-checkout',
            templateUrl: 'modules/safetext/index.html',
            controller: 'safetextCtrl'
        })
    }
])

.controller('safetextCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    console.log("safetext View")
}])
