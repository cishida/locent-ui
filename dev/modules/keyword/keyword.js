angular.module('app.keyword', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.keyword', {
            url: '/keyword-checkout',
            templateUrl: 'modules/keyword/index.html',
            controller: 'keywordCtrl'
        })
    }
])

.controller('keywordCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    $scope.labels = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "Today"];
    $scope.data = [
        [0, 0, 0, 0, 0, 0, 0]
    ];

    $scope.tabs = [{
           title: 'Analytics',
           url: 'one.tpl.html'
      }, {
           title: 'Messages',
           url: 'two.tpl.html'
      }, {
           title: 'Chat',
           url: 'three.tpl.html'
      }];

   $scope.currentTab = 'one.tpl.html';

   $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.url;
   }

   $scope.isActiveTab = function(tabUrl) {
      return tabUrl == $scope.currentTab;
   }
}])
