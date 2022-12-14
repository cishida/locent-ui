'use strict';

angular.module('app', [
        '720kb.datepicker',
        'currencyMask',
        'ngAnimate',
        'ngDialog',
        'ngStorage',
        'restangular',
        'toaster',
        'chart.js',
        'ui.bootstrap',
        'ui.paging',
        'ui.directives',
        'ui.gravatar',
        'ui.router',
        'modal.controllers',
        'app.localService',
        'app.historyService',
        'app.authService',
        'app.notificationService',
        'app.apiFactories',
        'app.access',
        'app.keyword',
        'app.clearcart',
        'app.safetext',
        'app.settings',
        'app.campaigns',
        'app.dashboard'
    ])
    .constant('DEFAULTS', {
        'CURR': 'NGN ',
        'baseURL': settings.baseApiUrl,
        'liveURL': settings.liveApiUrl
    })
    .config(['$urlRouterProvider', '$httpProvider', 'RestangularProvider', '$locationProvider', '$stateProvider', 'ngDialogProvider', 'gravatarServiceProvider', 'ChartJsProvider',
        function($urlRouterProvider, $httpProvider, RestangularProvider, $locationProvider, $stateProvider, ngDialogProvider, gravatarServiceProvider, ChartJsProvider) {

            $urlRouterProvider
                .when('', ['$state', function($state) {
                    $state.go('access.login');
                }]);
            $urlRouterProvider.otherwise('/404');

            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-plain',
                showClose: false,
            });

            gravatarServiceProvider.defaults = {
                size: 100,
                "default": 'mm'
            };

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                if (data && data.response) {
                    var returnedData = data.response.data;
                    if (data.response.meta) returnedData.meta = data.response.meta;
                    return returnedData;
                } else {
                    return data;
                };
            });

            var fontFamily = '"Lato", Helvetica, Arial, sans-serif';
            ChartJsProvider.setOptions({
                scaleBeginAtZero: true,
                scaleShowVerticalLines: false,
                scaleShowLabels: false,
                responsive: true,
                maintainAspectRatio: false,
                bezierCurve: false,
                tooltipFontFamily: fontFamily,
                scaleFontFamily: fontFamily,
                pointDotRadius: 5,
                pointDotStrokeWidth: 2,
                colours: ['#2D91D9'],
                multiTooltipTemplate: function(label) {
                    return label.datasetLabel + ': ' + "N" + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
                tooltipTitleFontFamily: fontFamily,
                tooltipTitleFontStyle: "normal",
                tooltipCornerRadius: 3,
                tooltipXPadding: 10,
                tooltipYPadding: 10,
            });

            $stateProvider.state('app', {
                abstract: true,
                templateUrl: 'components/layout/base.html',
                data: {
                    authenticable: true
                }
            })
        }
    ])
    .run(['$rootScope', '$location', '$state', '$stateParams', 'DEFAULTS', 'toaster', 'Auth', '$timeout',
        function($rootScope, $location, $state, $stateParams, DEFAULTS, toaster, Auth, $timeout) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.Date = Date;
            $rootScope.DEFAULTS = DEFAULTS;

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.showSidebar = false;
                $rootScope.loadingNextState = true;
                Auth.authorize(event, toState, toParams);

                // Go home if login
                if (toState.name == 'access.login' && Auth.isLoggedIn()) {
                    event.preventDefault();
                    $state.go('app.dashboard');
                }

                // If it's a parent state, redirect to it's child
                if (toState.redirectTo) {
                    event.preventDefault();
                    var params = toParams;
                    if (!_.isEmpty(fromParams)) _.extend(toParams, $location.search());
                    $state.go(toState.redirectTo, params);
                    return;
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                $timeout(function() {
                    $rootScope.loadingNextState = false;
                }, 300)
                $rootScope.$state.activeParams = _.some(_.values($stateParams));
            })
        }
    ])
    .controller('AppCtrl', ['$scope', '$localStorage', '$window', '$state', '$stateParams', '$rootScope', 'Auth', '$timeout',
        function($scope, $localStorage, $window, $state, $stateParams, $rootScope, Auth, $timeout) {

            // Config
            $scope.app = {
                name: 'Locent Dashboard',
                version: '1.0.0',
                slogan: 'Locent Dashboard'
            }

            //Logout
            $scope.logout = function() {
                Auth.logout();
                $state.go('access.login');
            }

            // Sidebar toggle
            $scope.toggleSidebar = function() {
                $rootScope.showSidebar = !$rootScope.showSidebar;
            }

            // Close transition
            $scope.closePopup = function(callback) {
                $scope.closingPopup = true;
                $timeout(function() {
                    $scope.closingPopup = false;
                }, 300)
            }
        }
    ]);
