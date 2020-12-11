//Caleb Imel Shooter Game
let time = 0;           //Several variables / flags used throughout program
let proTimer = 0;
let bossTimer = 0;
let bossReady = false;
let bossHP = 10;
let bossColorAdd = 0;
let didChange = false;
let gameStart = false;
let gameWin = false;
let noUse = false;
let element = document.getElementById("image1");

function itsClicked(event) {
    let response = event.target.getAttribute("data-color");
    console.log(response);
    event.target.style.backgroundColor = response;
    gameStart = true;
    didChange = false;
}

var Character = {
    x: 250, //position
    y: 400,
    r: 10, //radius
    color: [255, 40, 40],
    speed: 3,
    update: function () { //draw function
        fill(this.color);
        circle(this.x, this.y, this.r);
    },
    controls: function () { //movement controls
        if (keyIsDown(UP_ARROW)) {
            Character.y -= Character.speed;
        }
        if (keyIsDown(DOWN_ARROW)) {
            Character.y += Character.speed;
        }
        if (keyIsDown(LEFT_ARROW)) {
            Character.x -= Character.speed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            Character.x += Character.speed;
        }
        return false; // prevent default
    }
}

var rectangles = [ //bullets
    { x: 999, y: 0, w: 75, h: 45, speed: 2 },
    { x: 999, y: 100, w: 75, h: 45, speed: 2 },
    { x: 999, y: 50, w: 75, h: 45, speed: 2 },
    { x: 999, y: 200, w: 75, h: 45, speed: 2 },
    { x: 999, y: 300, w: 75, h: 45, speed: 2 }
]

var rectanglesD = [ // diagonal bullets
    { x: 999, y: 100, w: 30, h: 30, speed: 4},
    { x: 999, y: 10, w: 30, h: 30, speed: 3}
]

var boss = [ // boss objects
    { x: 999, y: -100, w: 100, h: 50, speed: 4}, //base
    { x: 999, y: -100, w: 40, h: 70, speed: 4}, //cannon
    { x: 999, y: -100, w: 40, h: 70, speed: 4} //cannon
]

var bossP = [
    { x: 999, y: 999, w: 60, h: 60, speed: 8},
]

var projectiles = [ // diagonal bullets
    { x: 999, y: 0, w: 6, h: 15, speed: 10}
]

function collideRect(circleX, circleY, rectX, rectY, rectW, rectH) { //rectangle collision from previous assignment
    var colliding = false;
    if(circleX > rectX && circleX < rectX + rectW) {
        if(circleY > rectY && circleY < rectY + rectH) {
            return true;
        }
   }
   return false;
}


function spawn1() { //create bullets from array
    for(var i = 0; i < rectangles.length; i++) { //movement for bullets
        fill(0, 68, 255);
        let currentR = rectangles[i];
        rect(currentR.x, currentR.y, currentR.w, currentR.h);
        currentR.y += currentR.speed;
        if(currentR.y > 600) { //screen loop
            currentR.y = -100;
            currentR.x = Math.random() * 425;
        }
        if (collideRect(Character.x, Character.y, currentR.x, currentR.y, currentR.w, currentR.h) == true && didChange == false) {
            Character.color = [0, 0, 0];
            didChange = true;
            gameStart = false;
        }
    
    }
    
}


function spawn2() {
    for(var i = 0; i < rectanglesD.length; i++) { //movement for diagonal bullets
        fill(0, 220, 255);
        let currentRD = rectanglesD[i];
        rect(currentRD.x,currentRD.y, currentRD.w, currentRD.h);
        currentRD.y += 3;
        currentRD.x += currentRD.speed;
        if (currentRD.x > 500 || currentRD.x < 0) {
            currentRD.speed *= -1;
        }
        if (currentRD.y > 600) { //screen loop
            currentRD.y = -100;
            currentRD.x = Math.random() * 500;
        }
        if (collideRect(Character.x, Character.y, currentRD.x, currentRD.y, currentRD.w, currentRD.h) == true && didChange == false) {
            Character.color = [0, 0, 0];
            didChange = true;
            gameStart = false;
        }
    }
}

function spawn3() {    
    if (bossTimer > 180) {
        bossReady = true;       
    }
    bossTimer++;                                                 //Check this one fix movement!!!!!!!!!!!!!!!!!!!!!!! 
    for(var i = 0; i < boss.length; i++) { //movement for bullets
        let currentB = boss[i];
        
        

        if (bossReady == true) {
            fill(0, 168 + bossColorAdd, 155 + bossColorAdd);

            rect(currentB.x, currentB.y, currentB.w, currentB.h);
            currentB.x += currentB.speed;

            if(boss[1].x > 300 || boss[1].x < 50) { //screen loop
                boss[1].speed *= -1;
            }
            if(boss[0].x > 340 || boss[0].x < 90) { //screen loop
                boss[0].speed *= -1;
            }
            if(boss[2].x > 440 || boss[2].x < 190) { //screen loop
                boss[2].speed *= -1;
            }
            
            if (collideRect(Character.x, Character.y, currentB.x, currentB.y, currentB.w, currentB.h) == true && didChange == false) {
                Character.color = [0, 0, 0];
                didChange = true;
                gameStart = false;
            }
    
        }
        else { //Setup location for Boss
            boss[1].x = 110;
            boss[0].x = 150;
            boss[2].x = 250;
            fill(0, 168, 200);
            rect(currentB.x, currentB.y, currentB.w, currentB.h);
            currentB.y += 1;
        }
        
    }
    
}

function projectiles1() { //Projectiles
    if (proTimer == 20) { //projectile cooldown --- holding space will cause the projectile to rapid fire a short distance
        proTimer = 0;
        noUse = false;
        console.log("OK USE");
    }
    else {
        proTimer++;
    }
    for(var i = 0; i < projectiles.length; i++) { 
        fill(246, 246, 75);
        let currentP = projectiles[i];
        rect(currentP.x,currentP.y, currentP.w, currentP.h);        
        currentP.y -= currentP.speed;

        if (keyIsDown(32) && noUse == false) { //had to include projectile controls here to account for rest of function
            currentP.x = Character.x - 3;
            currentP.y = Character.y - 5;
            noUse = true;
        }
        for (var i = 0; i < rectangles.length; i++) {
            if (collideRect(currentP.x, currentP.y, rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h) == true) {  //collision for spawn1()
                console.log("hit");
                currentP.x = 999; //put off screen
                rectangles[i].x = 999;
            }
        }
        for (var i = 0; i < rectanglesD.length; i++) {
            if (collideRect(currentP.x, currentP.y, rectanglesD[i].x, rectanglesD[i].y, rectanglesD[i].w, rectanglesD[i].h) == true) {  //collision for spawn2()
                console.log("hit");
                currentP.x = 999; //put off screen
                rectanglesD[i].x = 999;
            }
        }
        for (var i = 0; i < rectanglesD.length; i++) {
            if (collideRect(currentP.x, currentP.y, boss[i].x, boss[i].y, boss[i].w, boss[i].h) == true) {  //collision for spawn2()
                console.log("hit");
                currentP.x = 999; //put off screen
                if (bossHP > 0) {
                    console.log(bossHP);
                    bossColorAdd += 5; //edits bosses color
                    bossHP--;
                }
                else {
                    console.log("YOU WIN");
                    gameWin = true;
                    gameStart = false;
                }
            }
        }
    }
}


function projectiles2() { //Projectiles
    for(var i = 0; i < bossP.length; i++) { 
        fill(255, 200, 50);
        let currentBP = bossP[i];
        rect(currentBP.x,currentBP.y, currentBP.w, currentBP.h);        
        currentBP.y += currentBP.speed;

        
        if (bossTimer > 181) { 
            currentBP.x = boss[0].x + 20;
            currentBP.y = boss[0].y;
            console.log("fire!");
            bossTimer = 0;
        }

        for (var i = 0; i < bossP.length; i++) {
            if (collideRect(Character.x, Character.y, bossP[i].x, bossP[i].y, bossP[i].w, bossP[i].h) == true) {
                Character.color = [0, 0, 0];
                didChange = true;
                gameStart = false;
            }
        }
        
    }
}





function setup() {
    createCanvas(500, 600);
}

function draw() {
    background(188, 255, 159);
    if (gameStart == true) {
        
        Character.controls();
        Character.update(); //uses data from object
        spawn1();
        if (time > 1000 && time < 2150) { //edit to have projectile finish before deleting!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            spawn2();
        }
        if (time > 2000) {
            spawn3();
            projectiles2();
        }
        projectiles1();
    }
    else if (gameStart == false && didChange == true) { //signals getting hit!!!
        textSize(64);
        fill(255, 0, 0);
        text('Game Over', 75, 200);
    }
    else if (gameWin == true) { //signals getting hit!!!
        textSize(64);
        fill(255, 0, 255);
        text('YOU WIN!!!', 75, 200);
    }
    else {
        textSize(50);
        fill(0, 0, 0);
        text('Controls', 150, 150);
        textSize(30);
        text('Move:  Arrow Keys', 80, 200);
        text('Shoot:  Space Bar', 80, 250);
        text('Rapid Shot:  Hold Space Bar', 80, 300);
    }
    time++; //Advance Time
}