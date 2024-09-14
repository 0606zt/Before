/**
 *
 * Title海报
 * 
 * 定义floating line类
 * 
 * 核心原理：
 * 1、通过随机噪声生成浮动线条
 *
 */


class floatingLine {
    constructor(x, y) {
        this.x = x; //线的起始位置
        this.y = y;
        this.theta = random(1000); //1000个取样点
        this.points = []; //存放点
        for (let x1 = this.x; x1 < this.x + 600; x1++) {
            let y1 = sin(this.theta + (x1 / 100)) * 10;
            let y2 = sin(this.theta) * 10;
            let y3 = this.y + y1 - y2;
            let pointer = createVector(x1, y3);
            this.points.push(pointer);
            this.theta += 0.01;
        }

        this.theta = random(1000);
        this.goal = [];
        for (let x1 = this.x; x1 < this.x + 600; x1++) {
            let y1 = sin(this.theta + (x1 / 100)) * 10;
            let y2 = sin(this.theta) * 10;
            let y3 = this.y + y1 - y2;
            let pointer = createVector(x1, y3);
            let i = x1 - this.x; //由于这个不需要绘制，因此把序号往前减
            this.points[i] = pointer;
            this.theta += 0.01;
        }
    }

    //更新参数
    update() {
        if (frameCount % 100 == 0) {
            this.theta = random(1000);
            this.goal = [];
            for (let x1 = this.x; x1 < this.x + 600; x1++) {
                let y1 = sin(this.theta + (x1 / 100)) * 10;
                let y2 = sin(this.theta) * 10;
                let y3 = this.y + y1 - y2;
                let pointer = createVector(x1, y3);
                let i = x1 - this.x; //由于这个不需要绘制，因此把序号往前减
                this.goal[i] = pointer;
                this.theta += 0.01;
            }
        }
        if (frameCount > 50) { //控制更新速度
            this.r += 0.001
            for (let i = 0; i < this.points.length; i++) {
                let v1 = this.points[i];
                let v2 = this.goal[i];
                let v3 = p5.Vector.lerp(v1, v2, 0.02);
                this.points[i] = v3;
            }
        }
    }

    //绘制线条
    drawLine() {
        noFill();
        strokeWeight(2);
        stroke(100);
        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            curveVertex(this.points[i].x, this.points[i].y);
        }
        endShape();
    }
}