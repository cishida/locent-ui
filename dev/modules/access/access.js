angular.module('app.access', [])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('access', {
            url: '',
            abstract: true,
            templateUrl: 'modules/access/base.html'
        }).state('access.login', {
            url: '/login',
            templateUrl: 'modules/access/login.html',
            controller: 'LoginCtrl'
        }).state('access.signup', {
            url: '/signup',
            templateUrl: 'modules/access/signup.html',
            controller: 'SignupCtrl'
        })
    }
])

.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Notification',
    function($scope, $rootScope, $state, Auth, Notification) {
        $scope.credentials = {};

        $scope.login = function() {
            Notification.clear();
            Auth.login($scope.credentials).then(function(res) {
                $state.go('app.dashboard');
            }, function(error) {
                $scope.$broadcast('loggedIn', false);
                Notification.error('Could not login to your account', error);
            });
        };
    }
])

.controller('SignupCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'UserAPI', 'Notification',
    function($scope, $rootScope, $state, Auth, $API, Notification) {
        $scope.credentials = {};

        $scope.signup = function() {
            Notification.clear();
            $API.all('register').post($scope.credentials).then(function(result) {
                Auth.save(result.data, function() {
                    $state.go('app.dashboard');
                });
                Notification.success("Welcome to Locent", "Your account was created successfully")
            }, function(error) {
                $scope.$broadcast('accountCreated', false);
                Notification.error('Account could not be created', error);
            })
        };
    }
])

.controller('ReAuthenticateCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Notification',
    function($scope, $rootScope, $state, Auth, Notification) {
        $scope.credentials = {
            email: Auth.getUser().email
        };

        $scope.login = function() {
            Auth.login($scope.credentials).then(function(res) {
                $scope.confirm();
            }, function(error) {
                $scope.$broadcast('loggedIn', false);
                Notification.error('Could not login to your account', error);
            });
        };
    }
])
