/**
 *
 * Animal系列-海报1
 * Dear Grinder
 * 
 * 主程序
 * 
 * 交互内容：
 * 1、鼠标按住，粉碎鹿的图像
 * 松开停止粉碎过程
 * 2、鼠标滚轮重置画面
 *
 */


var img; //鹿的图片
var x, y, w, h, spx, spy; //位置，大小，速度
var count = 0; //当前错位次数
var maxCount = 10; //错位多少次就重置参数
var picGraph; //图片所在的子画布
var newImg; //错位后的新图片

function preload() {
	img = loadImage('../../resource/dear.png');
}

function setup() {
	createCanvas(displayWidth, displayHeight);
	init();
}

function draw() {
	//当鼠标按住时，进行图片错位切割
	if (mouseIsPressed == true) {
		if (count >= maxCount) { //每经过maxCount次就重置一遍参数
			setGrinder();
			count = 0;
			maxCount = int(random(3, 8));
		}
		accel();

		newImg = createImage(width, height);
		newImg.copy(picGraph.get(), x, y, w, h, x, y, w, h); //获取当前子画布上所有的像素值，并根据x、y、w...等参数生成newImg
		picGraph.image(newImg, spx, spy); //每帧移动的速度即为每次错位的量，也就是新图的位置
		image(picGraph, 0, 0);

		count++;
	}

	//海报
	poster();

}

function init() {
	pixelDensity(3); //不然图片错位后会糊，注意：这个要在background之前设置
	background(0);

	image(img, width / 2 - 175, 150);

	picGraph = createGraphics(displayWidth, displayHeight);  //创建子画布
	picGraph.image(img, width / 2 - 175, 150);

	setGrinder();
}

function poster() {
	//海报边框
	noFill();
	stroke(255, 255, 255, 240);
	strokeWeight(2);
	line(width / 2 - 230, 60, width / 2 + 230, 60);
	//rect(width / 2 - 240, 40, 480, height - 240);

	//海报文字
	textStyle(NORMAL);
	textSize(8);
	noStroke();
	fill(255, 255, 255);
	text('Before  Dears  Being  KILLED', 885, 30);
	text('Protect  The  Earth', 517, 683);
	ellipse(940, 50, 9, 9);
	ellipse(960, 50, 9, 9);
	ellipse(980, 50, 9, 9);
	textSize(100);
	text('G', 545, 520);
	textSize(80);
	text('r in', 552, 588);
	text('d', 780, 635);
	fill(198, 157, 79);
	text('e', 850, 655);
	text('r', 925, 645);
	textStyle(BOLD);
	textSize(80);
	noFill();
	strokeWeight(0.5);
	stroke(255, 255, 255, 240);
	text('DEAR', 770, 140);
}

//鼠标滚轮，重置
function mouseWheel() {
	setup();
}