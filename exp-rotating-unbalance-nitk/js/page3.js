function runPage3() {
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

  
  phaseAng.draw();

 
  k = $("#stiffnessSpinner").spinner("value");
  m = $("#massSpinner").spinner("value");
  z = $("#dampingSpinner").spinner("value");
  y = $("#magnitudeSpinner").spinner("value");
  w = $("#frequencySpinner").spinner("value");

}
