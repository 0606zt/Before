/**
 *
 * Ocean系列-海报1
 * Coral Decay
 * 
 * 定义coral类
 * 
 * 核心原理：
 * 1、每帧生成一个小球并存入数组，随着时间推移改变小球的位置和大小；每帧绘制所有小球，
 * 同时，将画布设为半透明，即可产生珊瑚不停生长的效果，且具有渐隐的效果
 * 2、即时删除半径减小到0的小球，以免空间爆炸（现控制在200左右）
 * 3、利用map，将小球的y坐标投射到0~size上，实现颜色层次的渐变
 * 4、控制生成速度的另一种方法：指定帧数frameRate
 *
 */


class Coral {
    constructor(x, y, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedX = 0;
        this.speedY = 0;
        this.size = size;
        this.r = 0;
        this.distance = 0;
    }

    //更新位置
    move() {
        this.speedX += (random() - 0.5) / 2;
        this.speedY += (random() - 0.55) / 2;
        this.x += this.speedX;
        this.y += this.speedY;
        this.distance = int(dist(this.x, this.y, this.centerX, this.centerY)); //计算小球到珊瑚中心的距离
        this.r = (1 - this.distance / this.size) * this.size / 8; //根据距离决定小球的大小
    }

    //绘制单个小球
    drawCoral() {
        if (!isPressed) { //鼠标没按时是HSB
            colorMode(HSB);
        }
        noStroke();
        if (this.r > 0) {
            fill(332, map(this.y - (this.centerY - this.size), 0, this.size, -30, 80), 78, 200); //产生不同层次的渐变色
            ellipse(this.x, this.y, this.r, this.r);
        }
    }
}
