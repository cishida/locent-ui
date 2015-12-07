angular.module('app.authService', [])
    .run(['$rootScope', '$state', 'Notification', 'LocalService', 'ngDialog',
        function($rootScope, $state, Notification, LocalService, ngDialog) {
            $rootScope.$on('re-authenticate', function(event, nextState) {
                var isUsingApp = LocalService.get('current_session') != null && $rootScope.history.length > 0;
                if (isUsingApp) {
                    ngDialog.openConfirm({
                        template: '/modules/access/modals/re-authenticate.html',
                        controller: 'ReAuthenticateCtrl'
                    }).then(function() {
                        if (nextState) {
                            $state.go(nextState.state, nextState.params);
                        } else $state.reload();
                    });
                } else {
                    LocalService.unset('current_session');
                    $state.go('access.login');
                    Notification.clear();
                    Notification.pop({
                        type: 'error',
                        title: 'Your session expired',
                        body: "Please Log in again",
                        timeout: 0
                    })
                }
            })
        }
    ])
    .factory('Auth', ['LocalService', '$q', '$state', '$rootScope', 'MockAPI',
        function(LocalService, $q, $state, $rootScope, $API) {
            return {
                authorize: function(event, state, params) {
                    if (this.isAuthenticable(state) && state.redirectTo == null) {
                        var authFactory = this;
                        var session = angular.fromJson(LocalService.get('current_session'));
                        $rootScope.currentSession = session;

                        if (!session) {
                            event.preventDefault();
                            $state.go('access.login');
                        } else if (this.sessionExpired()) {
                            authFactory.refreshToken(session.token).then(function(response) {
                                authFactory.save(response);
                            }, function() {
                                event.preventDefault();
                                $rootScope.$broadcast('re-authenticate', {
                                    state: state,
                                    params: params
                                });
                            });
                        }
                    } else {
                        var stateName = state.name.split('.');
                        if (_.contains(stateName, 'access') && this.isLoggedIn()) {
                            $state.go('app.dashboard');
                        }
                    }
                },
                isAuthenticable: function(state) {
                    return state.data && state.data.authenticable
                },
                sessionExpired: function() {
                    var authFactory = this;
                    var currentDate = new Date();
                    var session = angular.fromJson(LocalService.get('current_session'));
                    var expiry = new Date(session.expiry * 1000);
                    return currentDate > expiry
                },
                refreshToken: function(token) {
                    return $API.all('refresh_token').post({
                        token: token
                    })
                },
                login: function(credentials) {
                    var authFactory = this;
                    var deferred = $q.defer();
                    $API.one('login').get(credentials).then(function(response) {
                        var auth = response;
                        authFactory.save(auth, function() {
                            deferred.resolve(response);
                        });
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                isLoggedIn: function() {
                    return LocalService.get('current_session') != null
                },
                logout: function() {
                    LocalService.unset('current_session');
                },
                save: function(session, callback) {
                    LocalService.set('current_session', JSON.stringify(session));
                    $rootScope.currentSession = session;
                    if (callback) callback();
                }
            }
        }
    ])
    .factory('AuthInterceptor', ['$q', '$injector', 'LocalService', '$rootScope', 'Notification',
        function($q, $injector, LocalService, $rootScope, Notification) {
            return {
                responseError: function(response) {
                    if ((response.status === 401 || response.status === 403) && $rootScope.user) {
                        $rootScope.$broadcast('re-authenticate');
                    }
                    return $q.reject(response);
                }
            }
        }
    ])
    .config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        }
    ]);
