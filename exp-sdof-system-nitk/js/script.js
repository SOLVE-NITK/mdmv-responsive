var time = 0; //Keeps track of the animation time
var k = 165; //Stiffness value of the system
var mass = 32; //Mass of the system
var dampingratio = 0.07; //damping ration
var forceamp = 10; //Amplitude of external force
var forcefreq = 6; //Frequency of external force
var wn = Math.sqrt((k * 1000) / mass); //Natural Frequency of the system
var n = forcefreq / wn; //ratio of operating frequency to the natural frequency
var phi = Math.atan((2 * dampingratio * n) / (1 - n * n)); //Mass of the system
var simTimeId; //for animation function
var pauseTime; //Updating variables when animation is paused
var simstatus = 1; //Playing or pausing
var x = 0; //For graph
var xval; //For Graph
var start; //Timing for animation
var end; //Timing for animation
var diff; //Timing for animation
var xg = 0; //For graph
var color; //Color for graph
var graphid; //Graph animation
var clearGraphClicked = false;
//Function to calculate the displacement
function displacement(t) {
  let value =
    ((1000 * (forceamp / (k * 1000))) /
      Math.sqrt(Math.pow(1 - n * n, 2) + Math.pow(2 * dampingratio * n, 2))) *
    Math.sin(forcefreq * t + phi);
  return value;
}
startgraph = new Date().getTime();

//Animating Graph
function graphanimate() {
  graphid = requestAnimationFrame(graphanimate);
  plotgraph();
}

//start of simulation here; starts the timer with increments of 0.01 seconds
function startsim() {
  let canvas1 = document.getElementById("simscreen");
  let canvas2 = document.getElementById("graphscreen");
  let canvas3 = document.getElementById("storegraph");
  canvas2.style.visibility = "hidden";
  canvas1.style.visibility = "visible";
  canvas3.style.visibility = "hidden";
  document.getElementById("clearGraph").style.visibility = "hidden";
  document.getElementById("playpausebutton").src = "./images/blueplaydull.svg";
  document.getElementById("titleincanvas").style.visibility = "visible";
  pauseTime = setInterval("varupdate();", "100");
  simstatus = 0;
  simstate();
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

    cancelAnimationFrame(simTimeId);
    simstatus = 1;
    pauseTime = setInterval("varupdate();", "100");
    document.querySelector(".playPause").textContent = "Play";
  }
  if (imgfilename === "blueplaydull") {
    document.getElementById("playpausebutton").src =
      "./images/bluepausedull.svg";
    document.querySelector(".playPause").textContent = "Pause";
    simstatus = 0;

    clearInterval(pauseTime);
    time = 0;
    x = 0;

    start = new Date().getTime();
    function animate() {
      simTimeId = requestAnimationFrame(animate);
      end = new Date().getTime();
      diff = 0.001 * (end - start);
      start = end;
      time += diff;
      varupdate();
    }
    animate();
  }
}
//Initialise system parameters here
function varinit() {
  varchange();
  //Variable slider and number input types
  $("#stiffslider").slider("value", 8); // slider initialisation : jQuery widget
  $("#stiffspinner").spinner("value", 8); // number initialisation : jQuery widget
  $("#massslider").slider("value", 166);
  $("#massspinner").spinner("value", 166);
  $("#dampslider").slider("value", 0.01);
  $("#dampspinner").spinner("value", 0.01);
  $("#forcespinner").spinner("value", 10);
  $("#frequencyspinner").spinner("value", 6);
}
function varchange() {
  $("#forcespinner").spinner({ max: 10, min: 1, step: 0.1 });
  $("#forcespinner").on("change", function () {
    varchange();
  });
  $("#frequencyspinner").spinner({ max: 800, min: 0, step: 0.1 });
  $("#frequencyspinner").on("change", function () {
    varchange();
  });

  $("#stiffslider").slider({ max: 999, min: 8, step: 0.5 });
  $("#stiffspinner").spinner({ max: 999, min: 8, step: 0.5 });

  $("#stiffslider").on("slide", function (e, ui) {
    $("#stiffspinner").spinner("value", ui.value);
  });
  $("#stiffspinner").on("spin", function (e, ui) {
    $("#stiffslider").slider("value", ui.value);
  });
  $("#stiffspinner").on("change", function () {
    varchange();
  });

  $("#massslider").slider({ max: 200, min: 2, step: 0.5 });
  $("#massspinner").spinner({ max: 200, min: 2, step: 0.5 });

  $("#massslider").on("slide", function (e, ui) {
    $("#massspinner").spinner("value", ui.value);
  });
  $("#massspinnerr").on("spin", function (e, ui) {
    $("#massslider").slider("value", ui.value);
  });
  $("#massspinner").on("change", function () {
    varchange();
  });

  $("#dampslider").slider({ max: 1, min: 0.01, step: 0.01 });
  $("#dampspinner").spinner({ max: 1, min: 0.01, step: 0.01 });

  $("#dampslider").on("slide", function (e, ui) {
    $("#dampspinner").spinner("value", ui.value);
    x = 0;
  });
  $("#dampspinner").on("spin", function (e, ui) {
    $("#dampslider").slider("value", ui.value);
    x = 0;
  });
  $("#dampspinner").on("change", function () {
    varchange();
  });

  varupdate();
}

function varupdate() {
  $("#stiffslider").slider("value", $("#stiffspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#massslider").slider("value", $("#massspinner").spinner("value"));
  $("#dampslider").slider("value", $("#dampspinner").spinner("value"));
  mass = $("#massspinner").spinner("value");
  k = $("#stiffspinner").spinner("value");
  dampingratio = $("#dampspinner").spinner("value");
  wn = Math.sqrt((k * 1000) / mass);
  n = forcefreq / wn;
  phi = Math.atan((2 * dampingratio * n) / Math.pow(1 - n * n, 2));
  forceamp = $("#forcespinner").spinner("value");
  forcefreq = $("#frequencyspinner").spinner("value");
  document.getElementById("omega").innerHTML = wn.toFixed(4);
  document.getElementById("eta").innerHTML = n.toFixed(4);
  document.getElementById("zeta").innerHTML = dampingratio;
  if (n >= 0.8 && n <= 1.2) {
    document.getElementById("commentboxleft").innerHTML =
      "Beware System close to resonance!";
  } else {
    document.getElementById("commentboxleft").innerHTML = "";
  }
  //If simulation is running
  if (!simstatus) {
    //Disabling the slider,spinner and drop down menu
    $("#massspinner").spinner("disable");
    $("#massslider").slider("disable");
    $("#stiffspinner").spinner("disable");
    $("#stiffslider").slider("disable");
    $("#dampspinner").spinner("disable");
    $("#dampslider").slider("disable");
    $("#forcespinner").spinner("disable");
    $("#frequencyspinner").spinner("disable");
  }
  //If simulation is stopped
  if (simstatus) {
    $("#massspinner").spinner("enable");
    $("#massslider").slider("enable");
    $("#stiffspinner").spinner("enable");
    $("#stiffslider").slider("enable");
    $("#dampspinner").spinner("enable");
    $("#dampslider").slider("enable");
    $("#forcespinner").spinner("enable");
    $("#frequencyspinner").spinner("enable");
  }
  draw();
}
function draw() {
  let canvas = document.getElementById("simscreen");
  let ctx = canvas.getContext("2d");
  let spring = {
    initsprx: [
      90, 90, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 90, 90,
    ],
    initspry: [
      360, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200,
      170,
    ],
    sprx: [
      90, 90, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 90, 90,
    ],
    spry: [
      360, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200,
      170,
    ],
    draw: function () {
      ctx.beginPath();
      ctx.strokeStyle = "#c13e3e";
      ctx.lineWidth = 4;
      for (let i = 0; i < spring.initsprx.length - 1; i++) {
        ctx.moveTo(spring.sprx[i], spring.spry[i]);
        ctx.lineTo(spring.sprx[i + 1], spring.spry[i + 1]);
      }
      ctx.stroke();
      ctx.lineWidth = 0.5;
      ctx.fillStyle = "#003366";
      for (let i = 0; i < spring.initsprx.length; i++) {
        ctx.beginPath();
        ctx.arc(spring.sprx[i], spring.spry[i], 5, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    },
  };
  spring.spry[15] = spring.initspry[15] + displacement(time);
  for (let i = 1; i <= 14; i++) {
    spring.spry[i] = spring.initspry[i] + ((i - 1) / 13) * displacement(time);
  }

  ctx.clearRect(0, 0, 550, 400);
  spring.draw();
  ctx.fillStyle = "#663300";
  ctx.fillRect(
    60,
    spring.spry[15] - (20 + (mass - 2) / 5),
    180,
    20 + (mass - 2) / 5
  );
  ctx.fillStyle = "#000000";
  ctx.fillRect(30, 360, 240, 10);
  ctx.beginPath();
  ctx.strokeStyle = "#670090";
  ctx.lineWidth = 4;
  ctx.moveTo(210, 360);
  ctx.lineTo(210, 330);
  ctx.lineTo(190, 330);
  ctx.lineTo(230, 330);
  ctx.lineTo(230, 225);
  ctx.moveTo(192, 330);
  ctx.lineTo(192, 225);
  ctx.stroke();
  ctx.fillStyle = "#bae8fe";
  ctx.fillRect(194, 225, 34, 103);
  ctx.beginPath();
  ctx.strokeStyle = "#670090";
  ctx.moveTo(210, spring.spry[15]);
  ctx.lineTo(210, spring.spry[15] + 100);
  ctx.lineTo(200, spring.spry[15] + 100);
  ctx.lineTo(220, spring.spry[15] + 100);
  ctx.stroke();
  //Drawing Simulation Graph
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
  ctx.moveTo(320, 20);
  ctx.lineTo(320, 170);
  ctx.moveTo(320, 95);
  ctx.lineTo(540, 95);
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.font = "18px Nunito";
  ctx.fillText("t", 540, 95);
  ctx.save();
  ctx.translate(320, 95);
  ctx.rotate(-Math.PI / 2);
  ctx.font = "18px Nunito";
  ctx.fillText("Applied Force", -50, -10);
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(320, 95);
  ctx.strokeStyle = "red";
  if (!simstatus) {
    let i = 0;
    while (i < x) {
      ctx.lineTo(320 + i, 95 - 5 * forceamp * Math.sin(forcefreq * i * 0.01));
      ctx.stroke();
      i += 0.7;
    }
    x >= 220 ? (x = 0) : (x += 100 * diff);
    xval = x;
  }
  if (simstatus) {
    let i = 0;
    while (i < xval) {
      ctx.lineTo(320 + i, 95 - 5 * forceamp * Math.sin(forcefreq * i * 0.01));
      ctx.stroke();
      i += 0.7;
    }
  }
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
  ctx.moveTo(320, 200);
  ctx.lineTo(320, 400);
  ctx.moveTo(320, 300);
  ctx.lineTo(540, 300);
  ctx.fillStyle = "black";
  ctx.font = "18px Nunito";
  ctx.fillText("t", 540, 300);
  ctx.save();
  ctx.translate(320, 275);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Displacement", -90, -10);
  ctx.restore();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(320, 300);
  ctx.moveTo(320, 300 - 1.5 * displacement(0));
  ctx.strokeStyle = "blue";
  if (!simstatus) {
    let i = 0;
    while (i < x) {
      ctx.lineTo(320 + i, 300 - 1.5 * displacement(0.01 * i));
      ctx.stroke();
      i += 0.7;
    }
  }
  if (simstatus) {
    let i = 0;
    while (i < xval) {
      ctx.lineTo(320 + i, 300 - 1.5 * displacement(0.01 * i));
      ctx.stroke();
      i += 0.7;
    }
  }
}

function plotgraph() {
  let canvas = document.getElementById("graphscreen");
  let ctx = canvas.getContext("2d");
  let ctxgraph = document.getElementById("storegraph").getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.arc(350, 100, 3, 0, 2 * Math.PI, false);
  ctx.fillText("\u2192 Operating value of \u03B7", 365, 105);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.moveTo(100, 0);
  ctx.lineTo(100, 230);
  ctx.lineTo(390, 230);
  ctx.font = "10px Nunito";
  for (let i = 1; i < 8; i++) {
    ctx.fillText(i, 90, 230 - i * 30);
  }
  ctx.moveTo(100, 200);
  ctx.lineTo(390, 200);
  ctx.stroke();
  ctx.font = "18px Nunito";
  ctx.fillText("\u03B7", 390, 230);
  ctx.save();
  ctx.translate(200, 200);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Magnification Factor", 0, -130);
  ctx.restore();
  ctxgraph.beginPath();
  ctxgraph.strokeStyle = color;
  ctxgraph.lineWidth = 0.5;
  ctxgraph.moveTo(100, 230);
  ctxgraph.moveTo(100, 200);
  let i = 0;
  while (i < xg && xg < 290) {
    ctxgraph.lineTo(100 + i, 230 - magnifac(0.01 * i));
    ctxgraph.stroke();
    i += 0.8;
  }
  ctxgraph.beginPath();
  ctxgraph.strokeStyle = "#000000";
  ctxgraph.lineWidth = 1;
  if (!clearGraphClicked) {
    if (xg > 290) {
      let ny = 230 - magnifac(n);
      if (ny <= 0) ny = 5;
      ctxgraph.arc(100 + 100 * n, ny, 3, 0, 2 * Math.PI, false);
      ctxgraph.stroke();
    }
  }
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
  ctx.moveTo(100, 250);
  ctx.lineTo(100, 400);
  ctx.lineTo(390, 400);
  ctx.moveTo(100, 250);
  ctx.lineTo(390, 250);
  ctx.moveTo(100, 325);
  ctx.lineTo(390, 325);
  ctx.stroke();
  ctx.save();
  ctx.translate(200, 200);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Phase Angle(\u03A6)", -190, -130);
  ctx.restore();
  ctx.fillText("\u03B7", 390, 390);
  ctx.font = "15px Nunito";
  ctx.fillText("0\u00B0", 80, 400);
  ctx.fillText("90\u00B0", 80, 325);
  ctx.fillText("180\u00B0", 80, 250);
  ctx.beginPath();
  ctxgraph.moveTo(100, 400);
  ctxgraph.strokeStyle = color;
  ctxgraph.lineWidth = 0.5;
  let j = 0;
  while (j < xg && xg < 290) {
    ctxgraph.lineTo(100 + j, 400 - phaseangle(0.01 * j));
    ctxgraph.stroke();
    j += 0.8;
  }
  xg += 1;
  ctxgraph.beginPath();
  ctxgraph.strokeStyle = "#000000";
  ctxgraph.lineWidth = 1;
  if (!clearGraphClicked) {
    if (xg < 100 + n) {
      let ny2 = 400 - phaseangle(n);
      ctxgraph.arc(100 + 100 * n, ny2, 3, 0, 2 * Math.PI, false);
      ctxgraph.stroke();
    }
  }
}

function magnifac(v) {
  let value =
    1 / Math.sqrt(Math.pow(1 - v * v, 2) + Math.pow(2 * dampingratio * v, 2));
  return 30 * value;
}
function phaseangle(v) {
  if (v < 1) {
    return (
      (75 / (Math.PI / 2)) * Math.atan((2 * dampingratio * v) / (1 - v * v))
    );
  }
  if (v > 1) {
    return (
      150 +
      (75 / (Math.PI / 2)) * Math.atan((2 * dampingratio * v) / (1 - v * v))
    );
  }
  if (v == 1) {
    return 75;
  }
}

function changescreen() {
  let canvas1 = document.getElementById("simscreen");
  let ctx1 = canvas1.getContext("2d");
  let canvas2 = document.getElementById("graphscreen");
  let ctx2 = canvas2.getContext("2d");
  let canvas3 = document.getElementById("storegraph");
  let imgfilename = document.getElementById("graphbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename === "graphbutton") {
    clearGraphClicked = false;
    document.getElementById("graphbutton").src = "./images/bluebkdulls.svg";
    document.getElementById("graphbutton").style.display = "block";
    document.getElementById("playpausebutton").disabled = true;

    document.querySelector("#graphbutton + span").textContent = "Back";

    canvas2.style.visibility = "visible";
    canvas1.style.visibility = "hidden";
    canvas3.style.visibility = "visible";
    cancelAnimationFrame(simTimeId);
    clearInterval(pauseTime);
    xg = 0;
    color =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    document.getElementById("clearGraph").style.visibility = "visible";
    document.getElementById("titleincanvas").style.visibility = "hidden";
    document
      .getElementById("playpausebutton")
      .classList.toggle("graphDisabled");
    // document.getElementById("playpausebutton").style.display = "none";
    // document.querySelector(".playPause").style.display="none";
    requestAnimationFrame(graphanimate);

    // document.getElementById("playpausebutton").style.visibility = "hidden";

    $("#massspinner").spinner("disable");
    $("#massslider").slider("disable");
    $("#stiffspinner").spinner("disable");
    $("#stiffslider").slider("disable");
    $("#dampspinner").spinner("disable");
    $("#dampslider").slider("disable");
    $("#forcespinner").spinner("disable");
    $("#frequencyspinner").spinner("disable");
  } else {
    // If the condition is true, you can set the text back to "Graph" (optional)
    document.querySelector("#graphbutton + span").textContent = "Graph";
  }
  if (imgfilename === "bluebkdulls") {
    document.getElementById("graphbutton").src = "./images/graphbutton.svg";
    cancelAnimationFrame(graphid);

    document
      .getElementById("playpausebutton")
      .classList.toggle("graphDisabled");
    // document.getElementById('playpausebutton').disabled="false";
    // document.querySelector(".playPause").style.display = "block";
    // document.getElementById("playpausebutton").style.visibility = "visible";

    document.getElementById("clearGraph").style.visibility = "hidden";
    document.getElementById("playpausebutton").style.display = "block";
    document.querySelector(".playPause").style.display = "block";
    startsim();
  }
}
function cleargraph() {
  clearGraphClicked = true;
  let ctx = document.getElementById("storegraph").getContext("2d");
  ctx.clearRect(0, 0, 550, 440);
}

// Get all input elements
const inputs = document.querySelectorAll('input[type="number"]');

// Add event listener to each input element
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    // Remove non-numeric characters
    this.value = this.value.replace(/[^0-9.]/g, "");
  });
});
