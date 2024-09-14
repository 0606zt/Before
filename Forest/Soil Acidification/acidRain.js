/**
 *
 * Forest系列-海报3
 * Soil Acidification
 * 
 * 定义acid rain功能
 * 
 * 包含：
 * 1、画随机雨点
 * 2、生成随机数的一个小trick
 *
 */


function rain(x, y, d) {
  for (let i = 0; i < 10; i++) {
    hues.push(random(40)); //红橙黄色系
  }
  let h = hues[int(noise(x * nScl, y * nScl) * 10)];
  let n = int(random(d));
  for (let i = 0; i < n; i++) {
    let r = random(0, 0.5) * d;
    let a = random(TAU);
    let xx = x + r * cos(a);
    let yy = y + r * sin(a);
    let dd = d * random(random(random()));
    let s = random(70, 100);
    let b = random(80, 100);
    let col = color(h, s, b);
    col.setAlpha(random(random(1)));
    fill(col);
    circle(xx, yy, dd);
  }
}

//直接用random(n)的话，无法实现雨点聚集、滴溅的效果，而是连续的笔刷效果
function randomN(n, t) {
  while (t > 0) {
    n = random(n);
    t--;
  }
  return n;
}


