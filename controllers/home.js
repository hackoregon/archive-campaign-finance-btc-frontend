var HackOre = require('sara')
  , WhereView = require('../views/where')
  , WhatView = require('../views/what')
  , WhoView = require('../views/who')
  , WhenView = require('../views/when')

module.exports = new HackOre.Controller('Home')
  .action('where', function (req, res) {
    WhereView.render().pipe(res)
  })
  .action('what', function (req, res) {
    WhatView.render().pipe(res)
  })
  .action('who', function (req, res) {
    WhoView.render().pipe(res)
  })
  .action('when', function (req, res) {
    WhenView.render().pipe(res)
  })
