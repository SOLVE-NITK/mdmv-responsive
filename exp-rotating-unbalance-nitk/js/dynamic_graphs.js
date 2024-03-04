class DynamicGraph {
    constructor(x, y, h, w, yLabel, xLabel, minX, maxX, minY, maxY, func) {
        this.length = 0;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.xLabel = xLabel;
        this.yLabel = yLabel;
        this.graphs = [];
        this.function = func;
        this.timer = 0;
    }

    initialise() {
        this.timer = 0;
        let temp = [];
        for (let x = 0; x < this.w; x += 1) {
            let tempx = map(x, 0, this.w, this.minX, this.maxX);
            let y = map(this.function(tempx, spring1), this.minY, this.maxY, 0, this.h);
            temp.push([x, y])
        }
        temp.label = [random(255), random(255), random(255)];
        temp.timer = 0;
        this.graphs.push(temp);
    }

    draw() {
        push();

        stroke(0);
        strokeWeight(1);
        line(this.x, this.y, this.x, this.y - this.h);
        line(this.x, this.y, this.x + this.w, this.y);

        strokeWeight(0);
        fill(0);
        textSize(14);
        text(this.xLabel, this.x + this.w, this.y);
        translate(this.x, this.y);
        rotate(radians(-90));
        text(this.yLabel, 40, -20);

        pop();


        push();

        for (let n = 0; n < this.graphs.length - 1; n++) {
            beginShape();
            stroke(this.graphs[n].label[0], this.graphs[n].label[1], this.graphs[n].label[2]);
            strokeWeight(1);
            noFill();
            for (let i = 0; i < this.graphs[n].timer; i++) {
                vertex(this.x + this.graphs[n][i][0], this.y - this.graphs[n][i][1]);
            }
            endShape();
        }

        beginShape();
        stroke(this.graphs[this.graphs.length - 1].label[0], this.graphs[this.graphs.length - 1].label[1], this.graphs[this.graphs.length - 1].label[2]);

        let j = this.timer;
        strokeWeight(1);
        noFill();
        for (let i = 0; i < j; i++) {
            vertex(this.x + this.graphs[this.graphs.length - 1][i][0], this.y - this.graphs[this.graphs.length - 1][i][1]);
        }
        endShape();

        pop();

        if (this.timer < this.graphs[this.graphs.length - 1].length) {
            this.timer += 1;
            this.graphs[this.graphs.length - 1].timer = this.timer;
        }
    }

}

