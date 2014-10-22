function Campaign() {

  this.candidate_name = '';
  this.committee_name = '';
  this.race = '';
  this.phone = '';
  this.total = 0;
  this.total_spent = 0;
  this.grassroots = 0;
  this.instate = 0;
  this.filer_id = 0;
  this.party = '';
  Object.defineProperty(this, 'spent_percent', {
    get: function() {
      if (this.total) {
        return this.total_spent / this.total;
      } else {
        return 0;
      }
    }
  });
}

Campaign.prototype.fromObject = function(obj) {
  this.candidate_name = obj.candidate_name;
  this.committee_name = obj.committee_name;
  this.race = obj.race;
  this.phone = obj.phone;
  this.total = obj.total;
  this.total_spent = obj.total_spent;
  this.grassroots = obj.grassroots;
  this.instate = obj.instate;
  this.filer_id = obj.filer_id;
  this.party = obj.party;
};

Campaign.prototype.fromOregonSummary = function(obj) {
  this.filer_id = "oregon";
  this.campaign_name = "Oregon Summary";
  this.committee_name = 'Oregon Summary';
  this.candidate_name = "Oregon Summary";
  this.race = '';
  this.total = obj.in;
  this.total_spent = obj.out;
  this.grassroots = obj.total_grass_roots / obj.in;
  this.instate = obj.from_within / obj.in;
}