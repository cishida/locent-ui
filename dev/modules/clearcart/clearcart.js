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
        }).state('app.clearcart.customers', {
            url: '/customers',
            templateUrl: 'modules/clearcart/customers.html',
            controller: 'ClearcartCustomersCtrl'
        }).state('app.clearcart.logs', {
            url: '/logs',
            templateUrl: 'modules/clearcart/logs.html',
            controller: 'ClearcartLogsCtrl'
        })
    }
])

.controller('ClearcartCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {}])
.controller('ClearcartAnalyticsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = [
        [50, 60, 50, 60, 30, 30, 90]
    ];
}])
.controller('ClearcartMessagesCtrl', ['$state', '$scope', '$stateParams', 'Auth', 'MockAPI', function($state, $scope, $stateParams, Auth, MockAPI) {

    MockAPI.all('options').getList().then(function(response){
        $scope.options = response;
    }, function(error){
           
        });

    MockAPI.all('sample_data').getList().then(function(response){
        $scope.sample = response;
    }, function(error){
           
        });

    $scope.add = function(key) {
        $scope.selected.message += "[" + key + "]"
    }

    $scope.preview = function(message) {
        message += " Ordinary msg&data rates may apply. Reply HELP for help. Reply STOP to unsubscribe.";
        return message.replace(/\[(.+?)\]/g, function($0, $1) {
            return $scope.sample[$1] || ""
        })
    }
}])

.controller('ClearcartCustomersCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
    MockAPI.all('customers').getList().then(function(response){
        $scope.customers = response;
    }, function(error){
           
        });
}])
.controller('ClearcartLogsCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
   MockAPI.all('logs').getList().then(function(response){
        $scope.logs = response;
    }, function(error){
           
        });
}])




