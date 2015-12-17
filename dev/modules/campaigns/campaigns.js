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
        }).state('app.campaigns.create', {
            url: '/create-campaign',
            templateUrl: 'modules/campaigns/create.html',
            controller: 'CampaignsCreateCtrl'
        })
    }    
])

.controller('CampaignsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])

.controller('CampaignsListCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', 'campaigns', function($state, $scope, $stateParams, MockAPI ,campaigns) {
    $scope.campaigns = campaigns;
}])

.controller('CampaignsCreateCtrl', ['$state', '$scope', '$stateParams', 'MockAPI', function($state, $scope, $stateParams) {
    
}])
