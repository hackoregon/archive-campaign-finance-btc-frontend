var HackOre = require('sara')

module.exports = new HackOre.View('When', {
  render: function () {
    document.querySelector('main').innerHTML = '<h3></h3>'
  }
})
