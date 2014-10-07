(function () {
    'use strict';
    angular.module('frontendApp').directive('socialTags', function () {
        return {
            restrict: 'E',
            template: '<div class="social-container" ng-style="getStyle()">'+
                        '<span ng-transclude></span>'+
                        '<a ng-repeat="d in data" href="{{ d.url }}" ng-style="computeInterval()">'+
                            '<img ng-src="{{ d.imgsrc }}" width="{{ size }}" />'+
                        '</a>'+
                      '</div>',
            transclude: true,
            scope: true,
            controller: function($scope, $attrs) {

                $scope.data = [ {
                    url: '#',
                    imgsrc: 'images/icons/landing_twitter.svg'
                }, {
                    url: '#',
                    imgsrc: 'images/icons/landing_facebook.svg'
                }, {
                    url: '#',
                    imgsrc: 'images/icons/landing_mail.svg'
                }];

                $scope.size = ($attrs.size ? parseInt($attrs.size) : 22);

                var shouldOverlap = true;
                if ($attrs.overlap) {
                    shouldOverlap = ($attrs.overlap.toLowerCase() === 'true');
                }
                $scope.getStyle = function() {
                    return {
                        'height': $scope.size + 'px',
                        'margin-top': (shouldOverlap ? ('-'+ ($scope.size + 10) + 'px') : '0')
                    };
                };

                var interval = function() {
                    return (($scope.size - 6) / 5);
                };
                $scope.computeInterval = function() {
                    return {
                        'margin-left': interval() + 'px'
                    };
                };
            }
        };
    });
})();
