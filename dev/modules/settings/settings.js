angular.module('app.settings',['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state('app.settings', {
            url: '/settings',
            templateUrl: 'modules/settings/index.html',
            controller: 'SettingsCtrl'
        })
	}
])

.controller('SettingsCtrl', ['$state', '$scope', '$stateParams', function($state, $scope, $stateParams) {
    
}])