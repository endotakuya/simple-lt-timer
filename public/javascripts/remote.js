$(document).ready(function(){
    let width  = window.innerWidth
    let height = window.innerHeight / 2
    
    let startBox = $('.start-box')
    startBox.width(width)
    startBox.height(height - 12)
    let resetBox = $('.reset-box')
    resetBox.width(width)
    resetBox.height(height)
    let clearBox = $('.clear-box')
    clearBox.width(width)
    clearBox.height(height)

    let milkcocoa = new MilkCocoa('seaj9191nq8.mlkcca.com')
    
    let ds = milkcocoa.dataStore('actions')
    let path = location.pathname
    let uuid = path.replace('/', '')

    startBox.click(function(){
        ds.send({uuid : uuid, type: 'start'})
    })
    resetBox.click(function(){
        ds.send({uuid : uuid, type: 'reset'})
    })
    clearBox.click(function(){
        ds.send({uuid : uuid, type: 'clear'})
    })

    let status = milkcocoa.dataStore('status');
    status.on('send', function(data) {
        let s = data.value.status
        console.log(s)
        if (s == 'play') {
            startBox.children('i').removeClass('fa-pause').addClass('fa-play')
        } else if (s == 'pause') {
            startBox.children('i').removeClass('fa-play').addClass('fa-pause')
        }
    })

})
