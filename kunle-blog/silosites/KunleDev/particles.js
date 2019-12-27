var canvas = document.getElementById("canvas"); //get canvas element
var ctx = canvas.getContext("2d"); //get the 2d canvas context
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
var cw = canvas.width;
var ch = canvas.height;
var map_w = cw * 1.3; //Full map view
var map_h = ch * 1.3; //Full map view
var click_point_x;
var click_point_y;
var simulationStarted = false; // check if the simulation has been started
var positionMousePos = []; //ids of current mouse to input cursor
var selecting_position = false; //if user is currently selecting a position.
var current_shapes = [];
$("#particleControlContainer").draggable(); //Make the particle variables container moveable

var shapes = []; //drawn shapes.
var removed_shapes = []; //removed shapes, used to restore deleted shapes. 
var drawing_shape = false; //Check if shape is being drawn.

var dots = []; //drawn dots

//resize the canvas when window is resized
$(window).resize(function () {
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    cw = canvas.width;
    ch = canvas.height;

    map_w = cw * 1.3;
    map_h = ch * 1.3;
});

//set virtual player object
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

//Set default simulation variables. 
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


//////////////////////////////////////GET SIMULATION FPS//////////////////////////////
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

window.setInterval(function () {
    $(".fps").html(fps);
}, 1000)

//////////////////////////////////////FUNCTIONS//////////////////////////////////////
//Random number Generator
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

//pick a random value between two values
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

//Find the speed of an object givin its velocity.
function return_speed(velocity_x, velocity_y) {
    let speed = Math.sqrt(velocity_y * velocity_y + velocity_x * velocity_x);
    return speed;
}

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

//Set input value to the position of the mouse
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
    selecting_position = false;
}

//Get the position of the mouse inside of an element.
function getMousePos(boundingBox, e) {
    var rect = boundingBox.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * boundingBox.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * boundingBox.height
    };
}

//reset the position of the particle variables container
function resetPContainerPosition() {
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
}

function reflect_angle(dot, reflectAngle) {
    let angle = return_angle(dot.vx, dot.vy); //Get the angle of the dot.
    angle = reflectAngle - angle;
    var radians = angle * Math.PI / 180;
    dot.vx = Math.cos(radians) * return_speed(dot.vx, dot.vy);
    dot.vy = Math.sin(radians) * return_speed(dot.vx, dot.vy);
}

function checkBorderCollision(dot) {
    let side_toggled = (side) => {
        return $('#btn-border-collision_' + side).hasClass('button_clicked');
    }
    let angle = return_angle(dot.vx, dot.vy); //Get the angle of the dot.

    if (dot.x > cw && side_toggled('R')) {
        dot.x = cw - dot.r;
        reflect_angle(dot, 180);
    }
    if (dot.x < 0 && side_toggled('L')) {
        dot.x = dot.r
        reflect_angle(dot, 180);
    }
    if (dot.y > ch && side_toggled('B')) {
        dot.y = ch + dot.r
        reflect_angle(dot, 360);
    }
    if (dot.y < 0 && side_toggled('T')) {
        dot.y = dot.r
        reflect_angle(dot, 360);
    }
}

function checkShapeCollision(object) {
    for (var i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        //First check if the current shape is a square.
        if (shape.shape === 'square') {
            let angle = return_angle(dot.vx, dot.vy);

            var distX = Math.abs(object.x - shape.x - shape.width / 2); // Distance circle is to the square. 
            var distY = Math.abs(object.y - shape.y - shape.height / 2); // Distance circle is to the square.
            let didCollide = ((distX <= (shape.width / 2)) && (distY <= (shape.height / 2)));

            if (didCollide) {
                let shape = [true, i];
                return shape;
                //Get the distance between the center of the circle and each side of the square.
            }
        }
    }
    return [false, 0]
}

var curShape = $("#select_shape").val();
//Change the shape user is drawing.
function changeShape() {
    let newShape = $("#select_shape").val();
    // console.log("#shape_" + curShape + "_size");
    // console.log("#shape_" + newShape + "_size");
    $("#shape_" + curShape + "_size").addClass('display_none');
    $("#shape_" + newShape + "_size").removeClass('display_none');
    curShape = $("#select_shape").val();
}

/////////////////////////////////////////////CLICK AND MOUSE EVENTS////////////////////////////////////////////////////////////////////
//When any input value is changed makes these checks then restart the simulation
$("input").change(function () {
    let max = Number($(this).attr('max'));
    let val = Number($(this).val());

    if (val > max) {
        $(this).val(max);
    }
    getSimulationVariables();
})

document.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    vPlayer.x = mousePos.x;
    vPlayer.y = mousePos.y;

    if (selecting_position) {
        positionMousePos.map((id) => {
            id = id.replace("mouse_pos_", "");
            setValToMousePos(id, mousePos.x, mousePos.y);
        })
    }
    resetPContainerPosition();
}, false);

//Key code events//
//undo and redo actions
var ctrlDown = false;
var ctrlKey = 17, zKey = 90, yKey = 89;

document.body.onkeydown = function (e) {
    if (e.keyCode == 17 || e.keyCode == 91) {
        ctrlDown = true;
    }
    if ((ctrlDown && e.keyCode == zKey)) {
        if (shapes.length > 0) {
            removed_shapes.push(shapes.pop());
        }
    }
    if ((ctrlDown && e.keyCode == yKey)) {
        if (removed_shapes.length > 0) {
            shapes.push(removed_shapes.pop());
        }
    }
    if (e.keyCode == 37) {
        // shapes[current_shapes].x -= 1;
        current_shapes.forEach(function (item) {
            shapes[item].x -= 10;
        })
    }
}
document.body.onkeyup = function (e) {
    if (e.keyCode == 17 || e.keyCode == 91) {
        ctrlDown = false;
    };
};

//When mouse icon, which is used to select position, is clicked we keep track of the ones that are clicked.
$(".mouse_icon").click(function () {
    let id = $(this).attr('id');
    let arr = positionMousePos;
    let indexOfPosItem = positionMousePos.indexOf(id);
    if (indexOfPosItem !== -1) {
        arr.splice(indexOfPosItem, 1);
        positionMousePos = arr;
    } else {
        positionMousePos.push(id);
    }
    $(this).toggleClass('mouse_icon_clicked');
    selecting_position = true;
})

$("canvas").click(function () {
    if (selecting_position) { getSimulationVariables(); unsetValToMouse(); }
    if (!$("#btn-add_shape").hasClass("button_clicked")) {
        let width = Number($("#shape_width").val());
        let height = Number($("#shape_height").val());
        addShape((vPlayer.x - width / 2), (vPlayer.y - height / 2), $("#select_shape").val(), Number($("#shape_radius").val()), height, width, $("#btn-shape_forces_push").hasClass('button_clicked'), $("#btn-shape_forces_pull").hasClass('button_clicked'))
    }
    click_point_x = vPlayer.x;
    click_point_y = vPlayer.y;
});

$("#canvas").mousedown(function () {
    //if setting is click to add shape then we don't draw the lines. 
    if (!$("#btn-add_shape").hasClass("button_clicked")) { return }
    click_point_x = vPlayer.x;
    click_point_y = vPlayer.y;
    drawing_shape = true;
})

$("#canvas").mouseup(function () {
    //Do this after canvas is clicked and mouse is released
    if (drawing_shape) {
        //If drawing is enabled draw the shape with these attributes.
        let width = Math.abs(vPlayer.x - click_point_x);
        let height = Math.abs(vPlayer.y - click_point_y);
        let x = (vPlayer.x < click_point_x) ? vPlayer.x : click_point_x;
        let y = (vPlayer.y < click_point_y) ? vPlayer.y : click_point_y;
        // console.log(width, height);
        addShape(x, y, 'square', 0, height, width, false, false);
        drawing_shape = false;
    }
})

//Toggle and and or button.
$(".and_or").click(function () {
    $(this).toggleClass('and');
    $(this).html($(this).hasClass('and') ? 'and' : 'or');
})

//Delete all shapes
$("#btn-delete_all").click(function () {
    shapes = [];
})

$(".toggle_button").click(function () {
    $(this).toggleClass('button_clicked');
    $(this).children().toggleClass('switch_on');
    $(this).children().toggleClass('switch_off');
    getSimulationVariables();
})
/////////////////////////////////////////////DRAWING AND UPDATING THE SIMULATION///////////////////////////////////////////////////////
function draw_dots() {
    for (var i = 0; i < dots.length; i++) {
        let dot = dots[i];
        let dis_to_center = return_distance(cw / 2, ch / 2, dot.x, dot.y);
        if (dis_to_center < 1000) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r + 1, 0, (2 * Math.PI));
            ctx.fillStyle = hexToRgbA(dot.color, (dot.life / dot.maxLife))
            ctx.fill();
            ctx.restore();
        }
    }
}

//Draw lines between both users mouse and other dots.
function draw_line(dot, attract_dist) {
    let dis = return_distance(vPlayer.x, vPlayer.y, dot.x, dot.y);
    let line_color = $("#line_color").val();
    for (var j = 0; j < dots.length; j++) {
        var dis_ = return_distance(dots[j].x, dots[j].y, dot.x, dot.y);
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
    }
}

//Draw a dotted square based on the players position and where the player first clicked (click_points);
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

//Draw all shapes in the shapes array if the length of the array is more than 0
function drawShape() {
    if (shapes.length < 1) { return 0 }
    for (let i = 0; i < shapes.length; i++) {
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

//draw the point around the users mouse.
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

//Game update script
function update_dots() {
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        let dis_to_center = return_distance(cw / 2, ch / 2, dot.x, dot.y);
        if (dis_to_center < 2000) {
            let disToVPlayer = return_distance(vPlayer.x, vPlayer.y, dot.x, dot.y);
            let distToPoint = (pointX, pointY) => { return return_distance(pointX, pointY, dot.x, dot.y); }
            let ang = return_angle(vPlayer.x, vPlayer.y, dot.x, dot.y);
            let attract = $('#btn-attract').hasClass('button_clicked');
            let showLine = $('#btn-line').hasClass('button_clicked');
            let attract_dist = Number($('#attract_dist').val());
            dot.speed = ($('#btn-speed').hasClass('button_clicked')) ? randNum(Number($('#speed1').val()), Number($('#speed2').val())) : $('#speed1').val()
            dot.x += dot.vx;/// randNum(2, 7);
            dot.y += dot.vy;/// randNum(2, 7);
            dot.vx += dot.ax;
            dot.vy += dot.ay;

            //if "showline" is toggled on we draw a line from the player or dot to other dots based on the attract distance
            if (showLine) {
                draw_line(dot, attract_dist);
            }

            //if the distance between the player and dot is less than attract distance then have th dots move towards the player at the speed defined.  
            if (disToVPlayer < attract_dist && attract) {
                // if the distance to the player is less than 5 pixels then set the position of the dot to the players position.
                if (disToVPlayer < 5) {
                    dot.x = vPlayer.x;
                    dot.y = vPlayer.y;
                } else {
                    dot.x += (vPlayer.x - dot.x) / (disToVPlayer / dot.speed); //ang;//vPlayer.x;
                    dot.y += (vPlayer.y - dot.y) / (disToVPlayer / dot.speed); //ang;//vPlayer.y;
                }
            }
            checkBorderCollision(dot);

            if ($("#btn-shape_collision").hasClass("button_clicked")) {
                let shapeCollision = checkShapeCollision(dot);
                if (shapeCollision[0]) {
                    let shape = shapes[shapeCollision[1]];
                    let sides = [
                        (Math.abs(dot.x - shape.x)),
                        (Math.abs(dot.x - (shape.x + shape.width))),
                        (Math.abs(dot.y - shape.y)),
                        (Math.abs(dot.y - (shape.y + shape.height))),
                    ]
                    //Now get the index at the smalled distance in the previous array.
                    let i = sides.indexOf(Math.min(...sides));
                    if (i < 2) {
                        reflect_angle(dot, 180);
                    } else {
                        reflect_angle(dot, 360);
                    }
                }
            }

            //Random events happen here
            if ((randNum(1, randNum(1000, 10000)) <= randNum(1, 10))) {
                dot.life -= 1;
            }
        } else {
            if (randNum(1, 1000) < 100) {
                dot.x = dot.ogX;
                dot.y = dot.ogY;
            }
        }
    }
}

//Add a shape to the shapes array
function addShape(position_x, position_y, shape, radius, height, width, willPush, willPull) {
    if ($("#select_shape").val() === 'none') { return 0 }
    if (shapes.length > 100) {
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

//Add dots the the dots array
function addDots(devVariable = false, { totalParticle, position_x, speed, position_y, velocity_x, velocity_y, gravity_x, gravity_y, particle_size, particle_life, particle_color }) {
    let showVal = (arr) => { return !devVariable ? arr[2] ? (arr[3] ? randNum(arr[0], arr[1]) : randVal(arr[0], arr[1])) : arr[0] : arr }
    for (let i = 0; i < (totalParticle ? (totalParticle > 1000 ? 1000 : totalParticle) : randNum(100, 400)); i++) {
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

/////////////////////////////////START THE SIMULATION///////////////////////////////////
//Before starting the simulation we need to get the simulation variables
function getSimulationVariables() {
    dots = [];
    let variableIDs = []
    let prevId = '';
    //Get the variable ids from the dom (input that have classes)
    variableIDs = $("input").map((i) => {
        if ($("input").get(i).className != "") {
            return $("input").get(i).className;
        }
    })
    //For each of these input extract the information we need.
    Array.prototype.forEach.call(variableIDs, id => {
        if (prevId !== id && $("input." + id).length > 1) {
            var id1 = $("input#" + id + "1");
            var id2 = $("input#" + id + "2")
            let val1 = Number(id1.val());
            let val2 = ($("#" + "and_or-" + id).hasClass('and')) ? ((Number(id2.val()) < val1) ? Number((id2.val(val1)).val()) : (Number(id2.val()))) : (Number(id2.val())); //if and operator then make sure second value is greater otherwise second value can be any number.
            let simVarArr = [
                val1,
                val2,
                ($("#" + "btn-" + id).hasClass('button_clicked')) ? true : false,
                ($("#" + "and_or-" + id).hasClass('and')) ? true : false,
            ]
            simulationVariables[id] = simVarArr;
            prevId = id;
        } else if (prevId !== id) {
            simulationVariables[id] = (id === "particle_color") ? $("input#" + id).val() : Number($("input#" + id).val())
        }
    })
    // console.log(simulationVariables);
    addDots(false, simulationVariables);
    if (!simulationStarted) {
        start();
    }
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

function start() {
    window.requestAnimFrame(start);
    ctx.clearRect(0, 0, map_w, map_h);
    draw_dots();
    update_dots();
    drawVPlayer();
    drawShape();
    drawDottedSquare();
    simulationStarted = true;
}

getSimulationVariables()