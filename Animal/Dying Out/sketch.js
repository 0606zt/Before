/**
 *
 * Animal系列-海报3
 * Die Out
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标移动改变图片明暗，
 * 注：鼠标移动，图像更新会卡，会延迟，
 * 但是用processing写就不会卡，可能是浏览器计算方式不一样
 *
 */


var img; //鹦鹉图片
var imgCopy;

function preload() {
    img = loadImage('../../resource/parrot.jpg');
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    init();
}

function draw() {
    //鹦鹉
    updatePic();

    //海报
    poster();
}

function init() {
    background(0);
    frameRate(30);
    imgCopy = createImage(img.width, img.height);  //创建一个新的图像对象
}

function poster() {
    //海报边框
    noFill();
    stroke(255, 255, 255, 240);
    strokeWeight(2);
    rect(width / 2 - 240, 40, 480, height - 240);

    //海报文字
    textSize(8);
    noStroke();
    fill(255, 255, 255);
    text('Before  Animals  Nearly  dying  Out', 875, 30);
    text('Protect  The  Earth', 517, 683);
    textSize(112);
    fill(0, 40, 0);
    text('F', 550, 500);
    textSize(111);
    text('l', 552, 588);
    textSize(112);
    fill(255, 255, 255);
    text('F', 560, 510);
    textSize(111);
    text('l', 562, 598);
    textSize(95);
    text('ade', 620, 525);
    textSize(60);
    text('Ou t', 640, 600);
} 