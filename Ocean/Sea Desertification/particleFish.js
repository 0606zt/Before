/**
 *
 * Ocean系列-海报3
 * Sea Desertification
 * 
 * 定义particle fish类
 * 
 * 核心原理：
 * 1、粒子的拖尾效果通过降低背景的不透明度和设置fade实现
 * 2、设置粒子的运动方程为：x=cos(a)，y=sin(a)-cos(a)*sin(a)
 *
 */


class Particle {
  constructor(l, s) {
    this.loc = l;
    this.dir = createVector(0, 0);
    this.speed = s;
    this.d = 1;
  }

  //粒子运动
  move(s) {
    this.speed = s;
    this.angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength;
    this.dir.x = cos(this.angle);
    this.dir.y = sin(this.angle) - cos(this.angle) * sin(this.angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed * this.d);
    this.loc.add(this.vel);
  }

  //将位置限制在海报内 
  checkEdges() {
    if (this.loc.x < (width / 2 - 255) || this.loc.x > (width / 2 + 255) || this.loc.y < 25 || this.loc.y > (height - 175)) {
      this.loc.x = random(width / 2 - 255, width / 2 + 255);
      this.loc.y = random(25, height - 175);
    }
    // if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
    //   this.loc.x = random(width * 1.2);
    //   this.loc.y = random(height);
    // }
  }

  //绘制粒子
  drawParticle(r) {
    noStroke();
    ellipse(this.loc.x, this.loc.y, r);
  }
}

