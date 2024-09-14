/**
 *
 * Animal系列-海报3
 * Die Out
 * 
 * 定义fade out功能
 * 
 * 核心原理：
 * 1、建立图像副本，获取原图像素值以及鼠标位置，计算新的像素值填入副本
 * 注意不能直接修改原图的像素值，因为需要不停地修改，在原图的基础上修改，因此原图不能变
 * 2、与习惯不同，这里外循环是宽，内循环是高，但像素数组的存放依然是按行存放（即外循环是高，内循环是宽），
 * 因此不能使用i+j*width表示某像素在像素数组中的位置，即，应使用get(i,j)而非img.pixels[i+j*width]获取该像素的值
 * 3、利用int(/)使原本色彩平滑连接的图像产生色差区块，程度由p决定
 *
 */


function updatePic() {
    imgCopy.loadPixels();

    //更新图片像素
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {

            let pixelValue = img.get(i, j);

            let r = red(pixelValue);
            let g = green(pixelValue);
            let b = blue(pixelValue);

            let p = map(mouseX, 0, width, 1, 255);

            r = (int(r / p)) * p;
            g = (int(g / p)) * p;
            b = (int(b / p)) * p;
            let c = color(r, g, b);

            imgCopy.set(i, j, c);
        }
    }
    imgCopy.updatePixels();
    image(imgCopy, width / 2 - 255, 25);
}
