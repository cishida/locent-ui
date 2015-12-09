angular.module('app.safetext', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.safetext', {
            url: '/safetext-checkout',
            templateUrl: 'modules/safetext/index.html',
            controller: 'SafetextCtrl',
            redirectTo: 'app.safetext.analytics'
        }).state('app.safetext.analytics', {
            url: '/analytics',
            templateUrl: 'modules/safetext/analytics.html',
            controller: 'SafetextAnalyticsCtrl'
        }).state('app.safetext.messages', {
            url: '/messages',
            templateUrl: 'modules/safetext/messages.html',
            controller: 'SafetextMessagesCtrl'
        }).state('app.safetext.options', {
            url: '/options',
            templateUrl: 'modules/safetext/options.html',
            controller: 'SafetextOptionsCtrl'
        })
    }
])

.controller('SafetextCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    console.log("safetext View")
}])
.controller('SafetextAnalyticsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = [
        [0, 0, 0, 0, 0, 0, 0]
    ];
}])
.controller('SafetextMessagesCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {}])

.controller('SafetextOptionsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParam) {}])
