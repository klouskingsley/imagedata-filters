# imagedata-filters

imagedata-filters is a JavaScript library to operate canvas imagedata. It similar to [css3 filter function](https://developer.mozilla.org/en-US/docs/Web/CSS/filter).


[中文文档](#%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3)

## Install

Via npm

```
$ npm i imagedata-filters
```

Or download [imagedata-filtes.min.js](https://github.com/klouskingsley/imagedata-filters/raw/master/dist/imagedata-filters.min.js) and include in your HTML

## Usage

```html

<img src="./example/atx.jpg" id="originImg">
<canvas id="filterImg" width="800" height="800">

<script src="./dist/imagedata-filters.min.js"></script>
<script>
    var originImg = document.getElementById('originImg')
    var filterImg = document.getElementById('filterImg')
    var filterCtx = filterImg.getContext('2d')

    filterCtx.drawImage(originImg, 0, 0)

    var imageData = filterCtx.getImageData(0, 0, filterImg.width, filterImg.height), {amount: 1.2}

    imagedataFilters.contrast(imageData, {amount: '1.2'})    // change imageData directly cause imageData.data is readonly

    filterCtx.putImageData(imageData, 0, 0)

</script>

```

## Api

All the apis is similar to css3 filter function, the difference between css3 filter function and imagedata-filters function is that css3 function's argument is a css number value but imagedata-filters function's argument is an object which contains a key `amount` which is relevant to the css number value in css3 filter function.

### .brightness(*imageData*, options)

### .contrast(*imageData*, options)

### .grayscale(*imageData*, options)

### .hueRotate(*imageData*, options)

`options.amount` is a value of radian, this is different from css3 hue-rorate.

### .invert(*imageData*, options)

### .opacity(*imageData*, options)

### .saturate(*imageData*, options)

### .sepia(*imageData*, options)

### .blur(*imageData*, options)

> use `blur` carefully, because Gaussiam blur compute may has a performance issue with the increase of `options.amount`

## License

MIT



# 中文文档

## 安装

通过npm安装

```
$ npm i imagedata-filters
```

或者直接下载[imagedata-filtes.min.js](https://github.com/klouskingsley/imagedata-filters/raw/master/dist/imagedata-filters.min.js)并嵌入你的HTML页面中

## 使用

```html

<img src="./example/atx.jpg" id="originImg">
<canvas id="filterImg" width="800" height="800">

<script src="./dist/imagedata-filters.min.js"></script>
<script>
    var originImg = document.getElementById('originImg')
    var filterImg = document.getElementById('filterImg')
    var filterCtx = filterImg.getContext('2d')

    filterCtx.drawImage(originImg, 0, 0)

    var imageData = filterCtx.getImageData(0, 0, filterImg.width, filterImg.height), {amount: 1.2}

    imagedataFilters.contrast(imageData, {amount: '1.2'})    // 因为imageData.data是只读的，所以这里会直接修改imageData.data

    filterCtx.putImageData(imageData, 0, 0)

</script>

```

## Api

所有的api都和css3 filter中的函数类似，不同的是，css3 fitler函数的参数是一个css数值, 而imagedata-filters函数中的`options`是一个对象，它有一个`amount`的key，对应着css3 filter里面的那个参数.

### .brightness(*imageData*, options)

### .contrast(*imageData*, options)

### .grayscale(*imageData*, options)

### .hueRotate(*imageData*, options)

`options.amount`是一个弧度值，这一点与css3 hue-rorate不同。

### .invert(*imageData*, options)

### .opacity(*imageData*, options)

### .saturate(*imageData*, options)

### .sepia(*imageData*, options)

### .blur(*imageData*, options)

> 使用`blur`时注意，因为随着`options.amount`的增大，高斯模糊的计算可能会有性能问题.


## License

MIT