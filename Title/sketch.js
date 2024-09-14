/**
 *
 * Title海报
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标移动改变背景颜色（轻微）
 *
 */


var colors = ['#003399', '81a9ff', '567eff', '0050b2', '05007e']; //设定颜色集合，用于随机生成
var blooms = []; //存放花
var fLines = []; //存放线条


function setup() {
    createCanvas(displayWidth, displayHeight);
    init();
}

function draw() {
    background(248, 245, 250 + mouseX / 9);

    //浮动线条
    for (let i = 0; i < fLines.length; i++) {
        fLines[i].update();
        fLines[i].drawLine();
    }

    //花
    for (let i = 0; i < blooms.length; i++) {
        blooms[i].update();
        blooms[i].drawBloom();
    }

    //海报
    poster();
}

function init() {
    background(248, 245, 250 + mouseX / 9);

    //初始化线条
    fLines.push(new floatingLine(width / 2 - 300, 50));

    //初始化花朵
    for (let i = 20; i < 200; i += 20) {
        blooms.push(new bloom(width / 2, 300, i, i / 10));
    }
}

function poster() {
    blendMode(BLEND);

    //海报文字
    noStroke();
    fill(0, 0, 0);
    textSize(30);
    text('E  A  R  T  H', 690, 635)
    textSize(15);
    text('- Guard    the    Delicate    Planet -', 649, 680);
}