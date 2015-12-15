angular.module('app.campaigns', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('app.campaigns', {
            url: '/campaigns',
            templateUrl: 'modules/campaigns/index.html',
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            controller: 'CampaignsCtrl'
        }).state('app.create', {
            url: '/create-campaign',
            templateUrl: 'modules/campaigns/create.html',
            controller: 'CampaignCreateCtrl'
=======
            controller: 'CampaignsCtrl',
            redirectTo: 'app.keyword.analytics'
>>>>>>> Stashed changes
=======
            controller: 'CampaignsCtrl',
            redirectTo: 'app.keyword.analytics'
>>>>>>> Stashed changes
        })
    }
])

.controller('CampaignsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])

.controller('CampaignCreateCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])
