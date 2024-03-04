class System  {
    constructor(x, y, _w, _h)   {
        this.width = _w;
        this.h = _h
        this.x_equilibrium = x;
        this.y_equilibrium = y;
        this.k = 0;
        this.m = 0;
        this.wn = 0;
        this.z = 0;
        this.w = 0;
        this.x = 0;
        this.y = 0;
        this.xo = 0;
        this.yo = 0;
        this.fi = 0;
    }

    initialise(_k, _m, _z, _force, _w)  {
        this.k = _k;
        this.m = _m;
        this.F = _force;
        this.wn = Math.pow(this.k/this.m, 0.5);
        this.z = _z;
        this.w = _w;
    }

    update(t, _mulfact)  {
        this.t = t;
        this.fi = atan((-2*this.z*this.w / this.wn) / (1 - (this.w*this.w)/(this.wn*this.wn)));
        let numerator = this.F/this.k;
        let temp1 = Math.pow((1 - ((this.w*this.w)/(this.wn*this.wn))), 2);
        let temp2 = Math.pow((2 * this.z * this.w)/this.wn, 2);
        this.yo = numerator / Math.pow(temp1 + temp2, 0.5);
        this.y = -(_mulfact*this.yo * Math.sin(this.w*t + this.fi));
        this.x = this.xo * Math.sin(this.w*t + this.fi);
    }

    show(_stroke, _strockweight, _fill) {
        push();

        let wid = spr.width;
        let hei = spr.height;

        // spring
        image(spr, this.x_equilibrium - wid - 10, this.y_equilibrium + 16 + this.y, wid, hei - this.y)
        // base
        rect(80, 440, this.width, 10)
        // damper
        strokeWeight(3);
        stroke(0, 0, 255)
        line(215, 440, 215, 410);
        line(215, 410, 230, 410);
        line(215, 410, 200, 410);
        line(200, 410, 200, 300);
        line(230, 410, 230, 300);

        line(215, this.y_equilibrium + this.y, 215, this.y_equilibrium + this.y + 125)
        line(215, this.y_equilibrium + this.y + 125, 225, this.y_equilibrium + this.y + 125);
        line(215, this.y_equilibrium + this.y + 125, 205, this.y_equilibrium + this.y + 125);
        // mass
        rect()
        stroke(_stroke);
        strokeWeight(_strockweight);
        fill(_fill);
        rectMode(CENTER)
        rect(this.x_equilibrium + this.x, this.y_equilibrium + this.y, this.width, this.h)
        fill(255);
        ellipse(this.x_equilibrium + this.x, this.y_equilibrium + this.y, 42, 42);

        let r = 17;
        // console.log(this.fi);
        let x = r*Math.sin(this.w*this.t + this.fi);
        let y = -r*Math.cos(this.w*this.t + this.fi);

        fill(255, 0, 0);

        ellipse(this.x_equilibrium + this.x + x, this.y_equilibrium + this.y + y, 6, 6);
        
        pop();
    }

    static mag_func(x, obj)  {
        let num = obj.k * obj.k;
        let den = (1 - x * x) * (1 - x * x) + (2 * obj.z * x) * (2 * obj.z * x);
        let solution = num / Math.pow(den, 0.5)
        return (solution / (obj.k * obj.k));
    }

    static phase_func(x, obj)    {
        let solution = Math.atan((2 * obj.z * x) / (1 - (x * x)));
        if (solution < 0)   {
            solution = solution + Math.PI;
        }
        solution = solution * (180/Math.PI);
        return solution;
    }
}
