class Graph {
  constructor(x, y, h, w, yLabel, xLabel) {
    this.wave = [];
    this.length = 0;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.xLabel = xLabel;
    this.yLabel = yLabel;
  }

  update(value) {
    this.wave.push(value);
    if (this.wave.length > this.w) {
      // this.delete();
      this.wave = this.wave.slice(2);
      // console.log("in")
    }
  }

  delete() {
    this.wave = [];
    t = 0.05;
    // console.log("hello")
  }

  draw(r, g, b) {
    push();

    beginShape();
    stroke(r, g, b);
    strokeWeight(2);
    noFill();
    for (let i = 0; i < this.wave.length; i++) {
      vertex(i + this.x, this.wave[i] + this.y);
    }
    endShape();

    stroke(0);
    strokeWeight(1);
    line(this.x, this.y, this.x, this.y + this.h);
    line(this.x, this.y, this.x, this.y - this.h);
    line(this.x, this.y, this.x + this.w, this.y);

    fill(0);
    strokeWeight(0);
    textSize(14);
    text(this.xLabel, this.x + this.w, this.y);
    translate(this.x , this.y -30);
    rotate(radians(-90));
    text(this.yLabel, -this.h + 10, -10);

    pop();
  }
}
