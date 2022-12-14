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
            controller: 'KeywordCustomersCtrl',
            resolve: {
                customers: ['MockAPI', function(MockAPI) {
                    return MockAPI.all('customers').getList();
                }]
            }
        }).state('app.keyword.options', {
            url: '/options',
            templateUrl: 'modules/keyword/options.html',
            controller: 'KeywordOptionsCtrl'
        }).state('app.keyword.orders', {
            url: '/orders',
            templateUrl: 'modules/keyword/orders.html',
            controller: 'KeywordOrdersCtrl',
            resolve: {
                orders: ['MockAPI', function(MockAPI) {
                    return MockAPI.all('keyword_orders').getList();
                }]
            }
        }).state('app.keyword.products', {
            url: '/products',
            templateUrl: 'modules/keyword/products.html',
            controller: 'KeywordProductsCtrl',
            resolve: {
                products: ['MockAPI', function(MockAPI) {
                    return MockAPI.all('products').getList();
                }]
            }
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

.controller('KeywordCustomersCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', 'customers', function($state, $scope, $stateParams, MockAPI, customers) {
    $scope.customers = customers;
}])

.controller('KeywordOrdersCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', 'orders', function($state, $scope, $stateParams, MockAPI, orders) {
    $scope.orders = orders;
}])

.controller('KeywordSettingsCtrl', ['$state', '$scope', '$stateParams', 'Auth', 'MockAPI', function($state, $scope, $stateParams, Auth, MockAPI) {

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

.controller('KeywordProductsCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', 'products', function($state, $scope, $stateParams, MockAPI, products) {
    $scope.products = products;;
}])

.controller('KeywordCreateProductsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.load = true;
    $scope.create = function() {

    }
}])
