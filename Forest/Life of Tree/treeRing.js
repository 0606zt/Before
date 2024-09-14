/**
 *
 * Forest系列-海报2
 * Life of Tree
 * 
 * 定义tree ring功能
 * 
 * 核心原理：
 * 1、在圆的基础上产生偏值offset，形成年轮的不规则性
 *
 */


function treeRing(x, y) {
  noFill();
  strokeWeight(0.2);
  let d = 0;
  let n = int(random(200, 280))
  for (let i = 0; i < n; i++) {
    stroke(i / n * 255);
    beginShape();
    for (let a = 0; a < TAU; a += TAU / 360) {
      let offx = norm(cos(a), -1, 1) * 1;//产生不规则性
      let offy = norm(sin(a), -1, 1) * 1;
      let r = map(noise(x + offx, y + offy), 0, 1, 0.25, 1) * d / 55;
      let xx = x + r * cos(a);
      let yy = y + r * sin(a);
      vertex(xx, yy);
    }
    endShape();
    d += random(random(random(random(300)))) + 4;//年轮半径增量
  }
}
