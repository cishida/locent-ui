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
            controller: 'KeywordAnalyticsCtrl',
            resolve: {
                metrics: ['MockAPI', function(MockAPI) {
                    return MockAPI.one('keyword_metrics').get();
                }]
            }
        }).state('app.keyword.customers', {
            url: '/customers',
            templateUrl: 'modules/keyword/customers.html',
            controller: 'KeywordCustomersCtrl'
        }).state('app.keyword.messages', {
            url: '/messages',
            templateUrl: 'modules/keyword/messages.html',
            controller: 'KeywordMessagesCtrl'
        }).state('app.keyword.orders', {
            url: '/orders',
            templateUrl: 'modules/keyword/orders.html',
            controller: 'KeywordOrdersCtrl'
        }).state('app.keyword.products', {
            url: '/products',
            templateUrl: 'modules/keyword/products.html',
            controller: 'KeywordProductsCtrl'
        }).state('app.keyword.create-product', {
            url: '/create-product',
            templateUrl: 'modules/keyword/create-product.html',
            controller: 'KeywordCreateProductsCtrl'
        })
    }
])

.controller('KeywordCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {}])

.controller('KeywordAnalyticsCtrl', ['$state', '$scope', '$stateParams', 'metrics', function($state, $scope, $stateParams, metrics) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = [
        [50, 60, 50, 60, 30, 30, 90]
    ];
    $scope.metrics = metrics;
}])

.controller('KeywordCustomersCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
    MockAPI.all('customers').getList().then(function(response) {
        $scope.customers = response;
    }, function(error) {

    });
}])

.controller('KeywordOrdersCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
    MockAPI.all('orders').getList().then(function(response) {
        $scope.orders = response;
    }, function(error) {

    });
}])

.controller('KeywordMessagesCtrl', ['$state', '$scope', '$stateParams', 'Auth', 'MockAPI', function($state, $scope, $stateParams, Auth, MockAPI) {

    MockAPI.all('options').getList().then(function(response) {
        $scope.options = response;
    }, function(error) {

    });

    MockAPI.all('sample_data').getList().then(function(response) {
        $scope.sample = response;
    }, function(error) {

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

.controller('KeywordProductsCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams, MockAPI) {
    $scope.load = true;

    MockAPI.all('products').getList().then(function(response) {
        $scope.products = response;
    }, function(error) {

    });
}])

.controller('KeywordCreateProductsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.load = true;
    $scope.create = function() {

    }
}])
