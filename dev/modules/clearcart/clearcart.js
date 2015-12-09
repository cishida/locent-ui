angular.module('app.clearcart', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.clearcart', {
            url: '/clearcart-checkout',
            templateUrl: 'modules/clearcart/index.html',
            controller: 'ClearcartCtrl',
            redirectTo: 'app.clearcart.analytics'
        }).state('app.clearcart.analytics', {
            url: '/analytics',
            templateUrl: 'modules/clearcart/analytics.html',
            controller: 'ClearcartAnalyticsCtrl'
        }).state('app.clearcart.messages', {
            url: '/messages',
            templateUrl: 'modules/clearcart/messages.html',
            controller: 'ClearcartMessagesCtrl'
        }).state('app.clearcart.options', {
            url: '/options',
            templateUrl: 'modules/clearcart/options.html',
            controller: 'ClearcartOptionsCtrl'
        })
    }
])

.controller('ClearcartCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])
.controller('ClearcartAnalyticsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = [
        [0, 0, 0, 0, 0, 0, 0]
    ];
}])
.controller('ClearcartMessagesCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {}])

.controller('ClearcartOptionsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParam) {}])