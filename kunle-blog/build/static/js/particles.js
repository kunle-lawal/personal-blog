var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// canvas.width = document.body.clientWidth; //document.width is obsolete
// canvas.height = document.body.clientHeight; //document.height is obsolete
var cw = canvas.width;
var ch = canvas.height;
var map_w = cw * 1.3;
var map_h = ch * 1.3;
var totalDots = 900;
var maxVPlayerDis = 100;

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

function draw_dots(dot) {
    ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));
    // clear the viewport
    //ctx.clearRect(-offset.directionX, -offset.directionY, cw,ch);

    // var dis = return_distance(vPlayer.x, vPlayer.y, dot.x, dot.y);
    // // if (dis < maxVPlayerDis) {
    // for (var j = 0; j < dots.length; j++) {
    //     if ((dot.r / 4) > dots[j].r) {
    //         var dis_ = return_distance(dots[j].x, dots[j].y, dot.x, dot.y);
    //         // dot.eat_dis = ((dot.r) * (dot.lived * 0.1)) + 200;
    //         if ((dis_ <= dot.eat_dis) || (dis < maxVPlayerDis && dis_ <= 200)) {
    //             dot.feeding = true;

    //             dots[j].life -= dot.greed;
    //             dot.life += dot.greed * 0.3;
    //             //Draw line between dots
    //             ctx.beginPath();
    //             ctx.moveTo(dot.x, dot.y);
    //             ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    //             ctx.lineTo(dots[j].x, dots[j].y);
    //             ctx.lineWidth = dis_ / (dot.eat_dis * 5);
    //             ctx.stroke();
    //             dot.dots_touched++;
    //         }
    //     }
    // }
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

//////Start dot script//////
var dots = [];
var addDots = ({ totalParticle, position_x, position_y, velocity_x, velocity_y, gravity_x, gravity_y, particle_size, particle_life, particle_color }) => {
    var showVal = (arr) => { return arr[2] ? randNum(arr[0], arr[1]) : arr[0]}
    for (var i = 0; i < totalParticle; i++) {
        dots.push({
            x: showVal(position_x) ? showVal(position_x) : randNum(-map_w, map_w),
            y: showVal(position_y) ? showVal(position_y) : randNum(-map_h, map_h),
            r: showVal(particle_size) ? showVal(particle_size) : randNum(0.1, 2),
            vx: showVal(velocity_x) ? showVal(velocity_x) / 7 : randNum(-5, 5) / randNum(2, 7),
            vy: showVal(velocity_y) ? showVal(velocity_y) / 7 : randNum(-5, 5) / randNum(2, 7),
            ax: showVal(gravity_x),
            ay: showVal(gravity_y),
            pos: i,
            life: showVal(particle_life) ? showVal(particle_life) : randNum(10, 100),
            color: particle_color ? particle_color : 'white',
        });
    }
}

var simulationVariables = {
    targetParticle: 0,
    totalParticle: 0,
    position_x: 0,
    position_y: 0,
    velocity_x: 0,
    velocity_y: 0,
    gravity_x: 0,
    gravity_y: 0,
    particle_size: 0,
    particle_life: 0,
    particle_color: 0,
}

var started =  false;
function start() {
    window.requestAnimFrame(start);
    ctx.clearRect(0, 0, map_w, map_h);
    update_dots();
    started = true;
}

$(".random").click(function() {
    var id = $(this).attr('id');
    $("input."+id).parent().toggleClass('split');
    $("input." + id).parent().toggleClass('noSplit');
})

$("#startSimulation").click(() => {
    dots = [];
    var variableIDs = []
    var prevId = '';
    variableIDs = $("input").map((i) => {
        return $("input").get(i).className;
    })
    Array.prototype.forEach.call(variableIDs, id => {
        if (prevId !== id && $("input." + id).length > 1) {
            // console.log(id + " : " + $("input."+id).length)
            let val1 = Number($("#" + id + "1").val());
            let val2 = (Number($("#" + id + "2").val()) < val1) ? Number(($("#" + id + "2").val(val1)).val()) : (Number($("#" + id + "2").val()));
            let simVarArr = [
                val1,
                val2,
                ($("input." + id).parent().attr('class') === "split") ? true : false 
            ]
            simulationVariables[id] = simVarArr;
            prevId = id;
        } else if (prevId !== id) {
            simulationVariables[id] = (id === "particle_color") ? $("#" + id).val() : Number($("#" + id).val())
        }
    })
    console.log(simulationVariables);
    addDots(simulationVariables);
    if(!started) {
        start();
    }
    // var variableID = $("input").get(i).id;
    // var variableVal = $("#" + variableID).val();
    // simulationVariables.variableID = variableVal;
        // console.log(variableIDs);
})

