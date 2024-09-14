/**
 *
 * Forest系列-海报3
 * Soil Acidification
 * 
 * 定义leaf功能
 * 
 * 核心原理：
 * 1、分形结构（IFS码仿射变换 https://zhuanlan.zhihu.com/p/50466718?utm_id=0 ）
 * 公式：x(0)=0  y(0)=0
 *       x(n)=a*x(n-1)+b*y(n-1)+e   y(n)=c*x(n-1)+d*y(n-1)+f
 * 2、每帧内循环rate次，每次产生随机点，
 * 点不断叠加，形成叶子渐渐浮现效果（与LifeofTree一样，每帧也不需要重置背景）
 * 3、将颜色模式设为HSB利于实现颜色渐变
 *
 */


function leaf() {
  colorMode(HSB);
  stroke(c, 60, 100, 0.1);
  strokeWeight(0.5);

  //rate越大，叶子浮现得越快
  for (let i = 0; i < rate; i++) {
    let tx = 0;
    let ty = 0;
    point(x * r + width * 0.51 - 50, height * 0.73 - y * r);

    //进行分形，IFS码设计如下：
    //a = [0, 0.2, -0.15, 0.85]
    //b = [0, -0.26, 0.28, 0.04]
    //c = [0, 0.23, 0.26, -0.04]
    //d = [0.16, 0.22, 0.44, 0.85]
    //e = [0, 0, 0, 0]
    //f = [0, 1.6, 0.44, 1.6]
    //p = [0, 0.07, 0.07, 0.85]
    let sw = random(100);
    if (sw > 15) {
      tx = 0.85 * x + 0.04 * y;
      ty = -0.04 * x + 0.85 * y + 1.6;
    } else if (sw > 8) {
      tx = -0.15 * x + 0.28 * y;
      ty = 0.26 * x + 0.24 * y + 0.44;
    } else if (sw > 1) {
      tx = 0.2 * x - 0.26 * y;
      ty = 0.23 * x + 0.22 * y + 1.6;
    } else {
      tx = 0;
      ty = y * 0.16;
    }
    x = tx;
    y = ty;
  }
  c -= 0.2; //颜色渐变
}
