class System {
  constructor(x, y, _w, _h) {
    this.width = _w;
    this.h = _h;
    this.x_equilibrium = x;
    this.y_equilibrium = y;
    this.F0 = 0;
    this.w = 0;
    this.k1 = 0;
    this.m1 = 0;
    this.k2 = 0;
    this.m2 = 0;
    this.w1 = 0;
    this.w2 = 0;
    this.x1 = 0;
    this.x2 = 0;
    this.masscoordinates = [];
  }

  initialise(_F0, _w, _k1, _m1, _k2, _m2) {
    this.F0 = _F0;
    this.w = _w;
    this.k1 = _k1;
    this.m1 = _m1;
    this.k2 = _k2;
    this.m2 = _m2;
    this.denom =
      this.m1 * this.m2 * Math.pow(this.w, 4) -
      (this.m1 * this.k2 + this.m2 * (this.k1 + this.k2)) *
        Math.pow(this.w, 2) +
      this.k1 * this.k2;
    this.x1 =
      ((this.k2 - this.m2 * Math.pow(this.w, 2)) * this.F0) / this.denom;
    this.x2 = (this.k2 * this.F0) / this.denom;
    this.term1 = Math.pow(
      (this.k1 * this.m2 + this.k2 * this.m2 + this.m1 * this.k2) /
        (this.m1 * this.m2),
      2
    );

    this.term2 = (this.k1 * this.k2) / (this.m1 * this.m2);
    this.term3 =
      (this.k1 * this.m2 + this.k2 * this.m2 + this.m1 * this.k2) /
      (this.m1 * this.m2);

    this.det = Math.pow(this.term1 - 4 * this.term2, 0.5);

    this.w1 = Math.pow((this.term3 + this.det) / 2, 0.5);
    this.w2 = Math.pow((this.term3 - this.det) / 2, 0.5);

    //this.m = _m;
    //this.f = _force;
    //this.wn = math.pow(this.k/this.m, 0.5);
    //this.z = _z;
    //this.w = _w;
  }

  update(t, _mulfact) {
    //this.fi = atan((-2*this.z*this.w / this.wn) / (1 - (this.w*this.w)/(this.wn*this.wn)));

    this.y2 = -(_mulfact * this.x1 * Math.sin(this.w1 * t * 10));
    this.y1 = -(_mulfact * this.x2 * Math.sin(this.w2 * t * 10));
  }

  show(_stroke, _strockweight, _fill) {
    push();

    let wid = spr.width - 50;
    let hei = spr.height - 140;

    // spring
    image(
      spr,
      this.x_equilibrium - wid / 2,
      this.y_equilibrium - 12.5 - hei + this.y1 + 10,
      wid,
      hei - this.y1
    );
    fill(0, 0, 0);
    textSize(11);
    text(
      "K1",
      this.x_equilibrium - wid / 2 - 30,
      this.y_equilibrium - 12.5 - hei / 2 + this.y1 + 10
    );

    image(
      spr,
      this.x_equilibrium - wid / 2,
      this.y_equilibrium - 12.5 - 25 - 2 * hei + this.y2 + 10,
      wid,
      hei - this.y2 + this.y1
    );

    //image(spr,this.x_equilibrium -(wid/2) ,this.y_equilibrium -(this.h/2) +this.y1 , this.width-20, this.h)
    fill(0, 0, 0);
    textSize(11);
    text(
      "K2",
      this.x_equilibrium - wid / 2 - 30,
      this.y_equilibrium - 12.5 - 25 - 1.5 * hei + this.y2 + 10
    );

    // base
    rectMode(CENTER);
    fill(0, 0, 0);
    rect(this.x_equilibrium, this.y_equilibrium, this.width + 40, this.h - 20);

    // mass
    rect();
    stroke(_stroke);
    strokeWeight(_strockweight);
    fill(_fill);
    rectMode(CENTER);
    fill(139, 69, 19);
    rect(
      this.x_equilibrium,
      this.y_equilibrium - this.h / 2 - hei + this.y1 - this.h / 2 + 10,
      this.width - 20,
      this.h
    ); // bottom mass
    fill(255, 255, 255);
    textSize(12);
    text(
      "m1",
      this.x_equilibrium - 5,
      this.y_equilibrium - this.h / 2 - hei + this.y1 - this.h / 2 + 13
    );
    rectMode(CENTER);
    fill(139, 69, 19);
    rect(
      this.x_equilibrium,
      this.y_equilibrium - 50 - 2 * hei + this.y2 + 10,
      this.width - 20,
      this.h
    ); // top mass
    fill(255, 255, 255);
    textSize(12);
    text(
      "m2",
      this.x_equilibrium - 5,
      this.y_equilibrium - 50 - 2 * hei + this.y2 + 13
    );

    //fill(255,0,255);
    //rect(this.x_equilibrium - this.width/2, this.y_equilibrium + this.y2 +this.h+50, this.width, this.h)

    pop();

    this.masscoordinates = [
      this.x_equilibrium,
      this.y_equilibrium - this.h / 2 - hei + this.y1 - this.h / 2 + 10,
      this.x_equilibrium,
      this.y_equilibrium - 50 - 2 * hei + this.y2 + 10,
    ];
  }

  static mag_func1(x, obj) {
    let mu = obj.m1 / obj.m2;
    let temp1 = x;
    let temp2 = Math.pow((obj.w2 * x) / obj.w1, 2);
    let denom = (1 + mu) * temp2 + Math.pow(temp1, 2);

    let solution =
      (1 - Math.pow(temp1, 2)) / (Math.pow(temp1, 2) * temp2 - denom + 1);
    //let temp1= 1-(Math.pow((obj.w/obj.w1),2));
    //let temp2 = Math.pow(obj.w1,2)-Math.pow(obj.w,2);
    //let temp3 = Math.pow((obj.w/x),2)-Math.pow(obj.w,2);
    //let solution = temp1/(Math.pow((obj.w1*(obj.w/x)),2)*temp2*temp3);
    if (abs(solution) < 200) {
      return abs(solution);
    } else {
      return 200;
    }
  }
  static mag_func2(x, obj) {
    let mu = obj.m1 / obj.m2;
    let temp1 = x;
    let temp2 = Math.pow((obj.w2 * x ** x) / obj.w1, 2);
    let denom = (1 + mu) * temp2 + Math.pow(temp1, 2);

    let solution = 1 / (Math.pow(temp1, 2) * temp2 - denom + 1);
    if (abs(solution) < 200) {
      return abs(solution);
    } else {
      return 200;
    }
  }
}
