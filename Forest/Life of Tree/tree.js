/**
 *
 * Forest系列-海报2
 * Life of Tree
 * 
 * 定义tree类
 * 
 * 核心原理：
 * 1、递归
 * 2、每循环一帧画一层树枝，每帧都不要重置背景，
 * 即，留下所有运动痕迹，产生“生长”的效果
 *
 */


class Tree {
  constructor(parent) {
    if (parent === undefined) { //如果没有父类,则为根节点
      this.location = createVector(width / 2, height * 2 / 3);
      this.lastLocation = this.location.copy();
      this.velocity = createVector(0.0, -10);
      this.diameter = random(10.0, 20.0);
      this.isFinished = false;
    }
    else { //如果有父类,则为子节点
      this.location = parent.location.copy();
      this.lastLocation = parent.lastLocation.copy();
      this.velocity = parent.velocity.copy();
      this.diameter = parent.diameter * 0.62;
      parent.diameter = this.diameter;
      this.isFinished = parent.isFinished;
    }
  }

  //更新、绘制
  update() {
    if (this.location.x > -10 & this.location.x < width + 10 & this.location.y > -10 & this.location.y < height + 10) {
      this.lastLocation.set(this.location.x, this.location.y); //记录上一次位置
      if (this.diameter > 0.5) { //值越小，树枝越多
        let bump = createVector(random(-1, 1), random(-1, 1)); //树枝随机偏移量
        this.velocity.normalize(); //速度归一化
        bump.mult(0.2); //偏移量缩放，值越小，树枝越直
        this.velocity.mult(0.8); //速度缩放
        this.velocity.add(bump); //速度加上偏移量
        this.velocity.mult(random(5, 10)); //速度缩放
        this.location.add(this.velocity); //位置加上速度

        if (random(0, 1) < 0.2) {
          treePath.push(new Tree(this)); //创建子节点
        }
      }

      else {
        if (!this.isFinished) { //节点跑完，画叶子
          this.isFinished = true;

          noStroke();
          fill(10, 236, 150, 250); //碎叶
          let rr = random(1, 5);
          ellipse(this.location.x + random(-95, 95), this.location.y + random(-95, 95), rr, rr);

          fill(152, 246, 193, 100); //叶子
          ellipse(this.location.x, this.location.y, 7, 8);

          fill(240, 217, 255, 30); //叶子边缘弱r光
          ellipse(this.location.x, this.location.y, 13, 13);

          stroke(146, 255, 213, 200); //树枝
        }
      }
    }
  }
}

