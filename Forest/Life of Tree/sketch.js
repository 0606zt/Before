/**
 *
 * Forest系列-海报2
 * Life of Tree
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标点击生成新树
 *
 */


var treePath = []; //存放树
var rootNum = 2; //树根节点数

function setup() {
  createCanvas(displayWidth, displayHeight);
  init();
}

function draw() {
  //树
  for (let i = 0; i < treePath.length; i++) { //循环更新所有节点
    let loc = treePath[i].location.copy();
    let lastLoc = treePath[i].lastLocation.copy();
    strokeWeight(treePath[i].diameter);
    line(lastLoc.x, lastLoc.y, loc.x, loc.y);
    treePath[i].update();
  }
}

function init() {
  background(0);

  //年轮
  for (let i = 0; i < 1; i++) {
    treeRing(width / 2 + 65, height / 2 - 35);
  }

  //海报
  poster();

  //创建初始根节点
  stroke(240, 240, 240, 200);
  treePath = [];
  for (let i = 0; i < rootNum; i++)
    treePath.push(new Tree());
}

function poster() {
  // //海报边框
  // noFill();
  // stroke(255, 255, 255, 240);
  // strokeWeight(0.5);
  // rect(width / 2 - 250, 25, 500, height - 200);  // (518,25) (1018,689)

  //海报文字
  textSize(8);
  strokeWeight(0.2);
  stroke(255, 255, 255, 240);
  fill(255, 255, 255);
  text('Before  Trees  STOP  Growing', 518, 35);
  text('Protect  The  Earth', 945, 685);
  textSize(70);
  text('t r e e', 730, 640);
  textSize(80);
  fill(255, 255, 255);
  text('L i f', 558, 140);
  text('o', 583, 230);
  fill(11, 217, 134);
  text('e', 718, 140);
  text('f', 710, 340);
}

//鼠标按下，重置
function mousePressed() {
  init();
}
