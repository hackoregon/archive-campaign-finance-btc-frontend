angular.module('frontendApp')
  .filter('currencyFormat', function(){
    return function(str) {
      var number = parseFloat(str);
      if ( ! isNaN(number)){
        if (number > 49999) {
          number = Math.round(number / 1000);
          suffix = ' k';
        } else if (number > 999999) {
          number = Math.round(number / 1000000);
          suffix = ' m';
        }
        return numeral(number).format('$0,0.00');
      } else {
        return '';
      }
    }
  });
