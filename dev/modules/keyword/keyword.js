angular.module('app.keyword', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.keyword', {
            url: '/keyword-checkout',
            templateUrl: 'modules/keyword/index.html',
            controller: 'KeywordCtrl',
            redirectTo: 'app.keyword.analytics'
        }).state('app.keyword.analytics', {
            url: '/analytics',
            templateUrl: 'modules/keyword/analytics.html',
            controller: 'KeywordAnalyticsCtrl'
        }).state('app.keyword.messages', {
            url: '/messages',
            templateUrl: 'modules/keyword/messages.html',
            controller: 'KeywordMessagesCtrl'
        }).state('app.keyword.options', {
            url: '/options',
            templateUrl: 'modules/keyword/options.html',
            controller: 'KeywordOptionsCtrl'
        })
    }
])

.controller('KeywordCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {}])

.controller('KeywordAnalyticsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = [
        [0, 0, 0, 0, 0, 0, 0]
    ];
}])

.controller('KeywordMessagesCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {}])

.controller('KeywordOptionsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.preview = "Hello Opemipo Aikomo, We received your order and we assure you that we working on fixing this problem.";
}])
