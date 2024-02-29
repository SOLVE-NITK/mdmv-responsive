class System {
    constructor(x, y) {
        this.x_equilibrium = x;
        this.y_equilibrium = y;
        this.k = 0;
        this.m = 0;
        this.c = 0;
        this.cc = 0;
        this.wn = 0;
        this.z = 0;
        this.w = 0;
        this.y = 0;
        this.yo = 0;
        this.w;
        this.y_mag = 0;
        this.phi = 0;
        this.y_base = 0;
    }

    initialise(_k, _m, _z, _ymag, _w) {
        this.k = _k;
        this.m = _m;
        this.z = _z;
        this.y_mag = _ymag;
        this.wn = Math.pow(this.k / this.m, 0.5);
        this.w = _w;
        this.cc = 2 * Math.pow(this.k * this.m, 0.5);
        this.c = this.z * this.cc;
    }

    update(t, _mulfact) {
        this.y_base = this.y_mag * Math.sin(this.w * t);
        let num = this.m * this.w * this.w * this.y_mag;
        let den = Math.pow(Math.pow(this.k - this.m * this.w * this.w, 2) + Math.pow(this.c * this.w, 2), 0.5);
        this.yo = (num / den) * _mulfact;
        this.phi = Math.atan((this.c * this.w) / (this.k - this.m * this.w * this.w));
        this.y = this.yo * Math.sin(this.w * t + this.phi);
    }

    show(x, y) {
        push();
        let wid = spr.width;
        let hei = spr.height;

        // spring
        image(spr, this.x_equilibrium - wid - 10, this.y_equilibrium + 16 + this.y + this.y_base - this.y_base, wid, hei - this.y + this.y_base - 10);

        // damper
        strokeWeight(3);
        stroke(0, 0, 255)
        let _y = this.y_equilibrium + 208 + this.y_base;
        line(215, _y, 215, _y - 30);
        line(215, _y - 30, 230, _y - 30);
        line(215, _y - 30, 200, _y - 30);
        line(200, _y - 30, 200, _y - 30 - 100);
        line(230, _y - 30, 230, _y - 30 - 100);

        line(215, this.y_equilibrium + this.y, 215, this.y_equilibrium + this.y + 125)
        line(215, this.y_equilibrium + this.y + 125, 225, this.y_equilibrium + this.y + 125);
        line(215, this.y_equilibrium + this.y + 125, 205, this.y_equilibrium + this.y + 125);

        // base
        stroke(0);
        rectMode(CENTER)
        rect(this.x_equilibrium, this.y_equilibrium + 208 + this.y_base, 150, 10)

        // mass
        stroke(1);
        strokeWeight(1);
        fill(1);
        rectMode(CENTER)
        rect(this.x_equilibrium, this.y_equilibrium + this.y, 150, 40)

        pop();
    }

    static mag_func(x, obj) {
        let num = 1 + (2 * obj.z * x) * (2 * obj.z * x);
        let den = (1 - x * x) * (1 - x * x) + (2 * obj.z * x) * (2 * obj.z * x);
        let solution = Math.pow(num / den, 0.5)
        return (solution);
    }

    static phase_func(x, obj) {
        let solution = Math.atan((2 * obj.z * x) / (1 - (x * x)));
        if (solution < 0) {
            solution = solution + Math.PI;
        }
        solution = solution * (180 / Math.PI);
        return solution;
    }
}
