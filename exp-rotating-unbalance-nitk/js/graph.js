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
            this.wave = this.wave.slice(1);
        }
    }

    delete() {
        this.wave = [];
        t = 0.05;
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
        strokeWeight(1)
        line(this.x, this.y, this.x, this.y + this.h);
        line(this.x, this.y, this.x, this.y - this.h);
        line(this.x, this.y, this.x + this.w, this.y);

        fill(0)
        strokeWeight(0)
        textSize(18);
        text(this.xLabel, this.x + this.w, this.y);
        translate(this.x, this.y)
        rotate(radians(-90))
        text(this.yLabel, -this.h + 20, -10);

        pop();
    }
}
