/**
 *
 * Animal系列-海报2
 * Hunter
 * 
 * 定义particle pic类
 * 
 * 核心原理：
 * 1、随机生成若干点，插值判断，最终形成粒子群，颜色就是该点像素的值
 * 2、遍历粒子群，根据当前鼠标位置更新其位置并绘制
 * 公式：t=1-5e^4(distance(mouse,pos))
 *      (newX,newY)=(1-t)*(x,y)+t*(random+(x,y))
 *
 */


class ParticlePic {
  constructor(x, y, size) {
    this.pos = new p5.Vector(x, y); //位置
    this.rPos = p5.Vector.random2D().add(this.pos); //在位置的基础上进行随机化，生成的新位置
    this.size = size; //大小
    this.color = img.get(x, y); //像素值
  }
}

//粒子群随鼠标移动
//绘制粒子
function drawParticle() {
  for (let particle of particles) { //遍历粒子群
    fill(particle.color);
    let t = 1 - 5e-4 * (Math.pow(particle.pos.x - mouseX, 2) + Math.pow(particle.pos.y - mouseY, 2));
    let p = p5.Vector.mult(particle.pos, 1 - t).add(p5.Vector.mult(particle.rPos, t));
    noStroke();
    ellipse(p.x + width / 2 - 240, p.y + 140, particle.size, particle.size);
  }
}