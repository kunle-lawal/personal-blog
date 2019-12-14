var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
var cw = canvas.width;
var ch = canvas.height;
var map_w = cw * 1.3;
var map_h = ch * 1.3;
var totalDots = 900;
var maxVPlayerDis = 100;
var click_point_x;
var click_point_y;

$(window).resize(function () {
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    cw = canvas.width;
    ch = canvas.height;

    map_w = cw * 1.3;
    map_h = ch * 1.3;
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
    r: 2,
    ang: 0,
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

function return_angle(velocity_x, velocity_y) {
    let angle = Math.atan2(velocity_y, velocity_x) * 180 / Math.PI;
    return angle;
}

function return_speed(velocity_x, velocity_y) {
    let speed = Math.sqrt(velocity_y * velocity_y + velocity_x * velocity_x);
    return speed;
}

function setValToMousePos(id, mousePosx, mousePosy) {
    if (id.substring(id.length - 2, id.length - 1) === 'x') {
        $("#" + id).val(mousePosx);
    } else {
        $("#" + id).val(mousePosy);
    }
}

function unsetValToMouse() {
    positionMousePos.map((id) => {
        $("#" + id).removeClass("mouse_icon_clicked");
    })
    positionMousePos = [];
}

//Get the mouse posision. 
function getMousePos(boundingBox, e) {
    var rect = boundingBox.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * boundingBox.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * boundingBox.height
    };
}

var positionMousePos = [];
document.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    vPlayer.x = mousePos.x;
    vPlayer.y = mousePos.y;
    
    positionMousePos.map((id) => {
        id = id.replace("mouse_pos_", "");
        setValToMousePos(id, mousePos.x, mousePos.y);
    })


    let particleContainer = $("#particleControlContainer");
    if (particleContainer.position().left < 750) {
        particleContainer.css('left', 750 + 'px');
    }
    if ((particleContainer.position().left + particleContainer.width() + 50) > $(window).width()) {
        particleContainer.css('left', ($(window).width() - particleContainer.width() - 50) + 'px');
    }
    if (particleContainer.position().top < 10) {
        particleContainer.css('top', 10 + 'px');
    }
    if ((particleContainer.position().top + particleContainer.height() + 50) > $(window).height()) {
        particleContainer.css('top', ($(window).height() - particleContainer.height() - 50) + 'px');
    }
}, false);
$("#particleControlContainer").draggable();
// document.getElementById('particleControlContainer').addEventListener('mousedown', function (evt) {
//     let mousePos = getMousePos(document, evt);
//     console.log(mousePos);
//     let element = ;

//     element.css({
//         'left': mousePos.x + 'px',
//         'top': mousePos.y + 'px'
//     })
// });

// document.getElementById("myBtn").addEventListener("click", function () {
//     document.getElementById("demo").innerHTML = "Hello World";
// });

$(".mouse_icon").click(function() {
    let id = $(this).attr('id');
    let arr = positionMousePos;
    let indexOfPosItem = positionMousePos.indexOf(id);
    if(indexOfPosItem !== -1) {
        arr.splice(indexOfPosItem, 1);
        positionMousePos = arr;
    } else {
        positionMousePos.push(id);
    }
    $(this).toggleClass('mouse_icon_clicked');
})

function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

function colourNameToHexToRgba(colour, alpha) {
    var colours = {
        "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
        "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
        "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080",
        "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
        "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00", "yellowgreen": "#9acd32"
    };

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return hexToRgbA(colours[colour.toLowerCase()], alpha);

    return false;
}

function checkBorderCollision (dot) {
    let side_toggled = (side) => {
        return $('#btn-border-collision_' + side).hasClass('button_clicked');
    }
    let angle = return_angle(dot.vx, dot.vy);
    let radians;
    let reflect_angle = (ang) => {
        angle = ang - angle;
        radians = angle * Math.PI / 180;
        dot.vx = Math.cos(radians) * return_speed(dot.vx, dot.vy);
        dot.vy = Math.sin(radians) * return_speed(dot.vx, dot.vy);
    }

    if(dot.x > cw && side_toggled('R')) {
        dot.x = cw - dot.r;
        reflect_angle(180);
    }
    if (dot.x < 0 && side_toggled('L')) {
        dot.x = dot.r
        reflect_angle(180);
    }
    if (dot.y > ch && side_toggled('B')) {
        dot.y = ch + dot.r
        reflect_angle(360);
    }
    if (dot.y < 0 && side_toggled('T')) {
        dot.y = dot.r
        reflect_angle(360);
    }
}

function checkShapeCollision(dot) {
    for(var i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        if(shape.shape === 'square') {
            let angle = return_angle(dot.vx, dot.vy);
            let radians;
            let reflect_angle = (ang) => {
                angle = ang - angle;
                radians = angle * Math.PI / 180;
                dot.vx = Math.cos(radians) * return_speed(dot.vx, dot.vy);
                dot.vy = Math.sin(radians) * return_speed(dot.vx, dot.vy);
            }

            var distX = Math.abs(dot.x - shape.x - shape.width / 2);
            var distY = Math.abs(dot.y - shape.y - shape.height / 2);
            let notColliding = (distX > (shape.w / 2 + dot.r)) || distY > (shape.h / 2 + dot.r);
            // console.log(notColliding);
            // if (distX > (shape.width / 2 + dot.r)) {
            //     return false;
            // }
            // if (distY > (shape.height / 2 + dot.r)) {
            //     return false;
            // }

            if ((distX <= (shape.width / 2)) && (distY <= (shape.height / 2))) {
                // if ((distX <= (shape.width / 2))) {
                    reflect_angle(180);
                // }
                // if ((distY <= (shape.height / 2))) {
                    reflect_angle(360);
                // }
            }
            // if (distY <= (shape.height / 2)) {
            //     reflect_angle(360);
            // }
        }
    }
}

function draw_dots() {
    for(var i = 0; i < dots.length; i++) {
        let dot = dots[i];
        let dis_to_center = return_distance(cw / 2, ch / 2, dot.x, dot.y);
        if(dis_to_center < 1000) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r + 1, 0, (2 * Math.PI));
            ctx.fillStyle = hexToRgbA(dot.color, (dot.life / dot.maxLife));//colourNameToHexToRgba(dot.color, (dot.life / dot.maxLife));
            ctx.fill();
            ctx.restore();
        }
    }
}

function draw_line(dot, attract_dist) {
    // ctx.save();
    // ctx.translate((offset.directionX), (offset.directionY));
    // clear the viewport
    // ctx.clearRect(-offset.directionX, -offset.directionY, cw,ch);

    let dis = return_distance(vPlayer.x, vPlayer.y, dot.x, dot.y);
    let line_color = $("#line_color").val();
    // if (dis < maxVPlayerDis) {
    for (var j = 0; j < dots.length; j++) {
        // if ((dot.r / 2) > dots[j].r) {
        var dis_ = return_distance(dots[j].x, dots[j].y, dot.x, dot.y);
        // dot.eat_dis = ((dot.r) * (dot.lived * 0.1)) + 200;
        if ((dis_ <= 100) && (dis < 100)) {
            //Draw line between dots
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.strokeStyle = hexToRgbA(line_color, (dot.life / dot.maxLife));
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.lineTo(vPlayer.x, vPlayer.y);
            ctx.lineWidth = dis_ / (dot.eat_dis * 5);
            ctx.stroke();
        }
        // }
    }
}

var shapes = [];
function addShape(position_x, position_y, shape, radius, height, width, willPush, willPull) {
    if ($("#select_shape").val() === 'none') {return 0}
    if(shapes.length > 100) {
        shapes.splice(0, 1);
    } else {
        shapes.push({
            x: position_x,
            y: position_y,
            shape: shape,
            r: (shape === "circle") ? radius : 0,
            height: (shape === 'square') ? height : 0,
            width: (shape === 'square') ? width : 0,
            willPull: willPush ? false : willPull,
            willPush: willPull ? false : willPush
        })
    }
}

var drawing_shape = false;
$("#canvas").mousedown(function() {
    if (!$("#btn-add_shape").hasClass("button_clicked")) { return }
    click_point_x = vPlayer.x;
    click_point_y = vPlayer.y;
    drawing_shape = true;
})
$("#canvas").mouseup(function () {
    if(drawing_shape ) {
        let width = Math.abs(vPlayer.x - click_point_x);
        let height = Math.abs(vPlayer.y - click_point_y);
        let x = (vPlayer.x < click_point_x) ? vPlayer.x : click_point_x;
        let y = (vPlayer.y < click_point_y) ? vPlayer.y : click_point_y;
        console.log(width, height);
        addShape(x, y, 'square', 0, height, width, false , false);
        drawing_shape = false;
    }
})

function drawDottedSquare() {
    if ($("#btn-add_shape").hasClass("button_clicked") && drawing_shape) {
        let posx = (vPlayer.x < click_point_x) ? click_point_x - vPlayer.x : vPlayer.x - click_point_x;
        let posy = (vPlayer.y < click_point_y) ? click_point_y - vPlayer.y : vPlayer.y - click_point_y;
    
        ctx.beginPath();
        ctx.moveTo(click_point_x, click_point_y);
        ctx.setLineDash([5, 5])
        ctx.strokeStyle = "white"
        ctx.lineTo(click_point_x, vPlayer.y);
        ctx.lineTo(vPlayer.x, vPlayer.y);
        ctx.lineTo(vPlayer.x, click_point_y);
        ctx.lineTo(click_point_x, click_point_y);
        ctx.lineWidth = 2
        ctx.stroke();
    }
}

function drawShape() {
    for(let i = 0; i < shapes.length; i++) {
        // console.log(shapes);
        let shapes_ = shapes[i];
        ctx.beginPath();
        if (shapes_.shape === 'circle') {
            ctx.arc(shapes_.x, shapes_.y, shapes_.r, 0, (2 * Math.PI));
        } else {
            ctx.rect(shapes_.x, shapes_.y, shapes_.width, shapes_.height);
        }
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();
    }
}

var curShape = $("#select_shape").val();
function changeShape() {
    let newShape = $("#select_shape").val();
    console.log("#shape_" + curShape + "_size");
    console.log("#shape_" + newShape + "_size");
    $("#shape_" + curShape + "_size").addClass('display_none');
    $("#shape_" + newShape + "_size").removeClass('display_none');
    curShape = $("#select_shape").val();
}

function drawVPlayer() {
    if ($("#btn-pointer_visible").hasClass('button_clicked')) {
        let size = $("#pointer_size").val();
        ctx.beginPath();
        ctx.arc(vPlayer.x, vPlayer.y, vPlayer.r + 1, 0, (2 * Math.PI));
        ctx.fillStyle = 'white';
        ctx.font = size + 'px serif';
        ctx.fillText("(" + Math.round(vPlayer.x) + ' , ' + Math.round(vPlayer.y) + ")", vPlayer.x, vPlayer.y - 20);
        ctx.fill();
        ctx.restore();
    }
}

// Logic for the dots 
function update_dots() {
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        let disToVPlayer = return_distance(vPlayer.x, vPlayer.y, dot.x, dot.y);
        let dis_to_center = return_distance(cw / 2, ch / 2, dot.x, dot.y);
        let ang = return_angle(vPlayer.x, vPlayer.y, dot.x, dot.y);
        let attract = $('#btn-attract').hasClass('button_clicked');
        let showLine = $('#btn-line').hasClass('button_clicked');
        let attract_dist = Number($('#attract_dist').val());
        dot.speed = ($('#btn-speed').hasClass('button_clicked')) ? randNum(Number($('#speed1').val()), Number($('#speed2').val())) : $('#speed1').val()
        dot.x += dot.vx;/// randNum(2, 7);
        dot.y += dot.vy;/// randNum(2, 7);
        dot.vx += dot.ax;
        dot.vy += dot.ay;
        // let ang = return_angle(randNum(-cw, cw) / randNum(2, 7), randNum(-ch, ch) / randNum(2, 7), dot.x, dot.y);

        if(showLine) {
            draw_line(dot, attract_dist);
        }

        if (disToVPlayer < attract_dist && attract) {
            dot.x += (vPlayer.x - dot.x) / (disToVPlayer / dot.speed); //ang;//vPlayer.x;
            dot.y += (vPlayer.y - dot.y) / (disToVPlayer / dot.speed); //ang;//vPlayer.y;
        }

        

        // if (disToVPlayer < 100) {
        //     dot.stopped = true;
        //     dot.vx = 0; //(vPlayer.x - dot.x) / (disToVPlayer); //ang;//vPlayer.x;
        //     dot.vy = 0; //(vPlayer.y - dot.y) / (disToVPlayer); //ang;//vPlayer.y;
        // } else if(!dot.stopped){
        //     dot.vx = dot.ogvx;
        //     dot.vy = dot.ogvy;
        // }

        if (dis_to_center > 1400) {
            if (randVal(1, 1000) < 800) {
                dot.x = dot.ogX;
                dot.y = dot.ogY;
                // dot.vx = dot.ogvx;
                // dot.vy = dot.ogvy;
            }
        } else {
            checkBorderCollision(dot);

            if ($("#btn-shape_collision").hasClass("button_clicked")) {
                checkShapeCollision(dot);
            }
        }

        if(dot.life <= 0) {
            // dots.splice(dot.pos, i);
        } else {
            dot.life -= 1;
        }

        if ((randNum(1, 1000) <= 5)) {
            // dot.vx = randNum(-5, 5) / randNum(2, 7);
            // dot.vy = randNum(-5, 5) / randNum(2, 7);
        }

        //randomly change direction
        // if ((randNum(1, 1000) <= 10) ){// && (return_distance(dot.newX, dot.newY, dot.x, dot.y) < 10) && (return_distance(dot.newX, dot.newY, dot.x, dot.y) < 10)) {
        //     // dot.vx = 0;
        //     // dot.vy = 0;
        //     dot.newX = (randNum(-cw, cw));
        //     dot.newY = (randNum(-ch, ch));
        //     dot.x += (dot.newX - dot.x) / (return_distance(dot.newX, dot.newY, dot.x, dot.y) / 2);
        //     dot.y += (dot.newY - dot.y) / (return_distance(dot.newX, dot.newY, dot.x, dot.y) / 2);
        // }
    }
}

///////End dot script//////

//////Start dot script//////
var dots = [];
var addDots = ({ totalParticle, position_x, speed, position_y, velocity_x, velocity_y, gravity_x, gravity_y, particle_size, particle_life, particle_color }) => {
    let showVal = (arr) => { return arr[2] ? (arr[3] ? randNum(arr[0], arr[1]) : randVal(arr[0], arr[1])) : arr[0]}
    for (var i = 0; i < (totalParticle ? (totalParticle > 1000 ? 1000 : totalParticle) : randNum(100, 400)); i++) {
        let x = showVal(position_x) ? showVal(position_x) : randNum(-map_w, map_w);
        let y = showVal(position_y) ? showVal(position_y) : randNum(-map_h, map_h);
        dots.push({
            x: x,
            y: y,
            ogX: x,
            ogY: y,
            r: showVal(particle_size) ? showVal(particle_size) : randNum(0.1, 2),
            vx: showVal(velocity_x) / 7,
            vy: showVal(velocity_y) / 7,
            ogvx: showVal(velocity_x) / 7,
            ogvy: showVal(velocity_y) / 7,
            speed: showVal(speed),
            ax: showVal(gravity_x),
            ay: showVal(gravity_y),
            ogax: showVal(gravity_x),
            ogay: showVal(gravity_y),
            pos: i,
            life: showVal(particle_life) ? showVal(particle_life) : randNum(100000, 1000000),
            maxLife: showVal(particle_life) ? showVal(particle_life) : randNum(100000, 1000000),
            color: particle_color ? particle_color : 'white',
            stopped: false,
        });
    }
}

var simulationVariables = {
    targetParticle: 0,
    totalParticle: 100,
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

const times = [];
var fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
    });
}
refreshLoop();

$("input").change(function(){
    let max = Number($(this).attr('max'));
    let val = Number($(this).val());

    if (val > max) {
        $(this).val(max);
    }
})

//Request animation frame for rendering
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var started =  false;
function start() {
    window.requestAnimFrame(start);
    ctx.clearRect(0, 0, map_w, map_h);
    draw_dots();
    update_dots();
    drawVPlayer();
    drawShape();
    drawDottedSquare();
    started = true;
}

// addDots(100);
start();

window.setInterval(function () {
    $(".fps").html(fps);
}, 1000)

$(".and_or").click(function() {
    $(this).toggleClass('and');
    $(this).html($(this).hasClass('and') ? 'and' : 'or');
})

$("#btn-delete_all").click(function () {
    shapes = [];
})

$("canvas").click(function(){
    unsetValToMouse();
    if (!$("#btn-add_shape").hasClass("button_clicked")) {
        addShape(vPlayer.x, vPlayer.y, $("#select_shape").val(), Number($("#shape_radius").val()), Number($("#shape_height").val()), Number($("#shape_width").val()), $("#btn-shape_forces_push").hasClass('button_clicked'), $("#btn-shape_forces_pull").hasClass('button_clicked'))
    }
    click_point_x = vPlayer.x;
    click_point_y = vPlayer.y;
});

$(".toggle_button").click(function() {
    $(this).toggleClass('button_clicked');
    $(this).children().toggleClass('switch_on');
    $(this).children().toggleClass('switch_off');
})

$("#startSimulation").click(() => {
    dots = [];
    var variableIDs = []
    var prevId = '';
    variableIDs = $("input").map((i) => {
        if ($("input").get(i).className != "") {
            return $("input").get(i).className;
        }
    })
    // console.log(variableIDs)
    Array.prototype.forEach.call(variableIDs, id => {
        if (prevId !== id && $("input." + id).length > 1) {
            var id1 = $("input#" + id + "1");
            var id2 = $("input#" + id + "2")
            let val1 = Number(id1.val());
            let val2 = (Number(id2.val()) < val1) ? Number((id2.val(val1)).val()) : (Number(id2.val()));
            let simVarArr = [
                val1,
                val2,
                ($("#" + "btn-" + id).hasClass('button_clicked')) ? true : false ,
                ($("#" + "and_or-" + id).hasClass('and')) ? true : false,
            ]
            simulationVariables[id] = simVarArr;
            prevId = id;
        } else if (prevId !== id) {
            simulationVariables[id] = (id === "particle_color") ? $("input#" + id).val() : Number($("input#" + id).val())
        }
    })
    // console.log(simulationVariables);
    addDots(simulationVariables);
    if(!started) {
        start();
    }

    // var variableID = $("input").get(i).id;
    // var variableVal = $("#" + variableID).val();
    // simulationVariables.variableID = variableVal;
})
