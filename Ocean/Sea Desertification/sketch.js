/**
 *
 * Ocean系列-海报2
 * Sea Desertification
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标按住，粒子群加速，海报的字从OCEAN变成DESERT
 * 鼠标松开恢复
 *
 */


var num = 300; //每群粒子的总数
//有四种不同的粒子群
var particles_a = [];
var particles_b = [];
var particles_c = [];
var particles_d = [];
var fade = 100; //控制拖尾长度
var radius = 3; //粒子半径
//四种粒子群的速度
var speed_a = 0.5;
var speed_b = 0.5;
var speed_c = 0.75;
var speed_d = 0.5;

var noiseScale = 300; //噪声大小
var noiseStrength = 1.2; //噪声波动的频率

var isPressed = 0; //鼠标是否按住

function setup() {
  createCanvas(displayWidth, displayHeight);
  init();
}

function draw() {
  //较低的不透明度
  background(0, 15);

  //当鼠标按住时
  if (mouseIsPressed == true) {
    isPressed = 1;
    //粒子群加速
    speed_a += 0.025;
    speed_b += 0.025;
    speed_c += 0.05;
    //同时产生新的红色粒子群
    for (let i = 0; i < num / 2; i++) {
      let loc_d = createVector(random(width / 2 - 255, width / 2 + 255), random(25, height - 175));
      //let loc_d = createVector(random(width), random(height));
      particles_d[i] = new Particle(loc_d, speed_d);
      //d红色
      fill(215, 0, 0, fade);
      particles_d[i].move(speed_d);
      particles_d[i].checkEdges();
      particles_d[i].drawParticle(radius);
    }
  }

  //abc三个粒子群
  for (let i = 0; i < num; i++) {
    //a白色
    fill(255, 255, 255, fade);
    particles_a[i].move(speed_a);
    particles_a[i].checkEdges();
    particles_a[i].drawParticle(radius);
    //b蓝色
    fill(0, 100, 219, fade);
    particles_b[i].move(speed_b);
    particles_b[i].checkEdges();
    particles_b[i].drawParticle(radius);
    //c青色
    fill(60, 250, 250, fade);
    particles_c[i].move(speed_c);
    particles_c[i].checkEdges();
    particles_c[i].drawParticle(radius);
  }

  //海报
  poster();
}

function init() {
  background(0, 15);

  //初始化粒子群信息
  for (let i = 0; i < num; i++) {
    let loc_a = createVector(random(width / 2 - 255, width / 2 + 255), random(25, height - 175));
    let loc_b = createVector(random(width / 2 - 255, width / 2 + 255), random(25, height - 175));
    let loc_c = createVector(random(width / 2 - 255, width / 2 + 255), random(25, height - 175));
    // let loc_a = createVector(random(width * 1.2), random(height), 2);
    // let loc_b = createVector(random(width * 1.2), random(height), 2);
    // let loc_c = createVector(random(width * 1.2), random(height), 2);
    particles_a[i] = new Particle(loc_a, speed_a);
    particles_b[i] = new Particle(loc_b, speed_b);
    particles_c[i] = new Particle(loc_c, speed_c);
  }
}

function poster() {
  //海报边框
  noFill();
  stroke(255, 255, 255, 240);
  strokeWeight(2);
  //rect(width / 2 - 240, 40, 480, height - 240);
  line(width / 2 - 240, 40, 590, 40);
  line(675, 40, width / 2 + 240, 40);
  line(width / 2 - 240, 40, width / 2 - 240, height - 200);
  line(width / 2 - 240, height - 200, width / 2 + 240, height - 200);
  line(width / 2 + 240, 40, width / 2 + 240, height - 200);

  line(width / 2 - 253, 27, 575, 27);
  line(970, 680, 1025, 680);

  //海报文字
  textSize(8);
  noStroke();
  fill(255, 255, 255);
  text('Before  Desertification  of  The  Sea', 875, 30);
  text('Protect  The  Earth', 520, 685);
  if (!isPressed) {
    textStyle(NORMAL);
    textSize(105);
    text('O', 590, 107);
    textSize(110);
    text('E', 560, 560);
    text('A', 720, 460);
    text('N', 890, 580);
    fill(16, 150, 216);
    text('C', 830, 200);
  } else { //按住之后，文字从OCEAN变成DESERT
    textStyle(ITALIC);
    textSize(80);
    text('e', 650, 130);
    textSize(110);
    text('D', 577, 107);
    text('R', 560, 560);
    text('E', 720, 460);
    text('T', 890, 580);
    fill(16, 150, 216);
    text('S', 830, 200);
  }
}

//鼠标松开，恢复原状
function mouseReleased() {
  isPressed = 0;
  speed_a = 0.5;
  speed_b = 0.5;
  speed_c = 0.75;
}
