/**
 *
 * Forest系列-海报1
 * Forest Night
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标点击生成新的萤火虫
 * 2、鼠标滚轮重置画面
 *
 */


var plants = []; //存放植物
var plantNum = 5; //几株植物
var yRatio = 0.6; //高度差

var fireFlies = []; //存放萤火虫
var ffInitNum = 1; //萤火虫初始数量
var lightImg; //使用自建image的方法生成萤光
var imgSize = 400; //萤光图尺寸
var lightLimit = 5.5; //光圈大小控制

function setup() {
  createCanvas(displayWidth, displayHeight);
  init();
}

function draw() {
  background(0);

  //海报
  poster();

  //植物
  for (let i = 0; i < plants.length; i++) {
    plants[i].update();
    plants[i].drawTrunk();
    plants[i].drawLeaf();
  }

  //萤火虫
  for (var i = 0; i < fireFlies.length; i++) {
    fireFlies[i].drawLightImg();
    fireFlies[i].drawFirefly();
    fireFlies[i].move();
  }
}

function init() {
  background(0);

  //初始化植物
  for (let i = 0; i < plantNum; i++) {
    let x = random(-height / 3, height / 3);
    let y = -height / 2.5 + yRatio * height * (i / (plantNum - 1)) ** 1.5;
    let leafXy = createVector(x, y); //叶片中心位置

    let r = 0.4 / 2 * height * ((i + 1) / (plantNum)) ** 1; //叶片大小
    let r_h = r;
    let r_v = r / 3;

    let totalAng = 2 * PI; //总角度

    plants[i] = new Plant(leafXy, r_h, r_v, totalAng);
  }

  //初始化萤火虫
  setLightImg();
  for (var i = 0; i < ffInitNum; i++) {
    fireFlies[i] = new FireFly(width / 2 + random(-5, 5), height / 2 + random(-15, 15));
  }
}

function poster() {
  //colorMode(RGB); //由于Plant里用了push和pop，所以这里不用显式设置RGB

  // //海报边框
  // noFill();
  // stroke(255, 255, 255, 240);
  // strokeWeight(0.5);
  // rect(width / 2 - 250, 25, 500, height - 200);

  //海报文字
  textSize(8);
  textStyle(NORMAL);
  strokeWeight(0.2);
  stroke(255, 255, 255, 240);
  fill(255, 255, 255);
  text('Before  Losing  the  Breath  of  Forest', 875, 35);
  text('Protect  The  Earth', 520, 685);
  text('Everyone  may  ENJOY  the  BREATH  of  Forest', 830, 430);
  text('with  fire  flies  lighting  up', 860, 450);
  text('the  dark  night', 930, 470);
  text('’  ’  ’', 965, 490);
  textSize(120);
  text('F', 540, 240);
  textSize(95);
  text('o r e', 620, 247);
  textSize(110);
  textStyle(BOLD);
  strokeWeight(1);
  noFill();
  text('s t', 860, 330);
}

//鼠标滚轮，重置
function mouseWheel() {
  fireFlies = [];
  ffInitNum = 1;
  init();
}

//鼠标点击位置生成新的萤火虫
function mousePressed() {
  fireFlies.push(new FireFly(mouseX, mouseY));
}
