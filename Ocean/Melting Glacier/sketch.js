/**
 *
 * Ocean系列-海报3
 * Welting Glacier
 * 
 * 主程序
 *
 * 交互内容：
 * 1、鼠标按住，冰川模糊且移动变缓
 * 鼠标松开恢复
 * 2、鼠标移动制造噪声（噪声曲线就是冰川）
 * 
 */


var glacierGraph; //冰川图
var speed = 1; //冰川移动速度

function setup() {
  createCanvas(displayWidth, displayHeight);
  init();
}

function draw() {
  //当鼠标按住时
  if (mouseIsPressed == true) {
    speed = 0.7; //产生运动模糊
  }

  //冰川
  glacier();

  //海报
  poster();
}

function init() {
  background(0);

  //创建冰川图
  glacierGraph = createGraphics(500, height - 225);
  glacierGraph.background(0);
}

function poster() {
  //海报边框
  noFill();
  stroke(255, 255, 255, 240);
  strokeWeight(0.5);
  rect(width / 2 - 250, 40, 500, height - 240);

  //海报文字
  textSize(8);
  textStyle(NORMAL);
  noStroke();
  fill(255, 255, 255);
  text('Before  Glaciers  Melting  Significantly', 875, 30);
  text('Protect  The  Earth', 515, 685);
  text('#  #  #  #  #', 980, 680);
  textSize(90);
  textStyle(BOLD);
  strokeWeight(1);
  stroke(255, 255, 255, 240);
  noFill();
  text('GLACIER', 540, 190);
  text('GLACIER', 540, 275);
  var textGraph = createGraphics(400, 60); //半个字也是利用新建图片的方式实现
  //textGraph.background(200); //观察图片位置用的
  textGraph.textSize(90);
  textGraph.textStyle(BOLD);
  textGraph.fill(255, 255, 255);
  textGraph.text('GLA', 0, 87);
  textGraph.text('ER', 277, 87);
  textGraph.fill(82, 1, 220);
  textGraph.text('CI', 187, 87);
  image(textGraph, 540, 53);
}

//鼠标松开，恢复原状
function mouseReleased() {
  speed = 1;
}