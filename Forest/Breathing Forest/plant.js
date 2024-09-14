/**
 *
 * Forest系列-海报1
 * Forest Night
 * 
 * 定义plant类
 * 
 * 核心原理：
 * 1、三角函数与随机数结合，矩阵(Array)、向量(Vector)、lerp的数学运算
 * 2、叶片动态褶皱由静态等分的线条旋转而成，枝干由sin函数变形得到
 * 3、颤动摇曳的效果由随机数trunkInitAng形成
 * 4、涉及到translate、rotate时不要忘了push、pop
 *
 */


class Plant {
  constructor(leafXy, r_h, r_v, totalAng) {
    this.leafXy = leafXy;
    this.r_h = r_h;
    this.r_v = r_v;

    this.totalAng = totalAng

    this.numPoints = 100;
    this.numBend = 3;
    this.numCycle = 5;
    this.trunkAmp = random(height / 10);
    this.trunkInitAng = random([0, PI]);

    this.aryXy = [];
    this.aryRParameter = [];
    this.aryinitAngParameter = [];
    this.aryAngStep = [];
    this.aryColParameter = [
      [random(1000), random(1000), 1 / 1, 0.005],
      [random(1000), random(1000), 1 / 1, 0.005]];//[initNoiseX, initNoiseY, noiseR, noiseSpeed]

    let angStep = this.totalAng / this.numPoints;
    for (let i = 0; i < this.numPoints; i++) {
      let ang = angStep * i;
      this.aryXy.push(createVector(this.r_v * cos(ang), this.r_h * sin(ang)));
    }

    for (let i = 0; i < this.numBend; i++) {
      this.aryRParameter[i] = [this.r_v / 30 * 0.8 ** i, random(2 * PI), 2 * PI / random(100, 500)];//[max, init, speed]
    }

    for (let i = 0; i < this.numBend; i++) {
      this.aryinitAngParameter[i] = [2 * PI, random(2 * PI), 2 * PI / random(200, 1000)];//[max, init, speed]
    }

    for (let i = 0; i < this.numBend; i++) {
      this.aryAngStep[i] = this.totalAng / this.numPoints * int(random(3, 8 + i) * 1);
    }
  }

  //更新枝干
  updateTrunk() {
    let rootXy = createVector(0, height / 2 * 0.9);
    let endXy = p5.Vector.add(this.leafXy, p5.Vector.rotate(this.newAryXy[0], PI / 2));
    let numPoints = 50;
    this.aryXyTrunk = [];
    for (let i = 0; i < numPoints; i++) {
      this.aryXyTrunk.push(p5.Vector.lerp(rootXy, endXy, 1 / (numPoints - 1) * i));
    }
    let vecSin = p5.Vector.sub(this.aryXyTrunk[this.aryXyTrunk.length - 1], this.aryXyTrunk[0]).normalize().rotate(PI / 2);
    for (let i = 0; i < this.aryXyTrunk.length; i++) {
      let ang = 2 * PI / (this.aryXyTrunk.length - 1) * i;
      let ampVecSin = p5.Vector.mult(vecSin, sin(this.trunkInitAng + ang) * this.trunkAmp);
      this.aryXyTrunk[i] = p5.Vector.add(this.aryXyTrunk[i], ampVecSin);
    }
  }

  //更新半径
  updateR() {
    this.aryR = [];
    for (let i = 0; i < this.aryRParameter.length; i++) {
      this.aryR[i] = this.aryRParameter[i][0] * (sin(this.aryRParameter[i][1] + this.aryRParameter[i][2] * frameCount));
    }
  }
  //更新角度
  updateAng() {
    this.aryinitAng = [];
    for (let i = 0; i < this.aryinitAngParameter.length; i++) {
      this.aryinitAng[i] = this.aryinitAngParameter[i][1] + this.aryinitAngParameter[i][0] * (sin(this.aryinitAngParameter[i][2] * frameCount));
    }
  }

  //更新的总函数
  update() {
    this.updateR();
    this.updateAng();
    this.newAryXy = this.aryXy;
    for (let i = 0; i < this.numBend; i++) {
      this.newAryXy = bend(this.newAryXy, this.aryR[i], this.aryinitAng[i], this.aryAngStep[i], this.numCycle);
    }
    this.updateTrunk();
  }

  //绘制叶片
  drawLeaf() {
    push();
    colorMode(HSB);
    stroke(160, 100, 100);
    strokeWeight(1);
    translate(width / 2 + 0.75 * this.leafXy.x, height * 2 / 5 + 0.75 * this.leafXy.y);
    rotate(PI / 2);
    for (let i = 1; i < this.newAryXy.length; i++) {
      line(this.newAryXy[0].x, this.newAryXy[0].y, this.newAryXy[i].x, this.newAryXy[i].y)
    }
    pop();
  }

  //绘制枝干
  drawTrunk() {
    push();
    colorMode(HSB);
    stroke(160, 100, 100);
    strokeWeight(2);
    noFill();
    beginShape();
    translate(width / 2, height * 2 / 5);
    for (let i = 0; i < this.aryXyTrunk.length; i++) {
      vertex(0.75 * this.aryXyTrunk[i].x, 0.75 * this.aryXyTrunk[i].y);
    }
    endShape();
    pop();
  }
}

//叶片动态褶皱
function bend(aryXy, r, initAng, angStep, numCycle) {
  let aryXy2 = aryXy;
  for (let j = 0; j < numCycle; j++) {
    let aryXyNew = [];
    for (let i = 0; i < aryXy2.length; i++) {
      let xy_1_2 = p5.Vector.sub(aryXy2[(i + 1) % aryXy2.length], aryXy2[i]);
      let ang = initAng + angStep * i;
      xy_1_2.rotate(-PI / 2).setMag(r * sin(ang));
      let xy = p5.Vector.add(aryXy2[i], xy_1_2);
      aryXyNew.push(xy);
    }
    aryXy2 = aryXyNew;
  }
  return aryXy2;
}


