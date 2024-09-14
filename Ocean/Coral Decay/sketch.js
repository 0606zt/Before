/**
 *
 * Ocean系列-海报1
 * Coral Decay
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标点击改变珊瑚颜色
 * 鼠标松开恢复（连续点击，产生变异效果）
 *
 */


var size = 200; //珊瑚大小，在以(centerX,centerY)为圆心，size为半径的区域生成珊瑚
var corals = []; //存放珊瑚小球
var isPressed = 0; //鼠标是否按住

function setup() {
    createCanvas(displayWidth, displayHeight);
    init();
}

function draw() {
    background(0, 5);

    //当鼠标按住时
    if (mouseIsPressed == true) {
        isPressed = 1;
    }

    //珊瑚
    corals.push(new Coral(width / 2, height / 2 + 105, width / 2, height / 2 - 25));
    for (let i = 0; i < corals.length; i++) {
        if (corals[i].size < 0) { //即时删除r<0的小球
            corals.splice(i, 1);
        }
        corals[i].drawCoral();
        corals[i].move();
        //print(corals.length); //观察到数组的长度动态平衡在200左右
    }

    //海报
    poster();
}

function init() {
    background(0, 5);
    frameRate(30); //指定帧率，每秒30帧（30次draw()）
}

function poster() {
    colorMode(RGB);

    //海报边框
    // noFill();
    // stroke(255, 255, 255, 240);
    // strokeWeight(0.5);
    // rect(width / 2 - 250, 40, 500, height - 240);

    //海报文字
    textSize(8);
    noStroke();
    fill(255, 255, 255);
    text('Before  Variation  of  Corals', 518, 35);
    text('Protect  The  Earth', 945, 685);
    text('’  ’  ’', 535, 587);
    text('Pollution  has  coused  undesirable  VARIATION', 543, 625);
    text('of  corals  which  are  quite  sensitive  to  it', 545, 641);
    textSize(90);
    text('C o', 550, 140);
    fill(199, 40, 114);
    text('r', 721, 140);
    fill(255, 255, 255);
    text('a l', 870, 240);
    textSize(80);
    text('D', 560, 530);
    text('e', 640, 530);
    text('c', 700, 530);
    text('a', 800, 600);
    text('y', 900, 630);
}

//鼠标松开，恢复原状
function mouseReleased() {
    isPressed = 0;
}