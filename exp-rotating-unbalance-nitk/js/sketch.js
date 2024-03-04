// canvas
let width = 800;
let height = 600;


// counter
let t = 0.05;
let dt = 0.01;

// system
let spring1;

// graphs
let position_graph;
let force_graph;
let magFac;
let phaseAng;

// inputs
let slider_force;
let slider_ang_freq;
// let k;
// let m;
// let z;

// factor
let factor = 5000;

// images
let img;
let button1;
let button2;
let spr;

// pages
let page1 = true;
let page2 = false;
// let page3 = false;
let graphStep = 0;
// animation
let animation = true;
let touch = false;

// Buttons
let clear;

let clear1 = document.getElementById("cleargraph");

function preload() {
    // play = loadImage("images/blueplaydull.png")
    // pause = loadImage("images/bluepausedull.png")
    // graph = loadImage("images/graphbutton.png")
    // back = loadImage("images/bluebkdulls.png")
    // bg = loadImage("images/frame_copper_ver02.png")
    spr = loadImage("images/spring.png")
}

function setup() {
    // textFont("Comic Sans MS");
    
    var sketchCanvas =createCanvas(600, 500);
    sketchCanvas.parent("canvas-container");
    spring1 = new System(170, 230, 180, 50);

    position_graph = new Graph(345, 300, 100, 220, "Displacement", "t");

    magFac = new DynamicGraph(125, 325, 230, 290, "Magnification Factor", "n", 0, 2.5, 0, 7.5, System.mag_func);
    phaseAng = new DynamicGraph(125, 495, 150, 290, "Phase Angle", "n", 0, 2.5, 0, 180, System.phase_func);

    // k = new NumberInput(620, 150, "Stiffness(N/m)", 8000, 999000, 8000, 0.5, true);
    // m = new NumberInput(620, 200, "Mass(kg)", 32, 200, 166, 0.5, true);
    // z = new NumberInput(620, 253, "Damping Ratio", 0.00, 1.00, 0.07, 0.01, true);
    // slider_force = new NumberInput(620, 300, "Unbalanced\nMass(kg-m)", 1, 10, 10, 0.5, false);
    // slider_ang_freq = new NumberInput(620, 350, "Rotating Speed\n(rad/s)", 1, 800, 6, 0.5, false);

    // button1 = new Button(645, 460, pause)
    // button2 = new Button(711, 460, graph);
    // button3 = new Button(645, 460, back);
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
    // if (page3) {
    //     runPage3();
    //   }

}

// function mousePressed() {
//     // console.log(mouseX, mouseY)
//     handleEvents();
// }
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
    // document.querySelector(".graph-two").classList.remove("display-hide");
    document.querySelector(".graph-div span").textContent = "Prev";
    document.querySelector(".graph-button").style.display = "none";
    // screenchangePhase();
    phaseAngleGraph();
    magnitudeGraph();
  }
  
  function screenchangePhase() {
    document.getElementById("cleargraph").style.visibility = "visible";
  
    phaseAngleGraph();
  }
  
  function screenchangeMag() {
    magnitudeGraph();
    graphStep += 1;
    document.getElementById("cleargraph").style.visibility = "visible";
    // document.querySelector(".graph-two").classList.add("display-hide");
    document.querySelector(".graph-div span").textContent = "Prev";
  }

  function screenChangePrevious() {
    // graphStep -= 1;
    // if (graphStep > 0) {
    //   phaseAngleGraph();
    //   document.querySelector(".graph-two").classList.remove("display-hide");
    //   document.querySelector(".graph-div span").textContent = "Prev/Next";
    //   document.getElementById("cleargraph").style.visibility = "visible";
    // } else {
      document.querySelector(".graph-div span").textContent = "";
      document.querySelector(".graph-button").style.display = "flex";
      document.querySelector(".graph-one").classList.add("display-hide");
      // document.querySelector(".graph-two").classList.add("display-hide");
      page1 = true;
      page2 = false;
      // page3 = false;
      document.getElementById("cleargraph").style.visibility = "hidden";
  
      document.querySelector(".graph-zero").classList.remove("display-hide");
      document.querySelector(".graph-button span").textContent = "Graph";
      //  document.querySelector(".graph-button").classList.remove("display-hide");
      document.querySelector(".graph-div").classList.add("display-hide");
    // }
  }
  function phaseAngleGraph() {
    resetGraphs();
    page1 = false;
    page2 = true;
    // page3 = false;
    document.getElementById("cleargraph").style.visibility = "visible";
    magFac.initialise();
    phaseAng.initialise();
  }
  
  function magnitudeGraph() {
    resetGraphs();
    page1 = false;
    page2 = true;
    // page3 = true;
  
    magFac.initialise();
    phaseAng.initialise();
  }