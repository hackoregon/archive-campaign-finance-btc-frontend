var HackOre = require('sara')
  , HomeController = require('./controllers/home')

HackOre.storage('hackoregon', require('sara/lib/adapters/mongodb'))
  .static('./public')
  .layout('./layout.html')
  .routes({
    '/': HomeController.where
  , '/what': HomeController.what
  , '/who': HomeController.who
  , '/when': HomeController.when
  })
  .init({ env: 'development' }, function () {
    var grabber = document.querySelector('#grabber')
      , isDragging = false

    grabber.addEventListener('mousedown', function () {
      isDragging = true
    })

    document.addEventListener('mouseup', function () {
      isDragging = false
    })

    document.addEventListener('mousemove', function (e) {
      if (isDragging) {
        grabber.style.left = e.pageX
        var z =  e.pageX / window.innerWidth
        if (window.redraw instanceof Function) window.redraw(z)
      }
    })
  })
