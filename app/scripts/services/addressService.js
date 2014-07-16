(function() {
  'use strict';
  /**
   # @ngdoc service
   # @name frontendApp.Sessionservice
   # @description
   # # Sessionservice
   # Service in the frontendApp.
   */

  angular.module('frontendApp').service('AddressService', function($q) {

    var firstNames = ['Joe','Jane','Nathan','Zeb','Catherine','Huston','Ed','Lisa','Frank','Ryan'];
    var lastNames = ['Campaign','Charming','Fresh','McCool','Jones','Smith','Smartypants','Douglas','Formosa'];

    var domains = ['Water District','City','Public Utility','School','Library','Park Board','County','Election','City Council'];
    var positions = ['Seat #2','Seat #5','Chairman','Secretary','Treasurer','Superintendent','Chief','Member'];

    var randoTotal = function(){
      return (Math.random() * 10000) + 3000;
    };
    var randoRace = function(){
      var domain = domains[Math.floor(Math.random()*domains.length)];
      var position = positions[Math.floor(Math.random()*positions.length)];
      return domain + ' ' + position;
    };
    var chance = new Chance()
    this.getRacesByAddress = function(value) {
      var deferred, races;
      deferred = $q.defer();
      races = {
        local: [
          {
            name: randoRace(),
            description: 'What do they do?',
            campaigns: [
              {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }
            ]
          },
          {
            name: randoRace(),
            description: 'What do they do?',
            campaigns: [
              {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }
            ]
          },
          {
            name: randoRace(),
            description: 'What do they do?',
            campaigns: [
              {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }, {
                id: _.uniqueId(),
                name: chance.name(),
                party: 'Independent',
                total: chance.integer({min: 3000, max: 13000}),
                grassroots: Math.random(),
                local: Math.random()
              }
            ]
          }
        ]
      };
      deferred.resolve(races.local);
      return deferred.promise;
    };
    return this;
  }).constant({
    'DISTRICTS': {
      LOCAL: 'local',
      STATE: 'state',
      CITY: 'city',
      NATIONAL: 'national',
      COUNTY: 'county'
    }
  });

}).call(this);