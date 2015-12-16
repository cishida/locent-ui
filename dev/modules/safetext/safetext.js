angular.module('app.safetext', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.safetext', {
            url: '/safetext-checkout',
            templateUrl: 'modules/safetext/index.html',
            controller: 'SafetextCtrl',
            redirectTo: 'app.safetext.customers'
        }).state('app.safetext.messages', {
            url: '/messages',
            templateUrl: 'modules/safetext/messages.html',
            controller: 'SafetextMessagesCtrl'
        }).state('app.safetext.customers', {
            url: '/customers',
            templateUrl: 'modules/safetext/customers.html',
            controller: 'SafetextCustomersCtrl'
        }).state('app.safetext.logs', {
            url: '/logs',
            templateUrl: 'modules/safetext/logs.html',
            controller: 'SafetextLogsCtrl'
        })
    }
])

.controller('SafetextCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    console.log("safetext View")
}])
.controller('SafetextAnalyticsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = [
        [50, 60, 50, 60, 30, 30, 90]
    ];
}])
.controller('SafetextMessagesCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
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

.controller('SafetextCustomersCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
    MockAPI.all('customers').getList().then(function(response){
        $scope.customers = response;
    }, function(error){
           
        });
}])
.controller('SafetextLogsCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
   MockAPI.all('logs').getList().then(function(response){
        $scope.logs = response;
    }, function(error){
           
        });
}])



