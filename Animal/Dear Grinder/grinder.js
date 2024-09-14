/**
 *
 * Animal系列-海报1
 * Dear Grinder
 * 
 * 定义grinder功能
 * 
 * 核心原理：
 * 1、由于实现错位需要更新画布上所有的像素值，因此为dear.png单独新建子画布进行操作，
 * 以免影响海报、文字等不需要错位的元素
 * 2、为dear.png单独新建子画布，其大小必须比图像本身大（这里大小设的是display大小），
 * 再新建一个与子画布大小相同的image，存放当前子画布错位后的所有像素，再将该image绘制到子画布上，以此循环，实现不断分割错位的效果
 * 3、通过sp+=sp/abs(sp)实现加速器的效果
 *
 */


//设置x、y、w、h、spx、spy
function setGrinder() {
	//各50%的概率，错位x或者错位y
	if (random() < 0.5) {
		x = int(width / 2 + random(-img.width / 2, img.width / 2));
		y = 0;
		w = ceil(random(20, 60));
		h = height;
		spx = 0;
		spy = int(random(-5, 5));
	}
	else {
		x = 0;
		y = int(height / 2 + random(-img.height / 2, img.height / 2));
		w = width;
		h = ceil(random(20, 60));
		spx = int(random(-5, 5));
		spy = 0;
	}
}

//加速器
function accel() {
	if (spx != 0) spx += spx / abs(spx);
	if (spy != 0) spy += spy / abs(spy);
}

