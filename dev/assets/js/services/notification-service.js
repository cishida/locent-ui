angular.module('app.notificationService', ['toaster'])
    .factory('Notification', ['toaster', function(toaster) {
        return {
            pop: function(options) {
                toaster.pop(options);
            },
            success: function(title, body) {
                toaster.pop({
                    type: 'success',
                    title: title || "Action completed succesfully",
                    body: body
                });
            },
            error: function(title, error) {
                console.log(error);
                var message;
                if (error.data) {
                    message = error.data.message;
                    if (!message && error.data.data) message = error.data.data.summary;
                    if (!message) message = "Unknown error occured";
                } else {
                    message = "Could not connect to the server. Please check your connection and try again";
                }
                toaster.pop({
                    type: 'error',
                    title: title || "Action could not be perfomed",
                    body: message
                });
            },
            clear: function() {
                toaster.clear();
            }
        }
    }]);
