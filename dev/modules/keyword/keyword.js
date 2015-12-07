angular.module('app.keyword', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.keyword', {
            url: '/keyword-checkout',
            templateUrl: 'modules/keyword/index.html',
            controller: 'keywordCtrl'
        })
    }
])

.controller('keywordCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    console.log("keyword View")
}])
