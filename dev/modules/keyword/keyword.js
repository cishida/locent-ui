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
        }).state('app.keyword.customers', {
            url: '/customers',
            templateUrl: 'modules/keyword/customers.html',
            controller: 'KeywordCustomersCtrl'
        }).state('app.keyword.messages', {
            url: '/messages',
            templateUrl: 'modules/keyword/messages.html',
            controller: 'KeywordMessagesCtrl'
        }).state('app.keyword.campaigns', {
            url: '/campaigns',
            templateUrl: 'modules/keyword/campaigns.html',
            controller: 'KeywordCampaignsCtrl'
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

.controller('KeywordCustomersCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.names = ["Matt Clark", "Richard Ford", "David Chang", "Olga Schwartz", "Jamie Lynch", "Jean Roberson", "Matt Clark", "Richard Ford", "David Chang", "Olga Schwartz", "Jamie Lynch", "Jean Roberson", "Matt Clark", "Richard Ford", "David Chang", "Olga Schwartz", "Jamie Lynch", "Jean Roberson"]
}])

.controller('KeywordCampaignsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {}])

.controller('KeywordMessagesCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {

    $scope.options = [{
        title: 'Opt-in message',
        message: 'Hi [first_name], you left [product_title] in your cart and the price is changing soon. Text PAY to order it now!'
    }, {
        title: 'Welcome message',
        message: 'Hello, [first_name] and the rest of the message here.'
    }, {
        title: 'Opt-in Refusal message',
        message: 'Hello, [first_name] and the rest of the message here.'
    }, {
        title: 'Transactional message',
        message: 'Hello, [first_name] and the rest of the message here.'
    }, {
        title: 'Confirmation message',
        message: 'Hello, [first_name] and the rest of the message here.'
    }, {
        title: 'Cancellation message',
        message: 'Hello, [first_name] and the rest of the message here.'
    }]

    $scope.sample = {
        first_name: "Jean",
        last_name: "Clark",
        email: "jean@clark.com",
        product_title: "Sony Alpha a6000 Mirrorless Camera",
        product_price: "$10.00",
        product_description: "A brand-new, unused, unworn and undamaged item in the original packaging with the original tags attached"
    }

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
