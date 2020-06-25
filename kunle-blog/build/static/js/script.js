let tl = anime.timeline({
    duration: 750,
})

function getPageWidth() {
    return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}
window.setInterval(function (){
    // console.log(getPageWidth())
}, 100)

// tl.add({
//     targets: '.page',
//     easing: 'easeInOutBack',
//     top: (getPageWidth() > 600) ? "8%" : "0",
//     bottom: (getPageWidth() > 600) ? "8%" : "0",
//     left: (getPageWidth() > 600) ? "8%" : "0",
//     right: (getPageWidth() > 600) ? "8%" : "0",
//     delay: 1000,
// })

tl.add({
    targets: '.divide',
    easing: 'easeInOutBack',
    width: (getPageWidth() > 600) ? '50%' : "0%",
    delay: 1000
})

tl.add({
    targets: '.divide_right',
    easing: 'easeInOutBack',
    width: (getPageWidth() < 600) ? ['0%', '100%'] : '50%',
}, '-=100')

tl.add({
    targets: 'h1',
    easing: 'spring',
    top: '0px',
    bottom: '0px',
    opacity: '1',
    // delay: 1000
})

tl.add({
    targets: '.dot',
    easing: 'spring',
    bottom: '0px',
    // right: '-100px',
    opacity: '1',
    duration: 500,
    // delay: 1000,
    // delay: anime.stagger(250)
}, '-=1000')

tl.add({
    targets: '.icon',
    easing: 'spring',
    top: (getPageWidth() >= 1260) ? '0px' : '20px',
    opacity: 1,
    // delay: 1000,
    delay: anime.stagger(250),
    complete: function(anim) {
        tl.pause();
        $('.page').addClass('pageAnimationDone');
        $('.divide').addClass('divideAnimationDone');
        $('.animateDown').addClass('h1AnimationDone');
        $('.dot').addClass('dotAnimationDone');
        $('.icon').addClass('faAnimationDone');
        removeStyling('page');
        removeStyling('divide_left');
        removeStyling('divide_right');
        removeStyling('kunle');
        removeStyling('dev');
        removeStyling('dot');
    }
}, '-=1000')

function removeStyling(attr) {
    let element = document.getElementById(attr);
    element.removeAttribute('style');
}

