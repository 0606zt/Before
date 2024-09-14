/**
 *
 * Forest系列-海报1
 * Forest Night
 * 
 * 定义fire fly类
 * 
 * 核心原理：
 * 1、通过自建image，遍历设置像素值，生成 颜色变化梯度自然 的萤光，
 * 若用ellipse绘制，则需要很多圆才能达到 颜色无缝渐变 的效果
 *
 */


class FireFly {
  constructor(x, y) {
    this.pX = x;
    this.pY = y;
    this.r = 7;
    this.noiseX = 1000 + random(-0.5, 0.5);
    this.noiseY = -1000 + random(-1.5, 1.5);
    this.noiseScale = random(0.015, 0.017);
  }

  //更新位置
  move() {
    this.pX += noise(this.noiseX) * 6 - 2.8;
    this.pY += noise(this.noiseY) * 6 - 2.8;
    if (this.pX < 0) { this.pX = 0; }
    if (this.pX > width) { this.pX = width; }
    if (this.pY < 0) { this.pY = 0; }
    if (this.pY > height) { this.pY = height; }
    this.noiseX += this.noiseScale;
    this.noiseY += this.noiseScale;
  }

  //绘制萤光图
  drawLightImg() {
    image(lightImg, this.pX - lightImg.width / 2, this.pY - lightImg.height / 2);
  }

  //绘制萤火虫
  drawFirefly() {
    noStroke();
    fill(225, 225, 200, 255);
    ellipse(this.pX, this.pY, this.r + 3 * cos(millis() / 1000));
  }
}

//初始化萤光图
function setLightImg() {
  lightImg = createImage(imgSize, imgSize);
  lightImg.loadPixels();
  //遍历所有像素（注意，与习惯不同，这里外层循环是宽，内层循环是高）
  for (let i = 0; i < lightImg.width; i++) {
    for (let j = 0; j < lightImg.height; j++) {
      let pixAlpha = 145 / (dist(lightImg.width / 2, lightImg.height / 2, i, j) - 1) * 5;
      if (pixAlpha < lightLimit) { //lightLimit越大，发光区域越小
        pixAlpha = 0;
      }
      lightImg.set(i, j, color(235, 241, 7, pixAlpha));
    }
  }
  lightImg.updatePixels();
}