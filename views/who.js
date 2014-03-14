var HackOre = require('sara')

module.exports = new HackOre.View('Who', {
  render: function () {
    document.querySelector('main').innerHTML = '<h3></h3>'
  }
})
