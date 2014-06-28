(function() {
    'use strict';
    /**
    # @ngdoc service
    # @name frontendApp.Sessionservice
    # @description
    # # Sessionservice
    # Service in the frontendApp.
    */

    angular.module('frontendApp').service('CandidateService', function($q) {
        var randoRace = function(){
            var domains = ['Water District','City','Public Utility','School','Library','Park Board','County','Election','City Council'];
            var positions = ['Seat #2','Seat #5','Chairman','Secretary','Treasurer','Superintendent','Chief','Member'];

            var domain = domains[Math.floor(Math.random()*domains.length)];
            var position = positions[Math.floor(Math.random()*positions.length)];
            return domain + ' ' + position;
        };
        var randoName = function(){
            var firstNames = ['Joe','Jane','Nathan','Zeb','Catherine','Huston','Ed','Lisa','Frank','Ryan'];
            var lastNames = ['Campaign','Charming','Fresh','McCool','Jones','Smith','Smartypants','Douglas','Formosa'];

            var first = firstNames[Math.floor(Math.random()*firstNames.length)];
            var last = lastNames[Math.floor(Math.random()*lastNames.length)];
            return first + ' ' + last;
        };
        var chance = new Chance();
        this.getContribsByCandidate = function(value) {
            var candidate = {
                name: randoName(),
                race: randoRace(),
                photo: 'http://placehold.it/150x150',
                website: '#',
                phone: '(555) 5555',
                vitalStats: {
                    total: chance.integer({min: 3000, max: 13000}),
                    grassroots: Math.random(),
                    district: Math.random()
                }
            };
            return candidate;
        };
        return this;
    });

}).call(this);
