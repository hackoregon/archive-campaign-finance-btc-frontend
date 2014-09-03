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
        this.CONTRIBUTION = {
          PAC: 'PAC',
          BUSINESS: 'Business',
          GRASSROOTS: 'Grassroots',
          INDIVIDUAL: 'Individual',
          PARTY: 'Party',
          NA: 'NA'
        };
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
        this.getCampaignFinances = function(startDate, endDate) {
          console.log(startDate, endDate);
          var deferred = $q.defer();
          var self = this;
          var all = {richardson: null, kitzhaber: null};
          var makeFinances = function(finances) {
            var contributions = {};
            contributions[self.CONTRIBUTION.PAC] = {amount: 0, number: 0};
            contributions[self.CONTRIBUTION.BUSINESS] = {amount: 0, number: 0};
            contributions[self.CONTRIBUTION.GRASSROOTS] = {amount: 0, number: 0};
            contributions[self.CONTRIBUTION.INDIVIDUAL] = {amount: 0, number: 0};
            contributions[self.CONTRIBUTION.PARTY] = {amount: 0, number: 0};
            contributions[self.CONTRIBUTION.NA] = {amount: 0, number: 0};

//            var expenditureCategories = {
//              BROADCAST: 'Broadcast Advertising',
//              CASH_CONTRIBUTION: 'Cash Contributions',
//              FUNDRAISING_EVENT: 'Fundraising Events',
//
//            };
            var expenditures = {};
            var total = 0;
            _(finances).chain().filter(function(row){
              var rowDate = new Date(row.tran_date);
              return rowDate.getTime() >= startDate.getTime() && rowDate.getTime() <= endDate.getTime();
            }).each(function(row){
              total++;
              var subType = row['sub_type'];
              switch (subType) {
                case 'Cash Contribution':
                  var bookType = row['book_type'];
                  var contributionKey = "";
                  switch (bookType) {
                    case 'Business Entity':
                      contributionKey = self.CONTRIBUTION.BUSINESS;
                      break;
                    case 'Political Committee':
                      contributionKey = self.CONTRIBUTION.PAC;
                      break;
                    case 'Political Party Committee':
                      contributionKey = self.CONTRIBUTION.PARTY;
                      break;
                    case 'NA':
                      contributionKey = self.CONTRIBUTION.NA;
                      break;
                    case 'Individual':
                      if (Number(row['amount']) <= 200) {
                        contributionKey = self.CONTRIBUTION.GRASSROOTS;
                      } else {
                        contributionKey = self.CONTRIBUTION.INDIVIDUAL;
                      }
                      break;
                  }
                  if (contributionKey) {
                    contributions[contributionKey].amount += Number(row['amount']);
                    contributions[contributionKey].number += 1;
                  }
                  break;
                case 'Cash Expenditure':
                  var purposeCodes = row['purpose_codes'].split('; ');
                  _(purposeCodes).each(function(purposeCode){
                    if (!_(expenditures).has(purposeCode)){
                      expenditures[purposeCode] = 0;
                    }
                    expenditures[purposeCode] += Number(row['amount']);
                  });
                  break;

              }
            });
            var nodes = _(contributions).chain()
              .map(function(contribution, key){
                return {category: key, value: contribution.amount};
              })
              .filter(function(node){
                return node.category !== self.CONTRIBUTION.NA;
              })
              .value();
            return {children: nodes};
          };
          d3.tsv('/data/DennisRecent.txt', function(richardson){
            all.richardson = makeFinances(richardson);
            d3.tsv('/data/JohnRecent.txt', function(kitzhaber){
              all.kitzhaber = makeFinances(kitzhaber);

              deferred.resolve(all);
            });


          });
          return deferred.promise;
        };
        return this;
    });

}).call(this);
