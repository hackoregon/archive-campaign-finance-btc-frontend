
angular.module('frontendApp').controller('NavCtrl', function($scope, $location) {

    $scope.atHome = function() {
        return ($location.path() === '/');
    }

});
