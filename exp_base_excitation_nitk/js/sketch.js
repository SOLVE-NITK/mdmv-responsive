// canvas
let width = 800;
let height = 600;

// counter
let t = 0.05;
let dt = 0.005;

// system
let spring1;

// graphs
let position_graph;
let force_graph;
let magFac;
let phaseAng;
let relative;

// factor
let factor = 1;

// images
let img;
let button1;
let button2;
let button3;
let button4;
let spr;

// pages
let page1 = true;
let page2 = false;
let page3 = false;
let graphStep = 0;
// animation
let animation = true;
let touch = false;

// button
let clear;

let clear1 = document.getElementById("cleargraph");

function preload() {
  spr = loadImage("images/spring.png");
}

function setup() {
  //   textFont("Comic Sans MS");

  var sketchCanvas = createCanvas(600, 450);
  sketchCanvas.parent("canvas-container");

  spring1 = new System(170, 130, 180, 50);

  y1_graph = new Graph(345, 150, 80, 220, "Output x", "t");
  y2_graph = new Graph(345, 330, 80, 220, "Input Ysin(wt)", "t");

  magFac = new DynamicGraph(
    125,
    350,
    230,
    290,
    "Transmissibility",
    "n",
    0,
    2.5,
    0,
    7.5,
    System.mag_func
  );
  phaseAng = new DynamicGraph(
    125,
    350,
    150,
    290,
    "Phase Angle",
    "n",
    0,
    2.5,
    0,
    180,
    System.phase_func
  );

  varinit();
  k = $("#stiffnessSpinner").spinner("value");
  m = $("#massSpinner").spinner("value");
  z = $("#dampingSpinner").spinner("value");
  y = $("#magnitudeSpinner").spinner("value");
  w = $("#frequencySpinner").spinner("value");
}

function draw() {
  if (page1) {
    runPage1();
  }

  if (page2) {
    runPage2();
  }

  if (page3) {
    runPage3();
  }
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  var imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );

  if (animation) {
    noLoop();
    animation = false;
    document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
    document.querySelector(".playPause").textContent = "Play";
  } else {
    loop();
    animation = true;
    document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
    document.querySelector(".playPause").textContent = "Pause";
  }
}

function graphPlot() {
  graphStep = 1;
  document.querySelector(".graph-one").classList.remove("display-hide");
  document.querySelector(".graph-two").classList.remove("display-hide");
  document.querySelector(".graph-div span").textContent = "Prev/Next";
  document.querySelector(".graph-button").style.display = "none";
  screenchangePhase();
}

function screenchangePhase() {
  document.getElementById("cleargraph").style.visibility = "visible";

  phaseAngleGraph();
}

function screenchangeMag() {
  magnitudeGraph();
  graphStep += 1;
  document.getElementById("cleargraph").style.visibility = "visible";
  document.querySelector(".graph-two").classList.add("display-hide");
  document.querySelector(".graph-div span").textContent = "Prev";
}

function screenChangePrevious() {
  graphStep -= 1;
  if (graphStep > 0) {
    phaseAngleGraph();
    document.querySelector(".graph-two").classList.remove("display-hide");
    document.querySelector(".graph-div span").textContent = "Prev/Next";
    document.getElementById("cleargraph").style.visibility = "visible";
  } else {
    document.querySelector(".graph-div span").textContent = "";
    document.querySelector(".graph-button").style.display = "flex";
    document.querySelector(".graph-one").classList.add("display-hide");
    document.querySelector(".graph-two").classList.add("display-hide");
    page1 = true;
    page2 = false;
    page3 = false;
    document.getElementById("cleargraph").style.visibility = "hidden";

    document.querySelector(".graph-zero").classList.remove("display-hide");
    document.querySelector(".graph-button span").textContent = "Graph";
    //  document.querySelector(".graph-button").classList.remove("display-hide");
    document.querySelector(".graph-div").classList.add("display-hide");
  }
}
function phaseAngleGraph() {
  resetGraphs();
  clearMe();
  page1 = false;
  page2 = true;
  page3 = false;

  magFac.initialise();
  phaseAng.initialise();
}

function magnitudeGraph() {
  resetGraphs();
  clearMe();
  page1 = false;
  page2 = false;
  page3 = true;

  magFac.initialise();
  phaseAng.initialise();
}
