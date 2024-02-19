// // Experiment parameters
// const beamInfo = [
//   {
//     ISMB: 100,
//     h: "100 mm",
//     b: "75mm",
//     t1: "4mm",
//     t2: "7mm",
//     Ixx: "257.5 cm<sup>4</sup>",
//     Iyy: "40.8 cm<sup>4</sup>",
//     Area: "14.6 cm<sup>2</sup>",
//     A: 14.6e-4,
//     I: 257.5e-8,
//     path: "images/crossI.PNG",
//   },
//   {
//     ISNT: 150,
//     h: "150 mm",
//     b: "150mm",
//     t1: "10mm",
//     t2: "10 mm",
//     Ixx: "541.1 cm<sup>4</sup>",
//     Iyy: "250.3 cm<sup>4</sup>",
//     Area: "28.8 cm<sup>2</sup>",
//     A: 28.8e-4,
//     I: 541.1e-8,
//     path: "images/crossT.PNG",
//   },
//   {
//     ISMC: 100,
//     h: "100 mm",
//     b: "50mm",
//     t1: "4.7mm",
//     t2: "7.5 mm",
//     Ixx: "186.7 cm<sup>4</sup>",
//     Iyy: "25.9 cm<sup>4</sup>",
//     Area: "11.7 cm<sup>2</sup>",
//     A: 11.7e-4,
//     I: 186.7e-8,
//     path: "images/crossC.PNG",
//   },
//   {
//     ISA: 100100,
//     h: "100 mm",
//     b: "100mm",
//     t: "12mm",
//     Ixx: "207 cm<sup>4</sup>",
//     Iyy: "207 cm<sup>4</sup>",
//     Area: "22.59 cm<sup>2</sup>",
//     A: 22.59e-4,
//     I: 207e-8,
//     path: "images/crossL.PNG",
//   },
//   {
//     SQUARE: "",
//     h: "150 mm",
//     b: "150mm",
//     Ixx: "4218.75 cm<sup>4</sup>",
//     Iyy: "4218.75 cm<sup>4</sup>",
//     Area: "225 cm<sup>2</sup>",
//     A: 225e-4,
//     I: 4218.75e-8,
//     path: "images/crossSqr.PNG",
//   },
//   {
//     CIRCLE: "",
//     D: "150 mm",
//     Ixx: "2485.05  cm<sup>4</sup>",
//     Iyy: "2485.05  cm<sup>4</sup>",
//     Area: "176.72 cm<sup>2</sup>",
//     A: 176.72e-4,
//     I: 2485.05e-8,
//     path: "images/crossCirc.PNG",
//   },
//   {
//     A: 0.01,
//     I: 0.01,
//   },
// ];

// // material Info
// const matInfo = [
//   {
//     E: 200e9,
//     rho: 7750,
//   },
//   {
//     E: 70.33e9,
//     rho: 2712,
//   },
//   {
//     E: 111.006e9,
//     rho: 8304,
//   },
// ];

// // simulation variables
// // let time = 0; //keeps track of the time of the animation
// let beamlength = 1500; //Length of the beam inmm
// let simTimeId; //for animation function
// let pauseTime; //for running animation when simulation is paused
// let rho = 7750; //Density in kg/m^3
// let A = 14.6e-4; //Area in m^2
// let massbeam = (rho * A * beamlength) / 1000; //Mass of the beam=volume * density
// let E = 200e9; //Young's Modulus
// let I = 4.08e-7; //Ixx value
// let dampingratio = 0;
// let endmass = 5;
// // let m = (33 / 140) * massbeam + endmass;
// // let k = (3 * E * I) / Math.pow(beamlength / 1000, 3); //Stiffness value for a cantilever beam
// let wn = Math.sqrt(k / m); //Natural Frequency
// console.log(wn);
// let wd = wn * Math.sqrt(1 - dampingratio * dampingratio); //Damped natural frequency
// let initdisp = 500; //Initial displacement given to the beam
// // let simstatus;

// //my code
// var simstatus = 1; // 1 for paused, 0 for playing
// var time = 0;
// var inc = 0.0001;
// var m = 100; // Unbalanced Mass
// var w = 6; //Rotating Speed
// var k = 8000; // Stiffness
// var e = 0.07; //Damping Ratio
// var M = 166; // Mass
// var X;
// var phi;
// var disp = 0;
// var mag_func = 0;
// var phase_func = 0;
// var ωn;
// var c;
// var η;
// // var mag_factor = 1.5;
// const r = 21; // radius
// var angle = 0;
// var displacementData = [];
// //mycode end
// // canvas variables
// // graphics
// const canvas = document.querySelector("#canvas");
// const ctx = canvas.getContext("2d");

// // graph1
// const graphCanvas1 = document.querySelector("#graphscreen1");
// const graphctx1 = graphCanvas1.getContext("2d");

// //  graph2
// const graphCanvas2 = document.querySelector("#graphscreen2");
// const graphctx2 = graphCanvas2.getContext("2d");

// // fix scaling of canavs as per media
// let mediaQuery1 = window.matchMedia("screen and (max-width: 540px)");
// let mediaQuery2 = window.matchMedia("screen and (max-width: 704px)");
// let mediaQuery3 = window.matchMedia("screen and (max-width: 820px)");
// let mediaQuery4 = window.matchMedia("screen and (max-width: 912px)");
// let scaleX = 0.5;
// let scaleY = 0.5;

// // dom elements
// const sectionImg = document.querySelector(".cross-img img");
// const sectionTooltip = document.querySelector(".sec-tooltip");
// const cirTooltip = document.querySelector(".cir-tooltip");
// const materials = document.querySelector("#materials");
// const sections = document.querySelector("#sections");
// const otherSec = document.querySelector(".other-sec");

// //Function to calculate the displacement
// const actdisplace = function (t) {
//   let value =
//     Math.exp(-dampingratio * wn * t) *
//     (initdisp * Math.cos(wd * t) +
//       (dampingratio * wn * initdisp * Math.sin(wd * t)) / wd);
//   return value;
// };

// //start of simulation here; starts the timer with increments of 0.01 seconds
// function startsim() {
//   pauseTime = setInterval("varupdate();", "100");
//   simstatus = 1;
// }
// // switches state of simulation between 0:Playing & 1:Paused
// function simstate() {
//   let imgfilename = document.getElementById("playpausebutton").src;
//   imgfilename = imgfilename.substring(
//     imgfilename.lastIndexOf("/") + 1,
//     imgfilename.lastIndexOf(".")
//   );
//   if (imgfilename === "bluepausedull") {
//     document.getElementById("playpausebutton").src =
//       "./images/blueplaydull.svg";

//     clearInterval(simTimeId);
//     simstatus = 1;
//     pauseTime = setInterval("varupdate();", "100");
//     document.querySelector(".playPause").textContent = "Play";
//   }
//   if (imgfilename === "blueplaydull") {
//     document.getElementById("playpausebutton").src =
//       "./images/bluepausedull.svg";
//     simstatus = 0;
//     clearInterval(pauseTime);
//     time = 0;
//     simTimeId = setInterval("varupdate();time+=.01;", 10);
//     document.querySelector(".playPause").textContent = "Pause";
//   }
// }

// //Initialise system parameters here
// function varinit() {
//   varchange();
//   //Variable slider and number input types
//   $("#massSlider").slider("value", 25); // slider initialisation : jQuery widget
//   $("#massSpinner").spinner("value", 25); // number initialisation : jQuery widget
//   $("#stiffnessSlider").slider("value", 8000);
//   $("#stiffnessSpinner").spinner("value", 8000);
//   $("#dampSlider").slider("value", 0.07);
//   $("#dampSpinner").spinner("value", 0.07);
//   $("#unbalancedMass").spinner("value", 100);
//   $("#rotatingSpeed").spinner("value", 6);
// }
// function varchange() {
//   $("#massSlider").slider({ max: 200, min: 0, step: 0.5 });
//   $("#massSpinner").spinner({ max: 200, min: 0, step: 0.5 });

//   $("#massSlider").on("slide", function (e, ui) {
//     $("#massSpinner").spinner("value", ui.value);
//     time = 0;
//     varupdate();
//   });
//   $("#massSpinner").on("spin", function (e, ui) {
//     $("#massSlider").slider("value", ui.value);
//     time = 0;
//     varupdate();
//   });
//   $("#massSpinner").on("change", function () {
//     varchange();
//   });
  
//   $("#stiffnessSlider").slider({ max: 999000, min: 8000, step: 0.5 });
//   $("#stiffnessSpinner").spinner({ max: 999000, min: 8000, step: 0.5 });

//   $("#stiffnessSlider").on("slide", function (e, ui) {
//     $("#stiffnessSpinner").spinner("value", ui.value);
//     time = 0;
//     varupdate();
//   });
//   $("#stiffnessSpinner").on("spin", function (e, ui) {
//     $("#stiffnessSlider").slider("value", ui.value);
//     time = 0;
//     varupdate();
//   });
//   $("#stiffnessSpinner").on("change", function () {
//     varchange();
//   });
//   $("#stiffnessSpinner").on("touch-start", function () {
//     varchange();
//   });

//   $("#dampSlider").slider({ max: 1, min: 0, step: 0.01 });
//   $("#dampSpinner").spinner({ max: 1, min: 0, step: 0.01 });

//   $("#dampSlider").on("slide", function (e, ui) {
//     $("#dampSpinner").spinner("value", ui.value);
//     time = 0;
//     varupdate();
//   });
//   $("#dampSpinner").on("spin", function (e, ui) {
//     $("#dampSlider").slider("value", ui.value);
//     time = 0;
//     varupdate();
//   });
//   $("#dampSpinner").on("change", function () {
//     varchange();
//   });
//   $("#unbalancedMass").spinner({ max: 100, min: 1, step: 0.5 });

//   $("#unbalancedMass").on("change", function () {
//     varchange();
//   });
//   $("#rotatingSpeed").spinner({ max: 800, min: 1, step: 0.5 });
 
//   $("#rotatingSpeed").on("change", function () {
//     varchange();
//   });
// }
// function varupdate() {
//   // $("#massSpinner").spinner("value", $("#massSlider").slider("value")); //updating slider location with change in spinner(debug)
//   // $("#lengthSpinner").spinner("value", $("#lengthSlider").slider("value"));
//   // $("#stiffnessSpinner").spinner("value", $("#stiffnessSlider").slider("value"));
//   // $("#dampSpinner").spinner("value", $("#dampSlider").slider("value"));
//   // endmass = $("#massSpinner").spinner("value"); //Updating variables
//   // stiff = $("#stiffnessSpinner").spinner("value");
//   // beamlength = $("#lengthSpinner").spinner("value");
//   // dampingratio = $("#dampSpinner").spinner("value");
//   // massbeam = (rho * A * beamlength) / 1000;
//   // m = (33 / 140) * massbeam + endmass;
//   // k = (3 * E * I) / Math.pow(beamlength / 1000, 3);
//   // wn = Math.sqrt(k / m);
//   // let cc = 2 * Math.sqrt(k * m);
//   // let c = dampingratio * cc;
//   // wd = wn * Math.sqrt(1 - dampingratio * dampingratio);
//   // document.querySelector("#mass").innerHTML = m.toFixed(4) + "kg"; //Displaying values
//   // document.querySelector("#k").innerHTML = (k / 1000).toFixed(4) + "N/mm";
//   // document.querySelector("#c").innerHTML = c.toFixed(4) + "Ns/m";
//   // document.querySelector("#wd").innerHTML = wd.toFixed(4) + "rad/s";
//   // document.querySelector("#wn").innerHTML = wn.toFixed(4) + "rad/s";

//   // cirTooltip.innerHTML = `M = ${m.toFixed(4)} \n kg  c = ${c.toFixed(
//   //   4
//   // )}Ns/m \n k = ${(k / 1000).toFixed(4)}N/mm
//   // `;
//   //If simulation is running
//   // if (!simstatus) {
//   //   //Disabling the slider,spinner and drop down menu
//   //   $("#massSpinner").spinner("disable");
//   //   $("#massSlider").slider("disable");
//   //   $("#lengthSpinner").spinner("disable");
//   //   $("#lengthSlider").slider("disable");
//   //   $("#dampSpinner").spinner("disable");
//   //   $("#dampSlider").slider("disable");
//   //   $("#CsArea").spinner("enable");
//   //   $("#Ivalue").spinner("enable");
//   //   document.getElementById("sections").disabled = true;
//   //   document.getElementById("materials").disabled = true;
//   // }
//   //If simulation is stopped
//   // if (simstatus) {
//   //   //Enabling the slider,spinner and drop down menu
//   //   $("#massSpinner").spinner("enable");
//   //   $("#massSlider").slider("enable");
//   //   $("#lengthSpinner").spinner("enable");
//   //   $("#lengthSlider").slider("enable");
//   //   $("#dampSpinner").spinner("enable");
//   //   $("#dampSlider").slider("enable");
//   //   $("#CsArea").spinner("enable");
//   //   $("#Ivalue").spinner("enable");
//   //   document.getElementById("sections").disabled = false;
//   //   document.getElementById("materials").disabled = false;
//   // }
//   $("#massSpinner").spinner("value", $("#massSlider").slider("value")); //updating slider location with change in spinner(debug)
//   $("#stiffnessSpinner").spinner("value", $("#stiffnessSlider").slider("value"));
//   $("#dampSpinner").spinner("value", $("#dampSlider").slider("value"));
//   M = $("#massSpinner").spinner("value"); //Updating variables
//   k = $("#stiffnessSpinner").spinner("value");
//   e = $("#dampSpinner").spinner("value");
//   m = $("#unbalancedMass").spinner("value");
//   w = $("#rotatingSpeed").spinner("value");
   
//    // Calculate system parameters
//    var c = e * 2 * Math.sqrt(k * M);
//    ωn = Math.sqrt(k / M);
//    η = w / ωn;
//    var term1 = m * r * (w ** 2);
//    var term2 = k - M * (w ** 2);
//    var term3 = c * w;
 
//    // Calculate displacement using the harmonic motion equation
//    X = term1 / Math.sqrt((term2**2) + (term3**2));
//    phi = Math.atan(term3/term2);
//    disp = X * Math.sin(w*time + phi);

//   // Ensure displacementData does not exceed a certain number of data points
//   if (displacementData.length > maxDataPoints) {
//     displacementData.shift(); // Remove the oldest data point
//   }

//   document.querySelector("#mass").innerHTML = ωn.toFixed(4) + " rad/s"; //Displaying values
//   document.querySelector("#k").innerHTML = η.toFixed(4);
//   document.querySelector("#c").innerHTML = e.toFixed(4);
//   if (!simstatus) {
//     disp = 0;
//     w = 0;
//   }
//   //If simulation is stopped
//   if (simstatus) {
//     // Push data points to arrays
//    displacementData.push(-disp);
//   }
//   draw();
// }

// const setMediaQueries = function (ctx) {
//   let originalX = 20;
//   if (mediaQuery1.matches) {
//     scaleX = 1.5;
//     // originalX = 20;
//     originalX = canvas.width / 4 - 10;
//     scaleY = 0.6;
//   } else if (mediaQuery2.matches) {
//     scaleX = 1;
//     // originalX = canvas.width / 4 - 10;
//     scaleY = 0.6;
//   } else if (mediaQuery3.matches) {
//     scaleX = 1;
//     originalX = canvas.width / 4 - 10;
//     scaleY = 0.4;
//   } else if (mediaQuery4.matches) {
//     scaleX = 1;
//     originalX = canvas.width / 4 - 10;
//     scaleY = 0.4;
//   } else {
//     // originalX = canvas.width / 4 - 20;
//     scaleX = 0.3;
//     scaleY = 0.5;
//   }
//   ctx.canvas.width = document.documentElement.clientWidth * scaleX;
//   ctx.canvas.height = document.documentElement.clientHeight * scaleY;
//   return originalX;
// };

// const draw = function () {
//   let originalX = setMediaQueries(ctx);
//   ctx.canvas.width = document.documentElement.clientWidth * scaleX;
//   ctx.canvas.height = document.documentElement.clientHeight * scaleY;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
 
//   // Draw spring image with displacement
//   const springX = 50;
//   const springY = 105 + disp; // Adjust the Y position based on displacement
//   ctx.drawImage(springImage, springX, springY, 65, 183 - disp);

//   // Draw base line
//   ctx.fillStyle = 'black';
//   ctx.fillRect(40, 285, 200, 8);

//   ctx.strokeStyle = 'blue';
//   ctx.lineWidth = 3;
//   const damperX = 185;
//   const damperY = 195 + disp; // Adjust the Y position based on displacement
  
//   ctx.beginPath();
//   ctx.moveTo(185, 285);
//   ctx.lineTo(185, 255);
//   ctx.lineTo(200, 255);
//   ctx.moveTo(185, 255);
//   ctx.lineTo(170, 255);
//   ctx.moveTo(170, 255);
//   ctx.lineTo(170, 145);
//   ctx.moveTo(200, 255);
//   ctx.lineTo(200, 145);
//   ctx.stroke();

//   // Draw damper lines with displacement
//   ctx.beginPath();
//   ctx.moveTo(damperX, 100 + disp); // Adjust the Y position based on displacement
//   ctx.lineTo(damperX, damperY);
//   ctx.moveTo(175, damperY);
//   ctx.lineTo(195, damperY);
//   ctx.stroke();

//   // Draw mass with displacement
//   const massX = 130;
//   const massY = 80 + disp; // Adjust the Y position based on displacement
//   ctx.fillStyle = "black";
//   ctx.fillRect(40, 50 + disp, 200, 60); // Adjust the Y position based on displacement
//   ctx.fillStyle = 'white';
//   ctx.beginPath();
//   ctx.arc(massX, massY, 25, 0, 2 * Math.PI);
//   ctx.fill();

//   // Update time for the next frame
//   time += inc;

//   // Calculate the position of the unbalanced mass
//   const mass2X = scaleX + r * Math.cos(w * time) + 130;
//   const mass2Y = scaleY + r * Math.sin(w * time) + 79 + disp;

//   // Draw red dot
//   ctx.fillStyle = 'red';
  
//   ctx.beginPath();
//   ctx.arc(mass2X, mass2Y, 3, 0, 2 * Math.PI);
//   ctx.fill();

//   // Update the angle for the next frame
//   angle += time * w * Math.PI/180;
//   if (angle > 2 *  Math.PI) {
//    angle = 0;
//   }

//   requestAnimationFrame(draw);
//   graph();
//   generateGraph();
// };
// draw();
// function graph() {
//   // Graph 
//   let graphX = setMediaQueries(graphctx);
//   graphctx.canvas.width = document.documentElement.clientWidth * scaleX;
//   graphctx.canvas.height = document.documentElement.clientHeight * scaleY;
//   graphctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
//   graphctx.font = "2rem Comic sans MS";
//   graphctx.save();
//   graphctx.translate(0, 225);
//   graphctx.rotate(-Math.PI / 2);
//   graphctx.fillText("Displacement", 0, 15);
//   graphctx.restore();
//   graphctx.fillText("t", graphCanvas.width - 20, 180);
//   graphctx.beginPath();

//   graphctx.moveTo(20, 50);
//   graphctx.lineTo(20, 280);
//   graphctx.moveTo(20, 175);
//   graphctx.lineTo(graphCanvas.width - 20, 175);
//   graphctx.strokeStyle = "black";
//   graphctx.stroke();
//   graphctx.closePath();
  
//   graphctx.beginPath();
//   graphctx.moveTo(20, 175);
//   let i = 0;
//   graphctx.strokeStyle = "blue";
//   graphctx.lineWidth = 3;

//   // Draw the displacement graph using displacementData
//   for (let i = 0; i < displacementData.length; i++) {
//     const dataPoint = displacementData[i];
//     graphctx.lineTo(i * 5 + 20, 175 - (4 * dataPoint) / 5);
//   }

//   graphctx .stroke();
// }  

// function generateGraph() {
//   // Graph 1
//   let graph1X = setMediaQueries(graphctx1);
//   graphctx1.canvas.width = document.documentElement.clientWidth * scaleX;
//   graphctx1.canvas.height = document.documentElement.clientHeight * scaleY;
//   graphctx1.clearRect(0, 0, graphCanvas1.width, graphCanvas1.height);
//   graphctx1.font = "2rem Comic sans MS";
//   graphctx1.save();
//   graphctx1.translate(0, 225);
//   graphctx1.rotate(-Math.PI / 2);
//   graphctx1.fillText("Magnification Factor", -10, 15);
//   graphctx1.restore();
//   graphctx1.fillText("n", graphCanvas1.width - 20, 250);
//   graphctx1.beginPath();
//   graphctx1.moveTo(20, 10);
//   graphctx1.lineTo(20, 250);
//   graphctx1.moveTo(20, 250);
//   graphctx1.lineTo(graphCanvas1.width - 20, 250);
//   graphctx1.strokeStyle = "black";
//   graphctx1.stroke();
//   graphctx1.closePath();

//   graphctx1.beginPath();
//   graphctx1.moveTo(20, 225);
//   graphctx1.strokeStyle = "green";
//   graphctx1.lineWidth = 2;
  
//   for (let i = 0; i < 4; i += 0.1) {
//     let f = e;
//     if (f == 0) {
//       f = 0.01;
//     }
//     t4 = 1 - i * i;
//     t5 = 2 * f * i;
//     var mag_function = (1 - t4)/Math.sqrt((t4**2) + (t5**2));
//     const dataPoint1 = mag_function;
//     graphctx1.lineTo(i * 85 + 20, 225 - (60.9 * dataPoint1) / 2);
//   }

//   graphctx1.stroke();

//   // Graph 2
//   let graph2X = setMediaQueries(graphctx2);
//   graphctx2.canvas.width = document.documentElement.clientWidth * scaleX;
//   graphctx2.canvas.height = document.documentElement.clientHeight * scaleY;
//   graphctx2.clearRect(0, 0, graphCanvas2.width, graphCanvas2.height);
//   graphctx2.font = "2rem Comic sans MS";
//   graphctx2.save();
//   graphctx2.translate(10, 345);
//   graphctx2.rotate(-Math.PI / 2);
//   graphctx2.fillText("Phase Angle", 120, 5);
//   graphctx2.restore();
//   graphctx2.fillText("n", graphCanvas1.width - 20, 250);
//   graphctx2.beginPath();
//   graphctx2.strokeStyle = "black";
//   graphctx2.moveTo(20, 250);
//   graphctx2.lineTo(20, 13);
//   graphctx2.moveTo(20, 250);
//   graphctx2.lineTo( graphCanvas1.width - 20, 250);
//   graphctx2.stroke();
//   graphctx1.closePath();
//   graphctx2.beginPath();
//   graphctx2.moveTo(20, 250);
//   graphctx2.strokeStyle = "green";
//   graphctx2.lineWidth = 3;
 
//   for (let j = 0; j < 3; j += 0.01) {
//     t6 = 1 - j * j;
//     t7 = 2 * e * j;
   
//     var phase_function = Math.atan(t7/t6);
//     if (phase_function < 0) {
//       phase_function += Math.PI;
//      }
//      phase_function = phase_function * (180/Math.PI);
//     const dataPoint2 = phase_function;
//     graphctx2.lineTo(j * 100 + 20, 250 - (5 * dataPoint2) / 5);
//   }
//   graphctx2.stroke();
// }

// function plotgraph() {
//   const graphDiv = document.querySelectorAll(".graph-div");
//   graphDiv.forEach((graph) => {
//     graph.classList.toggle("display-hide");
//   });
//   generateGraph();
// }

// window.addEventListener("load", varinit);

// const selectSection = function () {
//   otherSec.classList.remove("display-flex");
//   otherSec.classList.add("display-hide");
//   let value = sections.value;
//   if (value != 6) {
//     sectionImg.src = beamInfo[value].path;
//     const infos = Object.entries(beamInfo[value]);
//     sectionTooltip.innerHTML = "";
//     for (const [key, value] of infos.slice(0, -3)) {
//       const text = `${key}:${value}, `;
//       sectionTooltip.insertAdjacentHTML("beforeend", text);
//     }
//     for (const [key, value] of infos) {
//       if (key == "A") {
//         A = value;
//       }
//       if (key == "I") {
//         I = value;
//       }
//     }
//     varupdate();
//   } else {
//     otherSec.classList.add("display-flex");
//     otherSec.classList.remove("display-hide");
//     sectionImg.src = "images/crossOth.PNG";
//     A = 0.01;
//     I = 0.01;
//     sectionTooltip.innerHTML = "";
//     sectionTooltip.innerHTML = `Area = ${A} m<sup>2</sup>, I = ${I} m<sup>4</sup>`;
//     $("#CsArea").spinner({
//       spin: function (event, ui) {
//         A = ui.value;
//         I = $("#Ivalue").spinner("value");
//         sectionTooltip.innerHTML = `Area = ${A} m<sup>2</sup>, I = ${I} m<sup>4</sup>`;
//       },
//     });
//     $("#Ivalue").spinner({
//       spin: function (event, ui) {
//         I = ui.value;
//         A = $("#CsArea").spinner("value");
//         sectionTooltip.innerHTML = `Area = ${A} m<sup>2</sup>, I = ${I} m<sup>4</sup>`;
//       },
//     });
//   }
// };






















var simstatus = 1; // 1 for paused, 0 for playing
var time = 0;
var inc = 0.0001;
var m = 100; // Unbalanced Mass
var w = 6; //Rotating Speed
var k = 8000; // Stiffness
var e = 0.07; //Damping Ratio
var M = 166; // Mass
var X;
var phi;
var disp = 0;
var mag_func = 0;
var phase_func = 0;
var ωn;
var c;
var η;
var simTimeId = setInterval("",'1000');
var pauseTime = setInterval("",'1000');
// var mag_factor = 1.5;
const r = 21; // radius
var angle = 0;
var displacementData = [];

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
  
// graph
const graphCanvas = document.querySelector("#graphCanvas");
const graphctx = graphCanvas.getContext("2d");
  
// graph1
const graphCanvas1 = document.querySelector("#graphscreen1");
const graphctx1 = graphCanvas1.getContext("2d");

//  graph2
const graphCanvas2 = document.querySelector("#graphscreen2");
const graphctx2 = graphCanvas2.getContext("2d");
  

function startsim()
{
simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');
}

function simstate()
{
  var imgfilename=document.getElementById('playpausebutton').src;
  imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
  if (imgfilename=="bluepausedull")
  {
    document.getElementById('playpausebutton').src="images/blueplaydull.svg";
	 clearInterval(simTimeId);
    simstatus=0;
    // clearInterval(simTimeId);
    // $('#theta2spinner').spinner("value",theta2);			//to set simulation parameters on pause
    pauseTime=setInterval("varupdate();",'100');
    document.querySelector(".playPause").textContent = "Play";
  }
    if (imgfilename=="blueplaydull")
  {
  	 time=0;			
  	 clearInterval(pauseTime);
    document.getElementById('playpausebutton').src="images/bluepausedull.svg";
    simTimeId = setInterval("varupdate();time+=.001;", 10);
    // simTimeId=setInterval("time=time+0.1; varupdate(); ",10);    
    simstatus=1;
    document.querySelector(".playPause").textContent = "Pause";
  } 
}


//Initialise system parameters here
function varinit() {
  varchange();
  //Variable slider and number input types
  $("#massSlider").slider("value", 166); // slider initialisation : jQuery widget
  $("#massSpinner").spinner("value", 166); // number initialisation : jQuery widget
  $("#stiffnessSlider").slider("value", 8000);
  $("#stiffnessSpinner").spinner("value", 8000);
  $("#dampSlider").slider("value", 0.07);
  $("#dampSpinner").spinner("value", 0.07);
  $("#unbalancedMass").spinner("value", 100);
  $("#rotatingSpeed").spinner("value", 6);
}
function varchange() {
  $("#massSlider").slider({ max: 200, min: 32, step: 0.5 });
  $("#massSpinner").spinner({ max: 200, min: 32, step: 0.5 });

  $("#massSlider").on("slide", function (e, ui) {
    $("#massSpinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#massSpinner").on("spin", function (e, ui) {
    $("#massSlider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#massSpinner").on("change", function () {
    varchange();
  });

  $("#stiffnessSlider").slider({ max: 999000, min: 8000, step: 0.5 });
  $("#stiffnessSpinner").spinner({ max: 999000, min: 8000, step: 0.5 });

  $("#stiffnessSlider").on("slide", function (e, ui) {
    $("#stiffnessSpinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#stiffnessSpinner").on("spin", function (e, ui) {
    $("#stiffnessSlider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#stiffnessSpinner").on("change", function () {
    varchange();
  });
  $("#stiffnessSpinner").on("touch-start", function () {
    varchange();
  });

  $("#dampSlider").slider({ max: 1, min: 0, step: 0.01 });
  $("#dampSpinner").spinner({ max: 1, min: 0, step: 0.01 });

  $("#dampSlider").on("slide", function (e, ui) {
    $("#dampSpinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#dampSpinner").on("spin", function (e, ui) {
    $("#dampSlider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#dampSpinner").on("change", function () {
    varchange();
  });
  $("#unbalancedMass").spinner({ max: 100, min: 1, step: 0.5 });

  $("#unbalancedMass").on("change", function () {
    varchange();
  });
  $("#rotatingSpeed").spinner({ max: 800, min: 1, step: 0.5 });
 
  $("#rotatingSpeed").on("change", function () {
    varchange();
  });
}

function isPageVisible() {
  return !document.hidden;
}

// Define the maximum number of data points to display on the graph
const maxDataPoints = 45; // Adjust this value as needed

function varupdate() {
  if (!isPageVisible()) {
    // Page is not visible, do not update
    return;
  }

  $("#massSpinner").spinner("value", $("#massSlider").slider("value")); //updating slider location with change in spinner(debug)
  $("#stiffnessSpinner").spinner("value", $("#stiffnessSlider").slider("value"));
  $("#dampSpinner").spinner("value", $("#dampSlider").slider("value"));
  M = $("#massSpinner").spinner("value"); //Updating variables
  k = $("#stiffnessSpinner").spinner("value");
  e = $("#dampSpinner").spinner("value");
  m = $("#unbalancedMass").spinner("value");
  w = $("#rotatingSpeed").spinner("value");
   
   // Calculate system parameters
   var c = e * 2 * Math.sqrt(k * M);
   ωn = Math.sqrt(k / M);
   η = w / ωn;
   var term1 = m * r * (w ** 2);
   var term2 = k - M * (w ** 2);
   var term3 = c * w;
 
   // Calculate displacement using the harmonic motion equation
   X = term1 / Math.sqrt((term2**2) + (term3**2));
   phi = Math.atan(term3/term2);
   disp = X * Math.sin(w*time + phi);

  // Ensure displacementData does not exceed a certain number of data points
  if (displacementData.length > maxDataPoints) {
    displacementData.shift(); // Remove the oldest data point
  }

  document.querySelector("#mass").innerHTML = ωn.toFixed(4) + " rad/s"; //Displaying values
  document.querySelector("#k").innerHTML = η.toFixed(4);
  document.querySelector("#c").innerHTML = e.toFixed(4);

  if (!simstatus) {
    disp = 0;
    w = 0;
    $('#omega2set').show();
   $('#theta2set').hide();
   
   $('#stiffnessSpinner').spinner("enable");
   $('#massSpinner').spinner("enable");
   $('#dampSpinner').spinner("enable");
   $('#unbalancedMass').spinner("enable");
   $('#stiffnessSlider').slider("enable");
   $('#massSlider').slider("enable");
   $('#dampSlider').slider("enable");
   $('#rotatingSpeed').spinner("enable");
  }
  //If simulation is stopped
  if (simstatus) {
    // Push data points to arrays
   displacementData.push(-disp);
  
   $('#omega2set').show();
   $('#theta2set').hide();
   
   $('#stiffnessSpinner').spinner("disable");
   $('#massSpinner').spinner("disable");
   $('#dampSpinner').spinner("disable");
   $('#unbalancedMass').spinner("disable");
   $('#stiffnessSlider').slider("disable");
   $('#massSlider').slider("disable");
   $('#dampSlider').slider("disable");
   $('#rotatingSpeed').spinner("disable");
  }
  draw();
 };

 document.addEventListener("visibilitychange", function () {
  if (isPageVisible()) {
    // Page became visible, start or resume animation
    requestAnimationFrame(draw);
  } else {
    // Page became hidden, stop animation
    cancelAnimationFrame(draw);
  }
});

 // fix scaling of canavs as per media
 let mediaQuery1 = window.matchMedia("screen and (max-width: 540px)");
 let mediaQuery2 = window.matchMedia("screen and (max-width: 704px)");
 let mediaQuery3 = window.matchMedia("screen and (max-width: 820px)");
 let mediaQuery4 = window.matchMedia("screen and (max-width: 972px)");
 let scaleX = 0.5;
 let scaleY = 0.5;

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
  
   // Draw spring image with displacement
   const springX = 50;
   const springY = 105 + disp; // Adjust the Y position based on displacement
   ctx.drawImage(springImage, springX, springY, 65, 183 - disp);
 
   // Draw base line
   ctx.fillStyle = 'black';
   ctx.fillRect(40, 285, 200, 8);

   ctx.strokeStyle = 'blue';
   ctx.lineWidth = 3;
   const damperX = 185;
   const damperY = 195 + disp; // Adjust the Y position based on displacement
   
   ctx.beginPath();
   ctx.moveTo(185, 285);
   ctx.lineTo(185, 255);
   ctx.lineTo(200, 255);
   ctx.moveTo(185, 255);
   ctx.lineTo(170, 255);
   ctx.moveTo(170, 255);
   ctx.lineTo(170, 145);
   ctx.moveTo(200, 255);
   ctx.lineTo(200, 145);
   ctx.stroke();
 
   // Draw damper lines with displacement
   ctx.beginPath();
   ctx.moveTo(damperX, 100 + disp); // Adjust the Y position based on displacement
   ctx.lineTo(damperX, damperY);
   ctx.moveTo(175, damperY);
   ctx.lineTo(195, damperY);
   ctx.stroke();
 
   // Draw mass with displacement
   const massX = 130;
   const massY = 80 + disp; // Adjust the Y position based on displacement
   ctx.fillStyle = "black";
   ctx.fillRect(40, 50 + disp, 200, 60); // Adjust the Y position based on displacement
   ctx.fillStyle = 'white';
   ctx.beginPath();
   ctx.arc(massX, massY, 25, 0, 2 * Math.PI);
   ctx.fill();
 
   // Update time for the next frame
   time += inc;
 
   // Calculate the position of the unbalanced mass
   const mass2X = scaleX + r * Math.cos(w * time) + 130;
   const mass2Y = scaleY + r * Math.sin(w * time) + 79 + disp;

   // Draw red dot
   ctx.fillStyle = 'red';
   
   ctx.beginPath();
   ctx.arc(mass2X, mass2Y, 3, 0, 2 * Math.PI);
   ctx.fill();
 
   // Update the angle for the next frame
   angle += time * w * Math.PI/180;
   if (angle > 2 *  Math.PI) {
    angle = 0;
   }

   requestAnimationFrame(draw);
   graph();
   generateGraph();
 };

 draw();

 function graph() {
  // Graph 
  let graphX = setMediaQueries(graphctx);
  graphctx.canvas.width = document.documentElement.clientWidth * scaleX;
  graphctx.canvas.height = document.documentElement.clientHeight * scaleY;
  graphctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  graphctx.font = "2rem Comic sans MS";
  graphctx.save();
  graphctx.translate(0, 225);
  graphctx.rotate(-Math.PI / 2);
  graphctx.fillText("Displacement", 0, 15);
  graphctx.restore();
  graphctx.fillText("t", graphCanvas.width - 20, 180);
  graphctx.beginPath();

  graphctx.moveTo(20, 50);
  graphctx.lineTo(20, 280);
  graphctx.moveTo(20, 175);
  graphctx.lineTo(graphCanvas.width - 20, 175);
  graphctx.strokeStyle = "black";
  graphctx.stroke();
  graphctx.closePath();
  
  graphctx.beginPath();
  graphctx.moveTo(20, 175);
  let i = 0;
  graphctx.strokeStyle = "blue";
  graphctx.lineWidth = 1.5;
  

  // Draw the displacement graph using displacementData
  for (let i = 0; i < displacementData.length; i++) {
    const dataPoint = displacementData[i];
    graphctx.lineTo(i * 5 + 20, 175 - (4 * dataPoint) / 5);
  }

  graphctx .stroke();
}  

function graph() {
  // Graph 
  let graphX = setMediaQueries(graphctx);
  graphctx.canvas.width = document.documentElement.clientWidth * scaleX;
  graphctx.canvas.height = document.documentElement.clientHeight * scaleY;
  graphctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  graphctx.font = "2rem Comic sans MS";
  graphctx.save();
  graphctx.translate(0, 225);
  graphctx.rotate(-Math.PI / 2);
  graphctx.fillText("Displacement", 0, 15);
  graphctx.restore();
  graphctx.fillText("t", 250, 180);
  graphctx.beginPath();

  graphctx.moveTo(20, 50);
  graphctx.lineTo(20, 280);
  graphctx.moveTo(20, 175);
  graphctx.lineTo(250, 175);
  graphctx.strokeStyle = "black";
  graphctx.stroke();
  graphctx.closePath();
  
  graphctx.beginPath();
  graphctx.moveTo(20, 175);
  let i = 0;
  graphctx.strokeStyle = "blue";
  graphctx.lineWidth = 1.5;
  

  // Draw the displacement graph using displacementData
  for (let i = 0; i < displacementData.length - 1; i++) {
    const currentPoint = displacementData[i];
    const nextPoint = displacementData[i + 1];
    const currentX = i * 5 + 20;
    const currentY = 175 - (4 * currentPoint) / 5;
    const nextX = (i + 1) * 5 + 20;
    const nextY = 175 - (4 * nextPoint) / 5;
    const controlX = (currentX + nextX) / 2;
    const controlY = (currentY + nextY) / 2;
    graphctx.quadraticCurveTo(currentX, currentY, controlX, controlY);
  }

  graphctx.stroke();
}

function generateGraph() {
  // Graph 1
  let graph1X = setMediaQueries(graphctx1);
  graphctx1.canvas.width = document.documentElement.clientWidth * scaleX;
  graphctx1.canvas.height = document.documentElement.clientHeight * scaleY;
  graphctx1.clearRect(0, 0, graphCanvas1.width, graphCanvas1.height);
  graphctx1.font = "2rem Comic sans MS";
  graphctx1.save();
  graphctx1.translate(0, 225);
  graphctx1.rotate(-Math.PI / 2);
  graphctx1.fillText("Magnification Factor", -10, 15);
  graphctx1.restore();
  graphctx1.fillText("n", 300, 250);
  graphctx1.beginPath();
  graphctx1.moveTo(20, 10);
  graphctx1.lineTo(20, 250);
  graphctx1.moveTo(20, 250);
  graphctx1.lineTo(300, 250);
  graphctx1.strokeStyle = "black";
  graphctx1.stroke();
  graphctx1.closePath();

  graphctx1.beginPath();
  graphctx1.moveTo(20, 225);
  graphctx1.strokeStyle = "red";
  graphctx1.lineWidth = 1.5;
  
  for (let i = 0; i < 4; i += 0.1) {
    let f = e;
    if (f == 0) {
      f = 0.01;
    }
    t4 = 1 - i * i;
    t5 = 2 * f * i;
    var mag_function = (1 - t4)/Math.sqrt((t4**2) + (t5**2));
    const dataPoint1 = mag_function;
    graphctx1.lineTo(i * 65 + 20, 225 - (60.9 * dataPoint1) / 2);
  }

  graphctx1.stroke();

  // Graph 2
  let graph2X = setMediaQueries(graphctx2);
  graphctx2.canvas.width = document.documentElement.clientWidth * scaleX;
  graphctx2.canvas.height = document.documentElement.clientHeight * scaleY;
  graphctx2.clearRect(0, 0, graphCanvas2.width, graphCanvas2.height);
  graphctx2.font = "2rem Comic sans MS";
  graphctx2.save();
  graphctx2.translate(10, 345);
  graphctx2.rotate(-Math.PI / 2);
  graphctx2.fillText("Phase Angle", 120, 5);
  graphctx2.restore();
  graphctx2.fillText("n", 300, 250);
  graphctx2.beginPath();
  graphctx2.strokeStyle = "black";
  graphctx2.moveTo(20, 250);
  graphctx2.lineTo(20, 13);
  graphctx2.moveTo(20, 250);
  graphctx2.lineTo( 300, 250);
  graphctx2.stroke();
  graphctx1.closePath();
  graphctx2.beginPath();
  graphctx2.moveTo(20, 250);
  graphctx2.strokeStyle = "red";
  graphctx2.lineWidth = 1.5;
 
  for (let j = 0; j < 3; j += 0.01) {
    t6 = 1 - j * j;
    t7 = 2 * e * j;
   
    var phase_function = Math.atan(t7/t6);
    if (phase_function < 0) {
      phase_function += Math.PI;
     }
     phase_function = phase_function * (180/Math.PI);
    const dataPoint2 = phase_function;
    graphctx2.lineTo(j * 100 + 20, 250 - (5 * dataPoint2) / 5);
  }
  graphctx2.stroke();
}

function plotgraph() {
  const graphDiv = document.querySelectorAll(".graph-div");
  graphDiv.forEach((graph) => {
    graph.classList.toggle("display-hide");
  });
  generateGraph();
}

window.addEventListener("load", varinit);
