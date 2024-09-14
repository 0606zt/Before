/**
 *
 * Title海报
 * 
 * 定义bloom类
 * 
 * 核心原理：
 * 1、通过随机噪声生成花朵轮廓
 * 2、使用相乘的色彩模式，并使用lerpColor进行过度
 * 3、color数组除了第一个是颜色，其它都是颜色的十六进制值，这是为了以此为上限生成随机数，再相乘形成灰色
 *
 */


class bloom {
    constructor(x, y, s, r) {
        this.x = x; //花的中心位置
        this.y = y;
        this.s = s; //大小
        this.points = []; //存放轮廓点
        this.noiser = random(1000); //1000个取样点
        for (let i = 0; i < TWO_PI; i += 0.1) {
            let x = cos(i) * s - noise(this.noiser) * this.s / 2;
            let y = sin(i) * s - noise(this.noiser + i) * this.s / 2;
            let point = createVector(x, y);
            this.points.push(point);
            this.noiser += 0.1;
        }
        this.r = r; //旋转
        this.goal = []; //存放轮廓点
        this.color = color(random(colors));
        this.goalColor = color(random(colors));
        //this.wait = 280;
    }

    //更新参数
    update() {
        if (frameCount % 100 == 0) {
            this.noiser = random(1000);
            this.goal = [];
            this.goalColor = color(random(colors));
            for (let i = 0; i < TWO_PI; i += 0.1) {
                let x = cos(i) * this.s - noise(this.noiser) * this.s / 2;
                let y = sin(i) * this.s - noise(this.noiser + i) * this.s / 2;
                let point = createVector(x, y);
                this.goal.push(point);
                this.noiser += 0.1;
            }
        }
        if (frameCount > 50) {
            this.r += 0.001;
            for (let i = 0; i < this.points.length; i++) {
                let v1 = this.points[i];
                let v2 = this.goal[i];
                let v3 = p5.Vector.lerp(v1, v2, 0.02);
                this.points[i] = v3;
            }
        }
    }

    //绘制花朵
    drawBloom() {
        blendMode(MULTIPLY); //色彩模式：相乘
        noStroke();
        if (frameCount > 50) { //控制更新速度
            let from = this.color;
            let to = this.goalColor;
            let inter = lerpColor(from, to, 0.01);
            this.color = inter;
        }
        fill(this.color);
        noStroke();
        push();
        translate(this.x, this.y);
        rotate(this.r);
        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            curveVertex(this.points[i].x, this.points[i].y);
        }
        endShape(CLOSE);
        pop();
    }
}

