angular.module('app.campaigns', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.campaigns', {
            url: '/campaigns',
            templateUrl: 'modules/campaigns/index.html',
            controller: 'CampaignsCtrl',
           	redirectTo: 'app.campaigns.list',
        }).state('app.campaigns.list', {
            url: '/list',
            templateUrl: 'modules/campaigns/list.html',
            controller: 'CampaignsListCtrl',
            resolve: {
                campaigns: ['MockAPI', function(MockAPI) {
                    return MockAPI.one('campaigns').get();
                }]
            }
        })
    }    
])

.controller('CampaignsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])

.controller('CampaignsListCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', 'campaigns', function($state, $scope, $stateParams, MockAPI ,campaigns) {
    $scope.campaigns = campaigns;
}])
