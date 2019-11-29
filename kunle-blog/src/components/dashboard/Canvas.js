import React, { Component } from 'react'

class Canvas extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        canvas.width = document.body.clientWidth; //document.width is obsolete
        canvas.height = document.body.clientHeight; //document.height is obsolete
        var cw = document.body.clientWidth;
        var ch = document.body.clientHeight;
        var map_w = cw * 1.3;
        var map_h = ch * 1.3

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
        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
                y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
            };
        }

        //On mouse movement move the canvas aswell. 
        document.addEventListener('mousemove', function (evt) {
            var mousePos = getMousePos(canvas, evt);
            vPlayer.x = mousePos.x;
            vPlayer.y = mousePos.y;
            offset.directionX = -mousePos.x / 30;
            offset.directionY = -mousePos.y / 30;
        }, false);

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
        for (var i = 0; i < 6; i++) {
            var rand_radius = randNum(0.1, 2);
            var color = "rgba(200, 200, 200, 1)";
            dots.push({
                single: true,
                x: randNum(-map_w, map_w),
                y: randNum(-map_h, map_h),
                r: rand_radius,
                energy: 0,
                vx: randNum(-5, 5) / randNum(2, 7),
                vy: randNum(-5, 5) / randNum(2, 7),
                pos: i,
                speed: 1,

                life: randNum(10, 100),
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
            if (dis < 500) {
                for (var j = 0; j < dots.length; j++) {
                    var dis_ = return_distance(dots[j].x, dots[j].y, dot.x, dot.y);
                    dot.eat_dis = ((dot.r) * (dot.lived * 0.1)) + 200;
                    if ((dis_ <= dot.eat_dis)) {
                        if ((dots[j].life <= dot.life) && (dots[j].life > 0) && (dot.life > 0)) {
                            dot.feeding = true;

                            dots[j].life -= dot.greed;
                            dot.life += dot.greed * 0.3;
                            //Draw line between dots
                            ctx.beginPath();
                            ctx.moveTo(dot.x, dot.y);
                            ctx.strokeStyle = "rgba(255, 255, 255, 1)";
                            ctx.lineTo(dots[j].x, dots[j].y);
                            ctx.lineWidth = dis_ / (dot.eat_dis * 5.5);
                            ctx.stroke();
                            dot.dots_touched++;
                        } else {
                            dot.feeding = false;
                        }
                    }
                }
            }

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r + 1, 0, (2 * Math.PI));
            ctx.fillStyle = dot.color;
            ctx.fill();
            ctx.restore();
        }


        // Logic for the dots 
        function update_dots() {
            // for (var i = 0; i < dots.length; i++) {
            //     var dot = dots[i];
            //     dot.x += dot.vx / randNum(2, 7);
            //     dot.y += dot.vy / randNum(2, 7);


            //     var dis_to_center = return_distance(cw / 2, ch / 2, dot.x, dot.y);
            //     var ang = return_angle(vPlayer.x, vPlayer.y, dot.x, dot.y);

            //     if (dis_to_center < 3000) {
            //         draw_dots(dot);
            //     }
            //     if (dis_to_center > 10000) {
            //         dot.x = randNum((cw / 2 - 300), (cw / 2 + 300));
            //         dot.y = randNum((ch / 2 - 300), (ch / 2 + 300));
            //         dot.vx = randNum(-5, 5) / randNum(2, 7);
            //         dot.vy = randNum(-5, 5) / randNum(2, 7);
            //     }
            //     if (dot.life < 0 && dot.alive) {
            //         var rand_chance_to_live = randNum(1, (dot.lived + 20));
            //         if (rand_chance_to_live < 2) {
            //             dot.r += 1;
            //             dot.alive = false;
            //         } else {
            //             dot.lived++;
            //             dot.life = 100;
            //             //Increase or decrese greed//
            //             if (randNum((dot.lived * 0.1), 1000) <= ((dot.lived * 0.1) + 1)) {
            //                 var rand_greed_increase = randNum(0.01, 1.4);
            //                 var expidite_greed = Math.round(randNum(1, 100));//1 in 100 to have a greed increase of 100%
            //                 if (expidite_greed == 2) {
            //                     //dot.greed *= dot.greed;
            //                     console.log("yum yum");
            //                 } else {
            //                     dot.greed *= rand_greed_increase;
            //                 }
            //             }
            //         }
            //     }
            //     if (dot.feeding) {
            //         dot.stroke = 10;
            //     } else if (!dot.feeding && dot.alive) {
            //         dot.color = dot.og_color;
            //         dot.stroke = 0;
            //     }

            //     //randomly change direction
            //     if (randNum(1, 1000) <= 5) {
            //         dot.vx = randNum(-5, 5) / randNum(2, 7);
            //         dot.vy = randNum(-5, 5) / randNum(2, 7);
            //     }
            //     //offset.directionY -= 0.009;
            //     //vPlayer.y += 0.009;
            // }
        }

        ///////End dot script//////

        function start() {
            // window.requestAnimFrame(start);
            // ctx.clearRect(0, 0, map_w, map_h);
            // update_dots();
        }

        start();
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width="2000px" height="2000px" style={{ "background-color":"#23272e"}}/>
            </div>
        )
    }
}
export default Canvas