let milkcocoa
let startTime = 0
let timeLeft = 0
let timeToCountdown = 5 * 60 * 1000
let timerId = 0
let isRunning = false

$(document).ready(function(){
    init()
    timerSettings()

    let start = $('.start')
    let reset = $('.reset')
    let clear = $('.clear')
    timerAction(start, reset, clear)
    let uuid = $.cookie('uuid')

    let getUUID
    let getType
    
    milkcocoa = new MilkCocoa('seaj9191nq8.mlkcca.com');
    let ds = milkcocoa.dataStore('actions');
    ds.on('send', function(data) {
        getUUID = data.value.uuid
        getType = data.value.type
        
        if (getUUID == uuid) {
            switch (getType){
                case 'start':
                    timerStart(start, isRunning)
                    break
                case 'reset':
                    timerReset()
                    break
                case 'clear':
                    timerClear()
                    break
            }
        }
    });
})

function init() {
    let initTime = timerText(timeToCountdown)
    $('.timer-setting .timer-set').text(initTime)
    $('.content .time').text(initTime)
}

function timerAction(start, reset, clear) {
    start.click(function(){
        timerStart($(this), isRunning)
    })

    reset.click(function(){
        timerReset()
    })

    clear.click(function(){
        timerClear()
    })
}

function timerStart(obj, flag) {
    startTime = Date.now()
    let ds = milkcocoa.dataStore('status');
    if (!flag) {
        countDown()
        obj.text('STOP')
        isRunning = true
        ds.send({status: 'pause'})
    } else {
        clearTimeout(timerId)
        timeToCountdown = timeLeft
        obj.text('START')
        isRunning = false
        ds.send({status: 'play'})
    }
}

function timerReset() {
    $('.time').removeClass('limit')
    timeToCountdown = 5 * 60 * 1000
    init()
}

function timerClear() {
    $('.time').removeClass('limit')
    timeToCountdown = 0
    init()
}

function timerText(t) {
    let d = new Date(t)
    let m = d.getMinutes()
    let s = d.getSeconds()
    m = ('0' + m).slice(-2)
    s = ('0' + s).slice(-2)
    return m +':'+ s
}

function countDown() {
    timerId = setTimeout(function(){
        timeLeft = timeToCountdown - (Date.now() - startTime)

        // timeLeft < 1 min
        if (timeLeft < 60 * 1000) {
            $('.time').addClass('limit')
        }

        // End
        if (timeLeft < 0) {
            clearTimeout(timerId)
            timeLeft = 0;
            timerText(timeLeft)
            return
        }
        $('.time').text(timerText(timeLeft))

        countDown()
    }, 100)
}

function timerSettings() {
    let minUp = $('.min-up')
    minUp.click(function(){
        timeToCountdown += 60 * 1000
        init()
    })

    let secUp = $('.sec-up')
    secUp.click(function(){
        timeToCountdown += 1000
        init()
    })

    let minDown = $('.min-down')
    minDown.click(function(){
        timeToCountdown -= 60 * 1000
        init()
    })

    let secDown = $('.sec-down')
    secDown.click(function(){
        timeToCountdown -= 1000
        init()
    })
}
