let showCodeBlock = true;
function runPage1() {
  background(255);
  // image(bg, 0, 0);
  stroke(0);
  fill(0);

  push();

  pop();

  push();
  stroke(0, 100);
  for (let i = 20; i < 591; i++) {
    point(i, 480);
    i += 2;
  }
  for (let i = 480; i < 970; i++) {
    point(300, i);
    i += 2;
  }
  pop();

  F0 = $("#fSpinner").spinner("value");
w = $("#omegaSpinner").spinner("value");
k1 = $("#k1Spinner").spinner("value");
m1 = $("#m1Spinner").spinner("value");
k2 = $("#k2Spinner").spinner("value");
m2 = $("#m2Spinner").spinner("value");

  spring1.initialise(F0, w, k1, m1, k2, m2);
  spring1.update(t, factor);
  spring1.show(0, 1, 0);

  position_graph1.update(spring1.y1);
  position_graph1.draw(255, 0, 0);

  position_graph2.update(spring1.y2);
  position_graph2.draw(255, 0, 0);

  strokeWeight(0);

 
document.getElementById("wd").textContent=spring1.w2.toFixed(4);
document.getElementById("wn").textContent=spring1.w1.toFixed(4);
document.getElementById("ww1").textContent=(spring1.w / spring1.w1).toFixed(4)
document.getElementById("wn1").textContent=(spring1.w / spring1.w2).toFixed(4)
document.getElementById("x1").textContent= abs(spring1.x2).toFixed(4);
document.getElementById("x2").textContent= abs(spring1.x1).toFixed(4);
document.getElementById("xst").textContent= (spring1.F0 / spring1.k1).toFixed(4),
document.getElementById("x1st").textContent= abs(spring1.x2 / (spring1.F0 / spring1.k1)).toFixed(4),
document.getElementById("x2st").textContent= abs(spring1.x1 / (spring1.F0 / spring1.k1)).toFixed(4),
strokeWeight(0.5);


  line(
    spring1.masscoordinates[0],
    spring1.masscoordinates[1],
    position_graph1.graphend[0],
    position_graph1.graphend[1]
  );
  line(
    spring1.masscoordinates[2],
    spring1.masscoordinates[3],
    position_graph2.graphend[0],
    position_graph2.graphend[1]
  );
 
  t = t + dt;
}

