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
.controller('SafetextMessagesCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
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

.controller('SafetextCustomersCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParam) {
    $scope.names = ["Matt Clark", "Richard Ford", "David Chang", "Olga Schwartz", "Jamie Lynch", "Jean Roberson", "Matt Clark", "Richard Ford", "David Chang", "Olga Schwartz", "Jamie Lynch", "Jean Roberson", "Matt Clark", "Richard Ford", "David Chang", "Olga Schwartz", "Jamie Lynch", "Jean Roberson"]
}])
.controller('SafetextLogsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.logs = [{
        customerName: 'Opemipo Aikomo',
        orderItem: 'Macbook Pro, Macbook Air',
        time: 'January 8th 2015',
        status: 'success',
    }, {
        customerName: 'Oladele Tobi',
        orderItem: 'Ipad mini',
        time: 'January 8th 2015',
        status: 'success',
    }, {
        customerName: 'Ore Oyelaja',
        orderItem: 'Mac',
        time: 'January 8th 2015',
        status: 'failed',
    }, {
        customerName: 'Shope Johnson',
        orderItem: 'Iphone 6s',
        time: 'January 8th 2015',
        status: 'success',
    }, {
        customerName: 'Philip Badu',
        orderItem: 'Beats by Dre',
        time: 'January 8th 2015',
        status: 'success',
    }, {
        customerName: 'Herbert Macualay',
        orderItem: 'Zashadu Bag',
        time: 'January 8th 2015',
        status: 'success',
    }]
}])



