/**
 *
 * Ocean系列-海报3
 * Welting Glacier
 * 
 * 定义glacier功能
 * 
 * 核心原理：
 * 1、柏林噪声可视化，并以鼠标位置为参数进行扰动
 * 2、利用createGraphics生成子画布，再利用 newGraphics.image(moved oldGraphics)即画中画的方法实现图像不断下移的效果，
 * 也可以利用数组将已生成的点的坐标存起来，再以时间为参数统一更新，但是数组较难管理（要加入新的，删除已经移出画面的）
 * 3、当移动速度不是0.5的整数倍时，画面会产生运动模糊（实践所得，原因不明，不过正好作为冰川融化的效果）
 * 4、涉及到translate、rotate时不要忘了push、pop
 *
 */


function glacier() {
  //glacierGraph.background(0); //取消注释，可观察单条曲线
  glacierGraph.push();
  glacierGraph.image(glacierGraph, 0, speed); //画中画，在下面一点的位置上，画出之前的图片
  glacierGraph.translate(0, -85);

  //生成噪声曲线
  let mouseRatio = noise(frameCount / 50, mouseX / 50) * 1.5; //程序运行时间越长，鼠标越往右，噪声越大
  glacierGraph.strokeWeight(1);
  glacierGraph.noFill();
  glacierGraph.stroke(255, map(sin(frameCount / (20 + (1 - mouseRatio) * 500)), -1, 1, 50, 255));
  glacierGraph.beginShape();
  //遍历每一行
  for (let x = -5; x < width; x += 5) { //由于curveVertex首末两个点只是作为guide存在的，并不绘制出来，因此x应从-5而不是0开始，不然左边会空缺一个点的位置
    let y =
      mouseRatio * sin(x / 80 + frameCount / 50) * 50 +
      mouseRatio * sin(x / 20 + frameCount / 50) * 20
      + mouseRatio * noise(x / 100, frameCount / 50)
      * noise(x / 500, frameCount / 50)
      * (map(sin(x /
        (10 + noise(x / 2000, frameCount / 500) * 40)
      ), -1, 1, 0, 1))
      * height / 5 + height / 3
      + noise(x / 50, frameCount / 50) * 100;
    glacierGraph.curveVertex(x, y);

    //低于某一水平线的地方绘制蓝点
    if (y > height * 0.45) {
      glacierGraph.push();
      glacierGraph.noStroke();
      glacierGraph.fill(82 + sin(x) * 50, 1 + sin(x * 1.2 + y / 10) * 50, 220 + sin(x * 1.2) * 30); //rgb(82,1,220)
      glacierGraph.ellipse(x + random(-1, 1), y + random(-1, 1), 5);
      glacierGraph.pop();
    }
  }
  glacierGraph.endShape();
  glacierGraph.pop();

  image(glacierGraph, width / 2 - 250, 25); //画出本次的图片
}
