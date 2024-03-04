let simstatus = 1;
var time = 0;
var inc = 0.01;
var f = 850;
var ω = 4.35;
var k1 = 2500;
var m1 = 250;
var k2 = 500;
var m2 = 50;
var x1;
var x2;
var ω1;
var ω2;
var r5;
var xst;
var r8;
var r10;
var v1 = 0;
var v2 = 0;

// canvas variables
// graphics
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// graph1
const graphCanvas1 = document.querySelector("#graphscreen1");
const graphctx1 = graphCanvas1.getContext("2d");

//  graph2
const graphCanvas2 = document.querySelector("#graphscreen2");
const graphctx2 = graphCanvas2.getContext("2d");

// fix scaling of canavs as per media
let mediaQuery1 = window.matchMedia("screen and (max-width: 540px)");
let mediaQuery2 = window.matchMedia("screen and (max-width: 704px)");
let mediaQuery3 = window.matchMedia("screen and (max-width: 820px)");
let mediaQuery4 = window.matchMedia("screen and (max-width: 944px)");
let scaleX = 0.5;
let scaleY = 0.5;

//start of simulation here; starts the timer with increments of 0.01 seconds
function startsim() {
  pauseTime = setInterval("varupdate();", "100");
  simstatus = 1;
}
// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  let imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename === "bluepausedull") {
    document.getElementById("playpausebutton").src =
      "./images/blueplaydull.svg";

    clearInterval(simTimeId);
    simstatus = 1;
    pauseTime = setInterval("varupdate();", "100");
    document.querySelector(".playPause").textContent = "Play";
  }
  if (imgfilename === "blueplaydull") {
    document.getElementById("playpausebutton").src =
      "./images/bluepausedull.svg";
    simstatus = 0;
    clearInterval(pauseTime);
    time = 0;
    simTimeId = setInterval("varupdate();time+=.01;", 10);
    document.querySelector(".playPause").textContent = "Pause";
  }
}

//Initialise system parameters here
function varinit() {
  varchange();
  //Variable slider and number input types
  $("#var1Slider").slider("value", 850); // slider initialisation : jQuery widget
  $("#var1Spinner").spinner("value", 850); // number initialisation : jQuery widget
  $("#var2Slider").slider("value", 5);
  $("#var2Spinner").spinner("value", 5);
  $("#k1Slider").slider("value", 2500);
  $("#k1Spinner").spinner("value", 2500);
  $("#m1Slider").slider("value", 250);
  $("#m1Spinner").spinner("value", 250);
  $("#k2Slider").slider("value", 500);
  $("#k2Spinner").spinner("value", 500);
  $("#m2Slider").slider("value", 50);
  $("#m2Spinner").spinner("value", 50);
}
function varchange() {
  $("#var1Slider").slider({ max: 1000, min: 500, step: 50 });
  $("#var1Spinner").spinner({ max: 1000, min: 500, step: 50 });

  $("#var1Slider").on("slide", function (e, ui) {
    $("#var1Spinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#var1Spinner").on("spin", function (e, ui) {
    $("#var1Slider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#var1Spinner").on("change", function () {
    varchange();
  });

  $("#var2Slider").slider({ max: 16, min: 0, step: 0.01 });
  $("#var2Spinner").spinner({ max: 16, min: 0, step: 0.01 });

  $("#var2Slider").on("slide", function (e, ui) {
    $("#var2Spinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#var2Spinner").on("spin", function (e, ui) {
    $("#var2Slider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#var2Spinner").on("change", function () {
    varchange();
  });

  $("#k1Slider").slider({ max: 5000, min: 2000, step: 50 });
  $("#k1Spinner").spinner({ max: 5000, min: 2000, step: 50 });

  $("#k1Slider").on("slide", function (e, ui) {
    $("#k1Spinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#k1Spinner").on("spin", function (e, ui) {
    $("#k1Slider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#k1Spinner").on("change", function () {
    varchange();
  });

  $("#m1Slider").slider({ max: 500, min: 200, step: 10 });
  $("#m1Spinner").spinner({ max: 500, min: 200, step: 10 });

  $("#m1Slider").on("slide", function (e, ui) {
    $("#m1Spinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#m1Spinner").on("spin", function (e, ui) {
    $("#m1Slider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#m1Spinner").on("change", function () {
    varchange();
  });

  $("#k2Slider").slider({ max: 1000, min: 200, step: 50 });
  $("#k2Spinner").spinner({ max: 1000, min: 200, step: 50 });

  $("#k2Slider").on("slide", function (e, ui) {
    $("#k2Spinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#k2Spinner").on("spin", function (e, ui) {
    $("#k2Slider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#k2Spinner").on("change", function () {
    varchange();
  });

  $("#m2Slider").slider({ max: 100, min: 10, step: 1 });
  $("#m2Spinner").spinner({ max: 100, min: 10, step: 1 });

  $("#m2Slider").on("slide", function (e, ui) {
    $("#m2Spinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#m2Spinner").on("spin", function (e, ui) {
    $("#m2Slider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#m2Spinner").on("change", function () {
    varchange();
  });
}
function varupdate() {
  $("#var1Spinner").spinner("value", $("#var1Slider").slider("value")); //updating slider location with change in spinner(debug)
  $("#var2Spinner").spinner("value", $("#var2Slider").slider("value"));
  $("#k1Spinner").spinner("value", $("#k1Slider").slider("value"));
  $("#m1Spinner").spinner("value", $("#m1Slider").slider("value"));
  $("#k2Spinner").spinner("value", $("#k2Slider").slider("value"));
  $("#m2Spinner").spinner("value", $("#m2Slider").slider("value"));
  f = $("#var1Spinner").spinner("value");
  ω = $("#var2Spinner").spinner("value");
  k1 = $("#k1Spinner").spinner("value");
  m1 = $("#m1Spinner").spinner("value");
  k2 = $("#k2Spinner").spinner("value");
  m2 = $("#m2Spinner").spinner("value");

  var num1 = (k2 - (m2 * (ω ** 2))) * f;
  var num2 = k2 * f;
  var term1 = m1 * m2 * (ω ** 4);
  var term2 = ((m1 * k2) + m2 * (k1 + k2)) * (ω ** 2);
  var term3 = k1 * k2;
  var term5 = (k1*k2)/(m1*m2);
  var term6 = ((k1*m2) + (k2*m2) + (m1*k2))/(m1*m2)
  var term4 = (term6 ** 2);
  var det = Math.sqrt(term4-(4*term5));
  var deno = term1 - term2 + term3

  x1 = Math.abs(num1/deno);
  x2 = Math.abs(num2/deno);
  ω1 = Math.sqrt((term6+det)/2);
  ω2 = Math.sqrt((term6-det)/2);
  r5 = ω/ω2;
  xst = f/k1;
  r8 = x1/xst;
  r10 = x2/xst;
  v1 = (x1 * Math.sin(ω*time)) * 20;
  v2 = (x2 * Math.sin(ω*time)) * 20;

  document.querySelector("#r1").innerHTML = m1.toFixed();
  document.querySelector("#r2").innerHTML = k1.toFixed();
  document.querySelector("#r3").innerHTML = ω1.toFixed(4) + " rad/s";
  document.querySelector("#r4").innerHTML = ω2.toFixed(4) + " rad/s";
  document.querySelector("#r5").innerHTML = r5.toFixed(4) + " rad/s";
  document.querySelector("#r6").innerHTML = x1.toFixed(4);
  document.querySelector("#r7").innerHTML = xst.toFixed(4);
  document.querySelector("#r8").innerHTML = r8.toFixed(4);
  document.querySelector("#r9").innerHTML = x2.toFixed(4);
  document.querySelector("#r10").innerHTML = r10.toFixed(4);

  //If simulation is running
  if (!simstatus) {
    //Disabling the slider,spinner and drop down menu
    $("#var1Spinner").spinner("disable");
    $("#var1Slider").slider("disable");
    $("#var2Spinner").spinner("disable");
    $("#var2Slider").slider("disable");
    $("#k1Spinner").spinner("disable");
    $("#k1Slider").slider("disable");
    $("#m1Spinner").spinner("disable");
    $("#m1Slider").slider("disable");
    $("#k2Spinner").spinner("disable");
    $("#k2Slider").slider("disable");
    $("#m2Spinner").spinner("disable");
    $("#m2Slider").slider("disable");
  }
  //If simulation is stopped
  if (simstatus) {
    //Enabling the slider,spinner and drop down menu
    $("#var1Spinner").spinner("enable");
    $("#var1Slider").slider("enable");
    $("#var2Spinner").spinner("enable");
    $("#var2Slider").slider("enable");
    $("#k1Spinner").spinner("enable");
    $("#k1Slider").slider("enable");
    $("#m1Spinner").spinner("enable");
    $("#m1Slider").slider("enable");
    $("#k2Spinner").spinner("enable");
    $("#k2Slider").slider("enable");
    $("#m2Spinner").spinner("enable");
    $("#m2Slider").slider("enable");
  }
  // draw();
}

const setMediaQueries = function (ctx) {
  let originalX = 20;
  if (mediaQuery1.matches) {
    scaleX = 1.5;
    // originalX = 20;
    originalX = canvas.width / 4 - 10;
    scaleY = 0.6;
  } else if (mediaQuery2.matches) {
    scaleX = 1;
    // originalX = canvas.width / 4 - 10;
    scaleY = 0.6;
  } else if (mediaQuery3.matches) {
    scaleX = 1;
    originalX = canvas.width / 4 - 10;
    scaleY = 0.4;
  } else if (mediaQuery4.matches) {
    scaleX = 1;
    originalX = canvas.width / 4 - 10;
    scaleY = 0.4;
  } else {
    // originalX = canvas.width / 4 - 20;
    scaleX = 0.3;
    scaleY = 0.5;
  }
  ctx.canvas.width = document.documentElement.clientWidth * scaleX;
  ctx.canvas.height = document.documentElement.clientHeight * scaleY;
  return originalX;
};

const springImage = new Image();
springImage.src = 'images/spring.png';

const draw = function () {
  let originalX = setMediaQueries(ctx);
  ctx.canvas.width = document.documentElement.clientWidth * scaleX;
  ctx.canvas.height = document.documentElement.clientHeight * scaleY;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#804000';
  ctx.fillRect(150, 90+v2, 90, 35);
  ctx.rect(150, 90+v2, 90, 35);
  ctx.lineWidth = "1.5";
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.font = '16px "Nunito", sans-serif'; // You can adjust the font size and type
  ctx.fillText('m2', 183, 110+v2);

  ctx.drawImage(springImage, 180, 125+v2, 30, 70-v2+v1);
  ctx.fillStyle = 'black';
  ctx.font = 'bold 18px "Nunito", sans-serif'; // You can adjust the font size and type
  ctx.fillText('k2', 153, 167+v2);
  
  ctx.fillStyle = '#804000';
  ctx.fillRect(150, 195+v1, 90, 35);
  ctx.lineWidth = "1.5";
  ctx.strokeStyle = "black";
  ctx.rect(150, 195+v1, 90, 35);
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.font = '16px "Nunito", sans-serif'; // You can adjust the font size and type
  ctx.fillText('m1', 183, 217+v1);

  ctx.drawImage(springImage, 180, 230+v1, 30, 70-v1);
  ctx.fillStyle = 'black';
  ctx.font = 'bold 18px "Nunito", sans-serif'; // You can adjust the font size and type
  ctx.fillText('k1', 153, 270+v1);

   // Draw base line
   ctx.fillStyle = 'black';
   ctx.fillRect(100, 300, 190, 5);

   // Update time for the next frame
   time += inc;

  requestAnimationFrame(draw);
  generateGraph();
};
draw();
function generateGraph() {
  // Graph 1
  let graph1X = setMediaQueries(graphctx1);
  graphctx1.canvas.width = document.documentElement.clientWidth * scaleX;
  graphctx1.canvas.height = document.documentElement.clientHeight * scaleY;
  graphctx1.clearRect(0, 0, graphCanvas1.width, graphCanvas1.height);
  graphctx1.font = "2rem 'Nunito', sans-serif";
  graphctx1.save();
  graphctx1.translate(0, 225);
  graphctx1.rotate(-Math.PI / 2);
  graphctx1.fillText("X1/Xst", 0, 20);
  graphctx1.restore();
  graphctx1.fillText("ω/ω2", 170, 320);
  graphctx1.beginPath();

  graphctx1.moveTo(25, 50);
  graphctx1.lineTo(25, 300);
  graphctx1.moveTo(25, 300);
  graphctx1.lineTo(400, 300);
  graphctx1.strokeStyle = "black";
  graphctx1.stroke();
  graphctx1.closePath();

  graphctx1.beginPath();
  graphctx1.moveTo(25, 300);
  graphctx1.strokeStyle = "red";
  graphctx1.lineWidth = 1;
  
  for (let i = 0; i < 4; i += 0.012) {
    mu = m1/m2;
    temp1 = i;
    temp2 = (ω2*i/ω1) ** 2;
    den = ((1+mu)*temp2) + (temp1 ** 2);
    var solution = (1-(temp1**2))/(((temp1**2)*temp2) -den +1);
    if (Math.abs(solution) < 300) {
      solution = Math.abs(solution);
    }else{
      solution = 300
    }
    const dataPoint1 = solution;
    graphctx1.lineTo(i * 85 + 25, 300 - (60 * dataPoint1) / 20);
  }

  graphctx1.stroke();

  // Graph 2
  let graph2X = setMediaQueries(graphctx2);
  graphctx2.canvas.width = document.documentElement.clientWidth * scaleX;
  graphctx2.canvas.height = document.documentElement.clientHeight * scaleY;
  graphctx2.clearRect(0, 0, graphCanvas2.width, graphCanvas2.height);
  graphctx2.font = "2rem 'Nunito', sans-serif";
  graphctx2.save();
  graphctx2.translate(0, 225);
  graphctx2.rotate(-Math.PI / 2);
  graphctx2.fillText("X2/Xst", 0, 20);
  graphctx2.restore();
  graphctx2.fillText("ω/ω2", 170, 320);
  graphctx2.beginPath();

  graphctx2.moveTo(25, 50);
  graphctx2.lineTo(25, 300);
  graphctx2.moveTo(25, 300);
  graphctx2.lineTo(400, 300);
  graphctx2.strokeStyle = "black";
  graphctx2.stroke();
  graphctx2.closePath();

  graphctx2.beginPath();
  graphctx2.moveTo(25, 300);
  graphctx2.strokeStyle = "red";
  graphctx2.lineWidth = 1;
  
  for (let j = 0; j < 4; j += 0.01) {
    mu = m1/m2;
    temp1 = j;
    temp2 = (ω2*j/ω1) ** 2;
    den = ((1+mu)*temp2) + (temp1 ** 2);
    var solution = (1)/(((temp1**2)*temp2) -den +1);
    if (Math.abs(solution) < 300) {
      solution = Math.abs(solution);
    }else{
      solution = 300
    }
    const dataPoint1 = solution;
    graphctx2.lineTo(j * 85 + 25, 300 - (60 * dataPoint1) / 20);
  }

  graphctx2.stroke();
}

function plotgraph() {
  const graphDiv = document.querySelectorAll(".graph-div");
  // console.log(graphDiv);
  graphDiv.forEach((graph) => {
    graph.classList.toggle("display-hide");
  });
  document.getElementById("p6").classList.toggle("display-hide");
  document.getElementById("p8").classList.toggle("display-hide");
  document.getElementById("p9").classList.toggle("display-hide");
  document.getElementById("p10").classList.toggle("display-hide");
  generateGraph();
  graphDiv[0].scrollIntoView({
    behavior: "smooth",
  });
}

window.addEventListener("load", varinit);