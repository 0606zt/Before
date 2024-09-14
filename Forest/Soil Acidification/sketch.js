/**
 *
 * Forest系列-海报3
 * Soil Acidification
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标按住拖动，绘制酸雨
 * 2、鼠标滚轮重置画面
 *
 */


var x = 0;  //叶子的坐标
var y = 0;
var c = 150; //叶子的颜色
var r = 53; //叶子的大小
var rate = 500; //叶子生成的速度

var hues = []; //酸雨的色调
var nScl = 0.006; //噪声核大小

function setup() {
  createCanvas(displayWidth, displayHeight);
  init();
}

function draw() {
  //叶子
  leaf();

  //鼠标按住
  if (mouseIsPressed == true) {
    //酸雨
    for (let i = 0; i < 10; i++) {
      let rx = mouseX;
      let ry = mouseY;
      let rd = randomN(800, 9);
      rain(rx, ry, rd);
    }
  }
}

function init() {
  background(0);

  //海报
  poster();
}

function poster() {
  colorMode(RGB);

  //海报边框
  noFill();
  stroke(255, 255, 255);
  strokeWeight(0.5);
  rect(width / 2 - 250, 40, 500, height - 240);

  //海报文字
  textSize(8);
  strokeWeight(0.2);
  fill(255, 255, 255);
  text('Before  Leaves  Become  Corroded', 885, 30);
  text('Protect  The  Earth', 520, 685);
  text('O   O   O', 985, 685);
  text('’  ’  ’', 540, 112);
  text('Acid  rain  couses  SOIL  ACIDIFICATION', 550, 126);
  text('which  makes  leaves  corroded', 550, 146);
  text('and  discolored', 550, 166);
  text('Sulphur  dioxide  is  a  pollutant', 880, 430);
  text('and  a  MAJOR  contributor', 885, 450);
  text('to  ACID  RAIN', 890, 470);
  text('’  ’  ’', 960, 485);
  //textStyle(ITALIC);
  textSize(60);
  text('i', 985, 215);
  textSize(87);
  fill(255, 255, 255);
  text('A', 780, 108);
  text('C', 920, 200);
  text('D', 650, 250);
  text('F', 860, 340);
  text('Y', 870, 658);
  textSize(90);
  text('I', 560, 575);
  strokeWeight(0.5);
  noFill();
  text('A', 787, 112);
  text('F', 865, 345);
  text('I', 565, 570);
  textSize(97);
  //textStyle(BOLDITALIC);
  textStyle(BOLD);
  text('Y', 865, 660);
  textStyle(NORMAL);
}

//鼠标滚轮，重置
function mouseWheel() {
  c = 150;
  init();
}

