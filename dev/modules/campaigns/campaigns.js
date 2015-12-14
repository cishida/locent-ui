angular.module('app.campaigns', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.campaigns', {
            url: '/campaigns',
            templateUrl: 'modules/campaigns/index.html',
            controller: 'CampaignsCtrl'
        }).state('app.campaigns.create-campaign', {
            url: '/create-campaign',
            templateUrl: 'modules/campaigns/create-campaign.html',
            controller: 'CampaignCreateCtrl'
        })
    }
])

.controller('CampaignsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])

.controller('CampaignCreateCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])
