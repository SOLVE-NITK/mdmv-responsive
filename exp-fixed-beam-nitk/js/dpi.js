//get DPI
let dpi = window.devicePixelRatio;
//get canvas
let canvas = document.getElementById("myCanvas");
//get context
let ctx = canvas.getContext("2d");
function fix_dpi() {
  //get CSS height
  //the + prefix casts it to an integer
  //the slice method gets rid of "px"
  let style_height = +getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  //get CSS width
  let style_width = +getComputedStyle(canvas)
    .getPropertyValue("width")
    .slice(0, -2);
  //scale the canvas
  canvas.setAttribute("height", style_height * dpi);
  canvas.setAttribute("width", style_width * dpi);
}

// tooltip
const showTooltip = function (e) {
  console.log(e);
  let x = e.offsetX,
    y = e.offsetY;
  sectionTooltip.style.top = y + 20 + "px";
  sectionTooltip.style.left = x + 20 + "px";
};

// canvas.width = rect.width * devicePixelRatio;
// canvas.height = rect.height * devicePixelRatio;
// ctx.scale(devicePixelRatio / 2, devicePixelRatio / 2);
// canvas.style.width = rect.width + "px";
// canvas.style.height = rect.height + "px";


