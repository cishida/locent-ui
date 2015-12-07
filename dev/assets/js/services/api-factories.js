angular.module('app.apiFactories', ['restangular'])
    .factory('MockAPI', ['Restangular', 'DEFAULTS', function(Restangular, DEFAULTS) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(DEFAULTS.baseURL);
        });
    }])
    .factory('LiveAPI', ['Restangular', 'DEFAULTS', 'LocalService', function(Restangular, DEFAULTS, LocalService) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(DEFAULTS.liveURL);
            if (LocalService.get('current_session')) {
                var token = angular.fromJson(LocalService.get('current_session')).token;
                RestangularConfigurer.setDefaultHeaders({
                    Authorization: 'Bearer ' + token
                })
            }
        });
    }]);
