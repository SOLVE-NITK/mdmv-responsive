function clearMe() {
    magFac.graphs = [];
    phaseAng.graphs = [];
    magFac.initialise();
    phaseAng.initialise();
}

function runPage2() {
    background(255);


    stroke(0);
    fill(0);



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

   

    magFac.draw();
    phaseAng.draw();


    k = $("#stiffnessSpinner").spinner("value");
    m = $("#massSpinner").spinner("value");
    z = $("#dampingSpinner").spinner("value");
    y = $("#magnitudeSpinner").spinner("value");
    w = $("#frequencySpinner").spinner("value");
    // position_graph.update(spring1.y);
//   position_graph.draw(0, 0, 255);
  document.querySelector("#mass").textContent =
  spring1.wn.toFixed(4) + " rad/s"; //Displaying values
document.querySelector("#k").textContent = (w / spring1.wn).toFixed(4);
document.querySelector("#c").textContent = z.toFixed(4);
}
