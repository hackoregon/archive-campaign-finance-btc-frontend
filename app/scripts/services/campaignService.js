(function() {
    'use strict';
    /**
    # @ngdoc service
    # @name frontendApp.Sessionservice
    # @description
    # # Sessionservice
    # Service in the frontendApp.
    */

    angular.module('frontendApp').service('CampaignService', function($q) {
        var randoRace = function(){
            var domains = ['Water District','City','Public Utility','School','Library','Park Board','County','Election','City Council'];
            var positions = ['Seat #2','Seat #5','Chairman','Secretary','Treasurer','Superintendent','Chief','Member'];

            var domain = domains[Math.floor(Math.random()*domains.length)];
            var position = positions[Math.floor(Math.random()*positions.length)];
            return domain + ' ' + position;
        };
        var chance = new Chance();
        this.getCampaign = function(value) {
          var deferred = $q.defer();
          var campaign = {
                name: chance.name(),
                race: randoRace(),
                photo: 'images/campaign_photo.png',
                website: 'http://'+chance.domain(),
                phone: chance.phone(),
                contributions: {
                    total: chance.integer({min: 3000, max: 13000}),
                    grassroots: Math.random(),
                    local: Math.random()
                }
            };
            deferred.resolve(campaign);
            return deferred.promise;
        };
        return this;
    });

}).call(this);
