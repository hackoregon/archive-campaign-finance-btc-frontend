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
        this.getCampaignFinances = function(campaignId){
          var deferred = $q.defer();

          d3.tsv('/data/bruce_starr.txt', function(finances){
            var contributions = {
              "PAC": {amount: 0, number: 0},
              "Business": {amount: 0, number: 0},
              "Grassroots": {amount: 0, number: 0},
              "Individual": {amount: 0, number: 0},
              "Party": {amount: 0, number: 0},
              "NA": {amount: 0, number: 0}
            };
            /**
            Broadcast Advertising (radio, tv): 385029.75
            Cash Contribution: 58140
            Fundraising Event Expenses: 41674.899999999994
            General Operational Expenses (need description): 232472.78999999998
            General Operational Expenses (need description); Fundraising Event Expenses: 164.99
            General Operational Expenses (need description); Postage: 150.81
            General Operational Expenses (need description); Utilities: 4193.16
            Literature, Brochures, Printing: 75478.01999999999
            Literature, Brochures, Printing; Postage: 5784
            Management Services: 62000
            Management Services; Fundraising Event Expenses: 2639.8
            Management Services; Preparation and Production of Advertising: 12179.29
            NA: 24781.68000000003
            Newspaper and Other Periodical Advertising: 7803.72
            Newspaper and Other Periodical Advertising; Preparation and Production of Advertising: 1998.75
            Other Advertising (yard signs, buttons, etc.): 67735.2
            Other Advertising (yard signs, buttons, etc.); Literature, Brochures, Printing: 915
            Postage: 54864.2
            Postage; Literature, Brochures, Printing: 68094.68
            Preparation and Production of Advertising: 88051.86
            Preparation and Production of Advertising; Postage: 9815.63
            Public Office Holder Expenses: 24143.139999999996
            Reimbursement for Personal Expenditures: 10012.899999999998
            Surveys and Polls: 36438.96
            Travel Expenses (need description): 65753.55999999997
            Utilities: 656.9100000000001
            Wages, Salaries, Benefits: 76520.4899
             **/
            var expenditureCategories = {
              BROADCAST: 'Broadcast Advertising',
              CASH_CONTRIBUTION: 'Cash Contributions',
              FUNDRAISING_EVENT: 'Fundraising Events',

            };
            var expenditures = {};
            _(finances).each(function(row){
              var subType = row['sub_type'];
              switch (subType) {
                case 'Cash Contribution':
                  var bookType = row['book_type'];
                  var contributionKey = "";
                  switch (bookType) {
                    case 'Business Entity':
                      contributionKey = 'Business';
                      break;
                    case 'Political Committee':
                      contributionKey = 'PAC';
                      break;
                    case 'Political Party Committee':
                      contributionKey = 'Party';
                      break;
                    case 'NA':
                      contributionKey = 'NA';
                      break;
                    case 'Individual':
                      if (Number(row['amount']) <= 200) {
                        contributionKey = 'Grassroots';
                      } else {
                        contributionKey = 'Individual';
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
            deferred.resolve({contributions: contributions, expenditures: expenditures});

          });
          return deferred.promise;
        };
        return this;
    });

}).call(this);
