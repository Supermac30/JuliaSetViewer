var iteration = 30;
var expo = 2;
var drawn = false;
var startR = 0; // start value in the reals
var startI = -3; // start value in the imaginaries
var endR = 6; // end value in the reals
var endI = 3; // end value in the imaginaries
var error = 0.1;
var uppR; // units per pixel in the reals
var uppI; // units per pixel in the imaginaries
var equation = "math.divide(math.pow(math.add(math.log(10, z), 1), z), 10)"; // equation that is run
function setup() {
    createCanvas(500, 500);
    uppR = width/(endR-startR);
	uppI = height/(endI-startI);
    console.log("A and D for iteration");
    console.log("Left and Right for inc");
}

function draw() {
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

/*
var error = 0.02; // max amount you can be off by
var k = 10;
var solutions = new Set();

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

function test(a, b) {
    var at0 = math.complex((a/uppR)+startR, (b/uppI)+startI);
    var at1;
    for (let i = 0; i < iteration; i++) {
        at1 = at0.clone();
		z = at0.clone();
        at0 = eval(equation);
        if (math.abs(modulus(at0)-modulus(at1)) <= error) {
          return i;
        }
    }
    return iteration;
}

function modulus(comp) {
    return math.abs(math.sqrt(comp.im*comp.im+comp.re*comp.re))
}

function editSite() {
    var attribs = document.getElementById("attribs");
	equation = attribs.elements[0].value;
    iterations = parseInt(attribs.elements[1].value);
    error = parseFloat(attribs.elements[2].value)
    startR = parseFloat(attribs.elements[3].value);
    endR = parseFloat(attribs.elements[4].value);
    startI = parseFloat(attribs.elements[5].value);
    endI = parseFloat(attribs.elements[6].value);
    uppR = width/(endR-startR);
	uppI = width/(endI-startI);
    drawn = false;
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