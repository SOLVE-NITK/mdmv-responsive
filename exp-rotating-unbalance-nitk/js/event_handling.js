function handleEvents() {
  // console.log(mouseX, mouseY)
  if (button1.in(mouseX, mouseY) && page1) {
    if (animation) {
      noLoop();
      button1.icon = play;
      button1.draw();
      animation = false;
      touch = true;
    } else {
      loop();
      button1.icon = pause;
      button1.draw();
      animation = true;
      touch = false;
    }
  }
  if (button2.in(mouseX, mouseY) && page1) {
    clearGraphs();
    page1 = false;
    page2 = true;

    magFac.initialise();
    phaseAng.initialise();

    clear = createButton("Clear Graphs");
    clear.position(400, 150);
  }
  if (button3.in(mouseX, mouseY) && page2) {
    clearGraphs();
    page1 = true;
    page2 = false;

    clear.remove();
  }
}
