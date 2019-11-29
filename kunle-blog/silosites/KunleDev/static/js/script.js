var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
var cw = document.body.clientWidth;
var ch = document.body.clientHeight;
var map_w = cw * 1.3;
var map_h = ch * 1.3;
var totalDots = 900;
var maxVPlayerDis = 100;

$(window).resize(function () {
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
});

//partciles on the screen//
var offset = {
    speedx: 20,
    speedy: 20,
    maxSpeed: 10,
    offSetting: false,
    directionX: 0,
    directionY: 0,
};

//Here we will update the virtual player's position
var vPlayer = {
    x: 0,
    y: 0,
    worldx: randNum(-map_w, map_w),
    worldy: randNum(-map_h, map_h),
    vx: 0,
    vy: 0,
    update: function () {
        this.x += this.vx;
        this.y += this.vy;
    }
};

//Random number Generator
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

function randVal(x, y) {
    var rand = randNum(1, 3);
    if (rand < 2) {
        return y;
    } else {
        return x;
    }
}

//Get the distance between object1 and object2
function return_distance(object1_x, object1_y, object2_x, object2_y) {
    var dx = object1_x - object2_x;
    var dy = object1_y - object2_y;
    var d = Math.sqrt(dx * dx + dy * dy);

    return d;
}

//Get the angle of object1 against object2
function return_angle(object1_x, object1_y, object2_x, object2_y) {
    var dx = object1_x - object2_x;
    var dy = object1_y - object2_y;

    var angle = Math.atan2(dy, dx);
    return angle;
}

//Get the mouse posision. 
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

//Request animation frame for rendering
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

//////Start dot script//////
var dots = [];
//Push 10 dots into the array

var totalDots = 500;
for (var i = 0; i < totalDots; i++) {
    var rand_radius = randNum(0, 2);
    var color = "rgba(200, 200, 200, 1)";
    let life = randNum(1, 10);
    dots.push({
        single: true,
        // x: cw/2,
        // y:ch/2,
        x: randNum(-map_w, map_w),
        y: randNum(-map_h, map_h),
        r: ((randNum(1, 3) > 1.5) ? ((rand_radius > 0.6) ? (randNum(0.01, 0.5) * life) : rand_radius * life) : rand_radius * life),
        energy: 0,
        vx: (randNum(-5, 5) / randNum(2, 7)),
        vy: (randNum(-5, 5) / randNum(2, 7)),
        pos: i,
        speed: 1,

        life: life,
        lived: 1,
        dots_touched: 0,
        greed: randNum(randVal(-1, 0), 2),
        feeding: false,
        eat_dis: 100,
        alive: true,

        og_color: color,
        color: color,

        stroke: 0,
    });
}

var addDots = window.setInterval(() => {
    var rand_radius = randNum(0, 2);
    var color = "rgba(200, 200, 200, 1)";
    let life = randNum(1, 10);
    if (dots.length < 800) {
        dots.push({
            single: true,
            x: randNum(-map_w, map_w),
            y: randNum(-map_h, map_h),
            r: ((randNum(1, 3) > 1.5) ? ((rand_radius > 0.6) ? (randNum(0.01, 0.5) * life) : rand_radius * life) : rand_radius * life),
            energy: 0,
            vx: (randNum(-5, 5) / randNum(2, 7)),
            vy: (randNum(-5, 5) / randNum(2, 7)),
            pos: i,
            speed: 1,

            life: life,
            lived: 1,
            dots_touched: 0,
            greed: randNum(randVal(-1, 0), 2),
            feeding: false,
            eat_dis: 100,
            alive: true,

            og_color: color,
            color: color,

            stroke: 0,
        });
    } else {
        clearInterval(addDots);
    }
}, 500)

let large = 0;
for (var x = 0; x < dots.length; x++) {
    if (dots[x].dots_touched > large) {
        large = dots[x].dots_touched;
        var posk = x;
    }
}



function draw_dots(dot) {
    ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));
    // clear the viewport
    //ctx.clearRect(-offset.directionX, -offset.directionY, cw,ch);

    var dis = return_distance(vPlayer.x, vPlayer.y, dot.x, dot.y);
    // if (dis < maxVPlayerDis) {
    for (var j = 0; j < dots.length; j++) {
        if ((dot.r / 4) > dots[j].r) {
            var dis_ = return_distance(dots[j].x, dots[j].y, dot.x, dot.y);
            // dot.eat_dis = ((dot.r) * (dot.lived * 0.1)) + 200;
            if ((dis_ <= dot.eat_dis) || (dis < maxVPlayerDis && dis_ <= 200)) {
                dot.feeding = true;

                dots[j].life -= dot.greed;
                dot.life += dot.greed * 0.3;
                //Draw line between dots
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.strokeStyle = "rgba(255, 255, 255, 1)";
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.lineWidth = dis_ / (dot.eat_dis * 5);
                ctx.stroke();
                dot.dots_touched++;
            }
        }
    }
    // }

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r + 1, 0, (2 * Math.PI));
    ctx.fillStyle = dot.color;
    ctx.fill();
    ctx.restore();
}

// Logic for the dots 
function update_dots() {
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        dot.x += dot.vx;/// randNum(2, 7);
        dot.y += dot.vy;/// randNum(2, 7);
        var disToVPlayer = return_distance(vPlayer.x, vPlayer.y, dot.x, dot.y);
        var dis_to_center = return_distance(cw / 2, ch / 2, dot.x, dot.y);
        var ang = return_angle(vPlayer.x, vPlayer.y, dot.x, dot.y);
        // var ang = return_angle(randNum(-cw, cw) / randNum(2, 7), randNum(-ch, ch) / randNum(2, 7), dot.x, dot.y);

        if (dis_to_center < 1100) {
            draw_dots(dot);
        }

        //randomly change direction
        if ((randNum(1, 1000) <= 5) && dis_to_center > 400) {
            dot.vx = (randNum(-5, 5) / randNum(2, 7)) //* (1 / dot.life);
            dot.vy = (randNum(-5, 5) / randNum(2, 7)) //* (1 / dot.life);
        }
    }
}

///////End dot script//////

function start() {
    window.requestAnimFrame(start);
    ctx.clearRect(0, 0, map_w, map_h);
    update_dots();
}

start();


//On mouse movement move the canvas aswell. 
var balls = document.getElementsByClassName('ball');
document.addEventListener('mousemove', function (e) {
    var mousePos = getMousePos(canvas, e);
    vPlayer.x = mousePos.x;
    vPlayer.y = mousePos.y;
    offset.directionX = -mousePos.x / 30;
    offset.directionY = -mousePos.y / 30;

    let x = e.clientX * 100 / window.innerWidth;
    let y = e.clientY * 100 / (window.innerHeight / 3)

    for (var i = 0; i < 2; i++) {
        balls[i].style.left = ((x < 100) ? x - 20 : x) + "%";
        balls[i].style.top = (y > 100 ? 100 : y) + "%";
        balls[i].style.transform = "translate(-" + x + ",-" + y + ")";
    }
}, false);

function wait(callback, time) {
    var wait_ = window.setTimeout(() => {
        callback();
        clearInterval(wait_);
    }, time);
}

function typeThis(string, id, speed) {
    string = string.split('');
    var text = '';
    var i = 0;
    var typing = window.setInterval(() => {
        if (text.length < string.length) {
            text += string[i];
            i++;
            document.getElementById(id).innerHTML = text;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

wait(() => {
    typeThis('Kunle.dev', 'name', 300);
}, 500)

