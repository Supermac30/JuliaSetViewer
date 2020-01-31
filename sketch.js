var iteration = 40;
var expo = 2;
var drawn = false;
var startR = 0; // start value in the reals
var startI = -3; // start value in the imaginaries
var endR = 6; // end value in the reals
var endI = 3; // end value in the imaginaries
var uppR; // units per pixel in the reals
var uppI; // units per pixel in the imaginaries
function setup() {
    createCanvas(500, 500);
    uppR = width/(endR-startR);
	uppI = height/(endI-startI);
    console.log("A and D for iteration");
    console.log("Left and Right for inc");
}

function draw() {
    inp();
    if (!drawn) {
        drawn = true;
        for (let i = 0; i <= width; i++) {
            for (let j = 0; j <= height; j++) {
                stroke(255*(test(i, j)/iteration));
                point(i, j);
            }
        }
    }
}

function inp() {
    if (keyIsDown(65)) {
        iteration -= 10;
        drawn = false;
        console.log("iteration: " + iteration);
    }
    if (keyIsDown(68)) {
        iteration += 10;
        drawn = false;
        console.log("iteration: " + iteration);
    }
    if (keyIsDown(32)) {
        k -= 0.001;
        drawn = false;
        console.log("expo: " + expo);
    }
}
var error = 0.02; // max amount you can be off by
var k = 10;
var solutions = new Set();
/*
function test(a, b) {
    var at0 = math.complex((a/uppR)+startR, (b/uppI)+startI);
    var at1;
    for (let i = 0; i < iteration; i++) {
        at1 = at0.clone();
        at0 = math.divide(math.pow(math.add(math.log(k, at0), 1), at0), k);
        if (math.abs(modulus(at0) - 1.734404334) < error) {
            solutions.add(math.round(modulus(at0), 5));
            return i;
        }
    }
    return iteration;
}
*/

k=3;
error= 0.1; // max amount you can be off by
function test(a, b) {
    var at0 = math.complex((a/uppR)+startR, (b/uppI)+startI);
    var at1;
    for (let i = 0; i < iteration; i++) {
        at1 = at0.clone();
        at0 = math.cos(at0);
        if (math.abs(modulus(at0)-modulus(at1)) <= error) {
          return i;
        }
    }
    return iteration;
}

function modulus(comp) {
    return math.abs(math.sqrt(comp.im*comp.im+comp.re*comp.re))
}
/*
function test(a, b) {
    var at = math.complex(0, 0);
    var c = math.complex((a/uppR)+startR, (b/uppI)+startI);
    for (let i = 0; i < iteration; i++) {
        at = math.add(math.pow(at, expo), c);
        if (math.sqrt(at.im*at.im+at.re*at.re) >= 2) {
            return i;
        }
    }
    return iteration;
}
*/