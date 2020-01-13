let n
let size = $('.images>img').length
let timerID

init(1)
autoPlay()

//初始化
function init(startIndex) {
    n = startIndex
    $('.images>img:nth-child(' + n + ')').addClass('current')
        .siblings().addClass('enter')
}


function nLoop(n, size) {
    if (n > size) {
        n = n % size
        if (n == 0) {
            n = size
        }
    }
    return n
}


function getImg(n) {
    return $('.images>img:nth-child(' + nLoop(n, size) + ')')
}

function makeCurrent($node) {
    return $node.removeClass('enter leave').addClass('current')
}

function makeLeave($node) {
    return $node.removeClass('enter current').addClass('leave')
}

function makeEnter($node) {
    return $node.removeClass('current leave').addClass('enter')
}

function autoPlay() {
    timerID = setInterval(() => {
        makeLeave(getImg(n))
            .one('transitionend', (xxx) => {
                makeEnter($(xxx.currentTarget))
            })
        makeCurrent(getImg(n + 1))
        n += 1
    }, 2000);
}

function stopPlay() {
    window.clearInterval(timerID)
}

function listenToMouseOnWindow() {
    $('.window').on('mouseenter', function () {
        stopPlay()
    }).on('mouseleave', function () {
        autoPlay()
    })
}

function stopClickWhenDocumentHidden() {
    $(document).on('visibilitychange', function () {
        if (document.visibilityState === "hidden") {
            stopPlay()
        } else {
            autoPlay()
        }
    })
}