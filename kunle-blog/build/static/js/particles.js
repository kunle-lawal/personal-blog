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
var clicked_shapes = [];
$("#particleControlContainer").draggable(); //Make the particle variables container moveable

var shapes = []; //drawn shapes.
var removed_shapes = []; //removed shapes, used to restore deleted shapes.
// var shape_changes_to_undo = [] //keeps track of all changes made to shapes.
// var shape_changes_to_redo = [] //keep track of al changes that were undone.
var copiedShapes = [] //shapes that were copies
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
    height: 30,
    width: 30,
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

//Copy the shape object and save its state.
function copyShapes() {
    copiedShapes = [];
    let getShapes = [];
    clicked_shapes.forEach(function (shapeIndex) {
        getShapes.push(shapes[shapeIndex]);
    })
    getShapes.map(function (item) {
        copiedShapes.push({ ...item });
    });
    // console.log(newShape);
    // newShape[0].x = vPlayer.x;
    // console.log(shape);
    // let newShape = shape.map(function(item) {
    //     copiedShapes.push({...item});
    // });
    // console.log(copiedShapes);
    // console.log(shapes, newShape);
}

function pasteShapes() {
    copiedShapes.forEach(function (shape) {
        shape.x = vPlayer.x - (shape.width / 2);
        shape.y = vPlayer.y - (shape.height / 2);
        addShape(shape);
    })
}

// function storeChangesToShapes(typeOfChange, shapeIndex, changeMade) {
//     let change_made = [typeOfChange, shapeIndex, changeMade];
//     shape_changes_to_undo.push(change_made);
//     if(typeOfChange === "Shape Removed") {removed_shapes.push(shapes[shapeIndex])}
// }

//undo changes
// function undoShapeChange() {
//     //get last change data
//     // console.log(shape_changes_to_undo.length)
//     if(shape_changes_to_undo.length < 1) {return} //if there are no changes to undo exit
//     let lastChange = {
//         type: shape_changes_to_undo[shape_changes_to_undo.length - 1][0],
//         index: shape_changes_to_undo[shape_changes_to_undo.length - 1][1],
//         change: shape_changes_to_undo[shape_changes_to_undo.length - 1][2]
//     }
//     //push last action to redo array so can redo
//     // console.log(lastChange)
//     shape_changes_to_redo.push([lastChange.type, lastChange.index, (lastChange.type === "Shape Added" || lastChange.type === "Shape Removed") ? null : shapes[lastChange.index][lastChange.type]]);
//     shape_changes_to_undo.pop() //remove the last item from the undo array.
//     // console.log(shape_changes_to_redo, shapes)
//     //If the last action is no adding shape or removing shapes then we set the previous changes.
//     if(lastChange.type !== "Shape Added" && lastChange.type !== "Shape Removed") {
//         shapes[lastChange.index][lastChange.type] = lastChange.change;
//     } else {
//         //Add shapes
//         if(lastChange.type == "Shape Added") {
//             if(shapes.length > 0) {
//                 removed_shapes.push(shapes.pop());
//             }
//         } else if(lastChange.type == "Shape Removed") {
//             if(removed_shapes.length > 0) {
//                 shapes.push(removed_shapes.pop());
//             }
//         }
//     }
// }

//Redo changes 
// function redoShapeChange() {
//     if (shape_changes_to_redo.length < 1) { return } //If there is nothing to redo then exit.
//     let lastChange = {
//         type: shape_changes_to_redo[shape_changes_to_redo.length - 1][0],
//         index: shape_changes_to_redo[shape_changes_to_redo.length - 1][1],
//         change: shape_changes_to_redo[shape_changes_to_redo.length - 1][2]
//     }
//     // console.log(lastChange);
//     //push last redo action to the undo array
//     console.log(lastChange);
//     shape_changes_to_undo.push([lastChange.type, lastChange.index, (lastChange.type === "Shape Added" || lastChange.type === "Shape Removed") ? null : shapes[lastChange.index][lastChange.type]]);
//     shape_changes_to_redo.pop(); //remove last item from redo array
//     if (lastChange.type != "Shape Added" && lastChange.type != "Shape Removed") {
//         shapes[lastChange.index][lastChange.type] = lastChange.change;
//     } else {
//         if (lastChange.type === "Shape Added") {
//             if(removed_shapes.length > 0) {
//                 shapes.push(removed_shapes.pop());
//             }
//         } else if (lastChange.type === "Shape Removed") {
//             if(shapes.length > 0){
//                 removed_shapes.push(shapes.pop());
//             }
//         }
//     }
// }

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
            let angle = return_angle(object.vx, object.vy);

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
//Key code events//
//undo and redo actions
var ctrlDown = false;
var ctrlKey = 17, zKey = 90, yKey = 89;
var shiftDown = false;
document.body.onkeydown = function (e) {
    if (e.keyCode == 17 || e.keyCode == 91) {
        ctrlDown = true;
    }

    if (e.keyCode == 16) {
        shiftDown = true;
    }
    if ((ctrlDown && e.keyCode == 67)) {
        copyShapes();
    }
    if ((ctrlDown && e.keyCode == 86)) {
        pasteShapes()
    }
    if (e.keyCode == 37) {
        //left 
        clicked_shapes.forEach(function (item) {
            if (ctrlDown) {
                // storeChangesToShapes('width', item, shapes[item].width);
                shapes[item].width -= shiftDown ? 10 : 1;
            } else {
                // storeChangesToShapes('x', item, shapes[item].x);
                shapes[item].x -= shiftDown ? 10 : 1;
            }
        })
    }
    if (e.keyCode == 38) {
        //top
        clicked_shapes.forEach(function (item) {
            if (ctrlDown) {
                // storeChangesToShapes('height', item, shapes[item].height);
                shapes[item].height -= shiftDown ? 10 : 1;
            } else {
                // storeChangesToShapes('y', item, shapes[item].y);
                shapes[item].y -= shiftDown ? 10 : 1;
            }
        })
    }
    if (e.keyCode == 39) {
        //right
        clicked_shapes.forEach(function (item) {
            if (ctrlDown) {
                // storeChangesToShapes('width', item, shapes[item].width);
                shapes[item].width += shiftDown ? 10 : 1;
            } else {
                // storeChangesToShapes('x', item, shapes[item].x);
                shapes[item].x += shiftDown ? 10 : 1;
            }
        })
    }
    if (e.keyCode == 40) {
        //bottom
        clicked_shapes.forEach(function (item) {
            if (ctrlDown) {
                // storeChangesToShapes('height', item, shapes[item].height);
                shapes[item].height += shiftDown ? 10 : 1;
            } else {
                // storeChangesToShapes('y', item, shapes[item].y);
                shapes[item].y += shiftDown ? 10 : 1;
            }
        })
    }
    if (e.keyCode == 46) {
        clicked_shapes.forEach(function (shapeIndex) {
            // storeChangesToShapes("Shape Removed", shapeIndex, null);
            shapes[shapeIndex].highlighted = false;
            shapes.splice(shapeIndex, 1);
        })
        clicked_shapes = [];
    }
}

document.body.onkeyup = function (e) {
    if (e.keyCode == 17 || e.keyCode == 91) {
        ctrlDown = false;
    };

    if (e.keyCode == 16) {
        shiftDown = false;
    }
};

$("input").change(function () {
    let max = Number($(this).attr('max'));
    let val = Number($(this).val());

    if (val > max) {
        $(this).val(max);
    }
    getSimulationVariables();
})

var mouseMoving = false;
var timeout;
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
    mouseMoving = true;
    clearTimeout(timeout);
    timeout = setTimeout(function () { mouseMoving = false; }, 200);
}, false);


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
    if ($("#btn-click_draw").hasClass("button_clicked") && !checkShapeCollision(vPlayer)[0]) {
        let width = Number($("#shape_width").val());
        let height = Number($("#shape_height").val());
        addShape({ x: (vPlayer.x - width / 2), y: (vPlayer.y - height / 2), shape: $("#select_shape").val(), radius: Number($("#shape_radius").val()), height, width, willPush: $("#btn-shape_forces_push").hasClass('button_clicked'), willPull: $("#btn-shape_forces_pull").hasClass('button_clicked') })
    }
    click_point_x = vPlayer.x;
    click_point_y = vPlayer.y;
});
window.setInterval(function () {
    // console.log(checkShapeCollision(vPlayer)[0], drawing_shape, clicked_shapes);
}, 100)

$("#canvas").mousedown(function () {
    //if setting is click to add shape then we don't draw the lines. 
    let playerToShapeCollision = checkShapeCollision(vPlayer);
    click_point_x = vPlayer.x;
    click_point_y = vPlayer.y;
    if (!playerToShapeCollision[0]) {
        click_point_x = vPlayer.x;
        click_point_y = vPlayer.y;
        drawing_shape = true;
        clicked_shapes.forEach(function (shapeInx) {
            shapes[shapeInx].highlighted = false;
        })
        clicked_shapes = []
        vPlayer.isColliding = false;
    } else if (playerToShapeCollision[0] && drawing_shape === false) {
        //If collision is tru do this
        vPlayer.isColliding = true;
        shapeIndex = playerToShapeCollision[1];
        shape = shapes[shapeIndex];
        vPlayer.width = shape.width;
        vPlayer.height = shape.height;
        console.log(!shapes[shapeIndex].highlighted)
        if (!clicked_shapes.includes(shapeIndex)) {
            if (!ctrlDown) {
                clicked_shapes.forEach(function (shapeIndex) {
                    shapes[shapeIndex].highlighted = false;
                })
                clicked_shapes = [];
            }
            clicked_shapes.push(shapeIndex);
            shape.highlighted = !shape.highlighted;
        } else {
            let clicked_shapes_index = clicked_shapes.indexOf(shapeIndex);
            if (!mouseMoving) {
                clicked_shapes.forEach(function (shapeIndex) {
                    shape.highlighted = false;
                })
                clicked_shapes = [];
            }
            // clicked_shapes.splice(clicked_shapes_index, 1);
            // shape.highlighted = false;
        }
        clicked_shapes.forEach(function (shapeIndex) {
            shapes[shapeIndex].beingMoved = true;
        })
    }
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
        if (return_distance(click_point_x, click_point_y, vPlayer.x, vPlayer.y) > 10) {
            if (!$("#btn-drag_draw").hasClass("button_clicked")) { drawing_shape = false; return }
            addShape({ x, y, shape: 'square', radius: 0, height, width, willPush: false, willPull: false });
        }
        drawing_shape = false;
    }

    clicked_shapes.forEach(function (shapeIndex) {
        shapes[shapeIndex].x = shapes[shapeIndex].newX;
        shapes[shapeIndex].y = shapes[shapeIndex].newY;
        shapes[shapeIndex].beingMoved = false;
    })
})

//Toggle and and or button.
$(".and_or").click(function () {
    $(this).toggleClass('and');
    $(this).html($(this).hasClass('and') ? 'and' : 'or');
    getSimulationVariables();
})

//Delete all shapes
$("#btn-delete_all").click(function () {
    shapes = [];
    removed_shapes = [];
    shape_changes_to_undo = [];
    shape_changes_to_redo = [];
    clicked_shapes = [];
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

function draw_line_to(fromObject, { x: toObjectX, y: toObjectY, width: toObjectW, height: toObjectH }, type) {
    if (!$("#btn-show_lines").hasClass("button_clicked")) { return false; }
    if (type == "square to square") {
        let line_color = "white";
        for (let i = 0; i < fromObject.length; i++) {
            let square = (fromObject[i].shape == "square") ? fromObject[i] : [];
            let squareCenter = {
                x: (square.x + (square.width / 2)),
                y: (square.y + (square.height / 2))
            }
            //distance from middle of shape to middle of other shape
            let dis = return_distance((toObjectX + (toObjectW / 2)), (toObjectY + (toObjectH / 2)), squareCenter.x, squareCenter.y);
            let maxDis = Math.sqrt((square.width / 2 * square.width / 2) + (square.width / 2 * square.width / 2));
            if (dis <= maxDis + 150) {
                if ((squareCenter.x <= toObjectX + 5 && squareCenter.x >= toObjectX - 5)) {
                    ctx.setLineDash([0, 0])
                    vPlayer.x = squareCenter.x;
                } else if ((squareCenter.y <= toObjectY + 5 && squareCenter.y >= toObjectY - 5)) {
                    ctx.setLineDash([0, 0])
                    vPlayer.y = squareCenter.y;
                } else {
                    ctx.setLineDash([10, 10])
                }
                //Draw line between dots
                ctx.beginPath();
                ctx.moveTo(squareCenter.x, squareCenter.y);
                ctx.strokeStyle = "red";
                ctx.lineTo(toObjectX, toObjectY);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

//Draw a dotted square based on the players position and where the player first clicked (click_points);
function drawDottedSquare() {
    if (drawing_shape) {
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
        let shape = shapes[i];
        ctx.beginPath();
        if (shape.shape === 'circle') {
            ctx.arc(shape.x, shape.y, shape.r, 0, (2 * Math.PI));
        } else {
            let dist_to_clickPoint = (click_point, vPlayer_pos) => { return click_point - vPlayer_pos };
            let newShapeX = (dist_to_clickPoint(click_point_x, vPlayer.x) < 0) ? shape.x + Math.abs(dist_to_clickPoint(click_point_x, vPlayer.x)) : shape.x - Math.abs(dist_to_clickPoint(click_point_x, vPlayer.x));
            let newShapeY = (dist_to_clickPoint(click_point_y, vPlayer.y) < 0) ? shape.y + Math.abs(dist_to_clickPoint(click_point_y, vPlayer.y)) : shape.y - Math.abs(dist_to_clickPoint(click_point_y, vPlayer.y));
            shape.newX = shape.beingMoved ? newShapeX /* (vPlayer.x - (shape.width / 2)) */ : shape.newX;
            shape.newY = shape.beingMoved ? newShapeY /* (vPlayer.y - (shape.height / 2)) */ : shape.newY;
            ctx.rect(shape.beingMoved ? newShapeX : shape.x, shape.beingMoved ? newShapeY : shape.y, shape.width, shape.height);
            if (shape.highlighted && !shape.beingMoved) {
                ctx.setLineDash([0, 0])
                ctx.strokeStyle = "#fb2f2f";
                // ctx.lineTo(shape.x, shape.width);
                // ctx.setLineDash([5, 5])
                ctx.lineWidth = 10;
                ctx.stroke();
                // ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else {
                ctx.setLineDash([0, 0])
            }
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
        let shape = $("#select_shape").val();
        let r = $("#shape_radius").val();
        let width = vPlayer.isColliding ? vPlayer.width : $("#shape_width").val();
        let height = vPlayer.isColliding ? vPlayer.height : $("#shape_height").val();
        if (shape === 'circle') {
            ctx.arc(vPlayer.x, vPlayer.y, r + 1, 0, (2 * Math.PI));
        } else {
            ctx.rect(vPlayer.x - (width / 2), vPlayer.y - (height / 2), width, height);
        }
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
                dot.vx = dot.ogvx;
                dot.vy = dot.ogvy;
            }
        }
    }
}

//Add a shape to the shapes array
function addShape({ x, y, shape, radius, height, width, willPush, willPull }) {
    if ($("#select_shape").val() === 'none') { return 0 }
    if (shapes.length > 100) {
        shapes.splice(0, 1);
    } else {
        shapes.push({
            x: x,
            y: y,
            shape: shape,
            r: (shape === "circle") ? radius : 0,
            height: (shape === 'square') ? height : 0,
            width: (shape === 'square') ? width : 0,
            willPull: willPush ? false : willPull,
            willPush: willPull ? false : willPush,
            highlighted: false,
            beingMoved: false,
            index: shapes.length
        })
        // storeChangesToShapes('Shape Added', shapes.length - 1, null);
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
    drawShape();
    drawDottedSquare();
    drawVPlayer();
    draw_line_to(shapes, { ...vPlayer }, "square to square")
    // draw_line_to(shapes, (clicked_shapes.length === 1 ? {
    //     x: (shapes[clicked_shapes[0]].newX + (shapes[clicked_shapes[0]].width / 2)),
    //     y: (shapes[clicked_shapes[0]].newY + (shapes[clicked_shapes[0]].height / 2)),
    //     width: shapes[clicked_shapes[0]].width,
    //     height: shapes[clicked_shapes[0]].height
    // } : { ...vPlayer} ), "square to square")
    simulationStarted = true;
}

getSimulationVariables()