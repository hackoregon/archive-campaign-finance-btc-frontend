var HackOre = require('sara')

module.exports = new HackOre.View('What', {
  render: function () {
    document.querySelector('main').innerHTML = '<h3></h3>'
  }
})
