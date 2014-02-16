Frontend.TransactionRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('transaction', params.transaction_id);
  }
});

