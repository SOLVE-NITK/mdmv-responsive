function clearMe() {
    magFac.graphs = [];
    phaseAng.graphs = [];
    magFac.initialise();
    phaseAng.initialise();
}

function runPage2() {
    background(255);
    // image(bg, 0, 0);

    stroke(0);
    fill(0);

    // push();
    // // textSize(36);
    // // textFont("Times");
    // // text('ROTATING UNBALANCE', 255, 50);

    // // textSize(16);
    // // text("CONTROLS", 655, 417);
    // // text("VARIABLES", 655, 107);
    // pop();

    push();
    stroke(0, 100);
    for (let i = 20; i < 591; i++) {
        point(i, 505);
        i += 4;
    }
    for (let i = 510; i < 570; i++) {
        point(300, i);
        i += 4;
    }
    pop();

    // textSize(12);
    // text('ωn = ' + spring1.wn.toFixed(4) + " rad/s", 310, 520);
    // text('η = ' + (slider_ang_freq.inp / spring1.wn).toFixed(4), 310, 535);
    // text('ζ = ' + z.inp.toFixed(4), 310, 550);

    magFac.draw();
    phaseAng.draw();

    // button3.draw()
    k = $("#stiffnessSpinner").spinner("value");
    m = $("#massSpinner").spinner("value");
    z = $("#dampingSpinner").spinner("value");
    y = $("#magnitudeSpinner").spinner("value");
    w = $("#frequencySpinner").spinner("value");
    // k.draw();
    // m.draw();
    // z.draw();
    // slider_ang_freq.draw();
    // slider_force.draw();

    // clear.mousePressed(clearMe);
}
