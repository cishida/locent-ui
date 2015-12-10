angular.module('ui.directives', [])
    .directive('badge', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<span class="badge text-white text-capitalize" ng-class="label_class">{{status}}</span>',
            link: function($scope, element, attrs, controller) {
                $scope.status = attrs["status"] || "Unknown";
                $scope.label_class = attrs["class"] || "";
                switch ($scope.status) {
                    case "pending":
                        $scope.label_class += " btn-info"
                        break;
                    case "unpaid":
                        $scope.label_class += " btn-info"
                        break;
                    case "approved":
                        $scope.label_class += " btn-success"
                        break;
                    case "paid":
                        $scope.label_class += " btn-success"
                        break;
                    case "failed":
                        $scope.label_class += " btn-danger"
                        break;
                    case "active":
                        $scope.label_class += " btn-success"
                        break;
                    case "inactive":
                        $scope.label_class += " btn-danger"
                        break;
                    case "expired":
                        $scope.label_class += " btn-danger"
                        break;
                    default:
                        $scope.label_class += " btn-info"
                        break;
                }
            }
        };
    }).directive('ngLoading', [function() {
        //directive to show loading state
        return {
            restrict: 'AE',
            scope: true,
            compile: function(tElem, attrs) {
                //Add the controls to element
                tElem.addClass('loading-button');
                var buttonContent = tElem.html();
                tElem.html("<span class=\"default-state\">" + buttonContent + "</span>");
                tElem.append("<span class=\"loading-state loader\"><span class=\"dot dot1\"><\/span><span class=\"dot dot2\"><\/span><span class=\"dot dot3\"><\/span><span class=\"dot dot4\"><\/span><\/span><span class=\"loading-success\"><i class=\"fa fa-check animated fadeInUp\"><\/i><\/span><span class=\"loading-failure\"><i class=\"fa fa-times animated fadeInUp\"><\/i><\/span>")
                return function(scope, element, attrs) {
                    var watching;
                    var load = function(val) {
                        element.addClass('ng-loading');
                        element.attr('disabled', true);
                        watching = true;
                    }
                    scope.$on(attrs.ngLoading, function(event, val) {
                        if (!watching) return;
                        watching = false;
                        element.removeClass('ng-loading');
                        if (val == true) element.addClass('ng-loading-success')
                        else element.addClass('ng-loading-failure');
                        setTimeout(function() {
                            element.removeClass('ng-loading-success ng-loading-failure ng-loading');
                            element.attr('disabled', false);
                        }, 700);
                    });
                    element.on('click', function() {
                        element.addClass('ng-loading');
                        load();
                    })
                };
            }
        };
    }]).directive('focus', ['$timeout',
        function($timeout) {
            //directive to focus on on input
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function(scope, element) {
                    scope.$watch('trigger', function(value) {
                        if (value === "true") {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    ]);
