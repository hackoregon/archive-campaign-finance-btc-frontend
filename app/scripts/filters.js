angular.module('frontendApp')
  .filter('currencyFormat', function(){
    return function(str) {
      var number = parseFloat(str);
      var suffix = '';
      if ( ! isNaN(number)){
        if (number > 999999) {
          number = (number / 1000000);
          suffix = ' m';
        } else if (number > 49999) {
          number = (number / 1000);
          suffix = ' k';
        }
        if (suffix === '') {
          return numeral(number).format('$0,0.00');
        } else {
          return numeral(number).format('$0.0') + suffix;
        }
      } else {
        return '';
      }
    }
  });
