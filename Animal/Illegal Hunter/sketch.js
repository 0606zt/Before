/**
 *
 * Animal系列-海报2
 * Hunter
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标移动，图片粒子化
 *
 */


var img; //白虎图片
var particles = []; //存放粒子

function preload() {
  img = loadImage("../../resource/tiger.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  init();
}

function draw() {
  background(0);
  image(img, width / 2 - 240, 140);

  //海报
  poster();

  //粒子
  drawParticle();
}

function init() {
  background(0);
  image(img, width / 2 - 240, 140);

  //初始化粒子
  for (let i = 1; i > 0; i -= 0.0001) { //随机生成10000个(x,y,size)
    let x = random(img.width);
    let y = random(img.height);
    let size = 25 * Math.pow(random(i), 2) + 8;
    //如果粒子数组内没有到(x,y)的距离<它与size的半径之和的，就加入该粒子，否则不生成新粒子
    //这样就可以根据实际情况控制粒子数量的上限
    if (!particles.some(p => Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2) < Math.pow(size / 2 + p.size / 2, 2))) {
      let pixelvalue = img.get(x, y);
      let r = red(pixelvalue);
      let g = green(pixelvalue);
      let b = blue(pixelvalue);
      if (r != 0 && g != 0 && b != 0) { //纯黑的不进行粒子化（此处存在疑问，如果使用if(img.get(x,y)!=[0,0,0])来判断是否黑色是无效的，原因不知道）
        particles.push(new ParticlePic(x, y, size));
      }
    }
  }
}

function poster() {
  //海报边框
  noFill();
  stroke(255, 255, 255, 240);
  strokeWeight(2);
  line(width / 2 - 230, 660, width / 2 + 230, 660);
  //rect(width / 2 - 240, 40, 480, height - 240);

  //海报文字
  textStyle(NORMAL);
  textSize(8);
  noStroke();
  fill(255, 255, 255);
  text('Before  Illegal  Hunting  Happens', 885, 30);
  text('Protect  The  Earth', 517, 683);
  ellipse(540, 70, 9, 9);
  ellipse(560, 70, 9, 9);
  ellipse(580, 70, 9, 9);
  ellipse(960, 570, 9, 9);
  ellipse(960, 590, 9, 9);
  ellipse(960, 610, 9, 9);
  textStyle(BOLD);
  textSize(100);
  fill(66, 121, 138);
  text('H', 723, 130);
  noFill();
  stroke(255, 255, 255, 240);
  strokeWeight(2.5);
  text('U', 725, 230);
  text('N', 726, 340);
  text('T', 739, 450);
  text('E', 740, 560);
  text('R', 740, 650);
}