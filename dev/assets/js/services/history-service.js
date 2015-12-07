angular.module('app.historyService', [])
    .run(['$rootScope', '$location', '$state', '$stateParams', 'DEFAULTS', 'toaster',
        function($rootScope, $location, $state, $stateParams, DEFAULTS, toaster) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                // Save previous state 
                $rootScope.history = $rootScope.history || [];

                if (toState != fromState && fromState.name) {
                    if ($rootScope.usedBackButton) {
                        $rootScope.usedBackButton = false;
                    } else {
                        var recentHistory = _.last($rootScope.history);
                        if (!recentHistory || (recentHistory.state != fromState)) {
                            $rootScope.history.push({
                                state: fromState,
                                params: fromParams
                            })
                        }
                        if ($rootScope.history.length > 10) $rootScope.history.shift();
                    }
                }

                String.prototype.capitalize = function() {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                }
            })

            // Back function
            $rootScope.previousState = function() {
                var recentHistory = _.last($rootScope.history);
                $rootScope.history = _.without($rootScope.history, recentHistory);
                $rootScope.usedBackButton = true;

                var previousState, previousStateParams;

                if (recentHistory) {
                    previousState = recentHistory.state;
                    previousStateParams = recentHistory.params;
                } else {
                    var currentState = $state.current.name.split('.');
                    if (_.contains(currentState, 'subscriptions')) {
                        var currentStateParent = _.first(currentState, currentState.length - 1).join('.');
                    } else {
                        var currentStateParent = _.first(currentState, currentState.length - 2).join('.');
                    }
                    previousState = currentStateParent;
                }

                $state.go(previousState, previousStateParams);
            }
        }
    ]);
