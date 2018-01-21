(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.imagedataFilters = factory());
}(this, (function () { 'use strict';

// according to https://drafts.fxtf.org/filter-effects/#grayscaleEquivalent

function grayscale$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var r,g,b,a;
    for (; i < len; i += 4) {
        r = (0.2126 + 0.7874 * (1 - amount)) * data[i]
            + (0.7152 - 0.7152 * (1 - amount)) * data[i + 1]
            + (0.0722 - 0.0722 * (1 -amount)) * data[i + 2]
            + 0
            + 0;
        g = (0.2126 - 0.2126 * (1 - amount)) * data[i]
            + (0.7152 + 0.2848 * (1 - amount)) * data[i + 1]
            + (0.0722 - 0.0722 * (1 - amount)) * data[i + 2]
            + 0
            + 0;
        b = (0.2126 - 0.2126 * (1 - amount)) * data[i]
            + (0.7152 - 0.7152 * (1 - amount)) * data[i + 1]
            + (0.0722 + 0.9278 * (1 - amount)) * data[i + 2]
            + 0
            + 0;
        a = data[i + 3];

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }
    return imagedata
}

// according to https://drafts.fxtf.org/filter-effects/#saturateEquivalent

function saturate$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata.data;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var r,g,b;

    for (; i < len; i += 4) {
        r = (.213 + .787 * amount) * data[i]
            + (.715 - .715 * amount) * data[i + 1]
            + (.072 - .072 * amount) * data[i + 2];
        g = (.213 - .213 * amount) * data[i]
            + (.715 - .285 * amount) * data[i + 1]
            + (.072 - .072 * amount) * data[i + 2];
        b = (.213 - .213 * amount) * data[i]
            + (.715 - .715 * amount) * data[i + 1]
            + (.072 + .928 * amount) * data[i + 2];
        
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }
    return imagedata
}

// according to https://drafts.fxtf.org/filter-effects/#sepiaEquivalent

function sepia$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var r,g,b,a;
    for (; i < len; i += 4) {
        r = (0.393 + 0.607 * (1 - amount)) * data[i]
            + (0.769 - 0.769 * (1 - amount)) * data[i + 1]
            + (0.189 - 0.189 * (1 -amount)) * data[i + 2]
            + 0
            + 0;
        g = (0.349 - 0.349 * (1 - amount)) * data[i]
            + (0.684 + 0.314 * (1 - amount)) * data[i + 1]
            + (0.168 - 0.168 * (1 - amount)) * data[i + 2]
            + 0
            + 0;
        b = (0.272 - 0.272 * (1 - amount)) * data[i]
            + (0.534 - 0.534 * (1 - amount)) * data[i + 1]
            + (0.131 + 0.869 * (1 - amount)) * data[i + 2]
            + 0
            + 0;
        a = data[i + 3];

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }
    return imagedata
}

/**
 * according to : https://drafts.fxtf.org/filter-effects/#huerotateEquivalent & https://www.w3.org/TR/SVG11/filters.html#feColorMatrixTypeAttribute
 */
function hueRotate$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata.data;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var r,g,b;
    var valueMatric = hueRotateMatrix(amount);

    for (i; i < len; i += 4) {
        r = valueMatric['a00'] * data[i] 
            + valueMatric['a01'] * data[i + 1]
            + valueMatric['a02'] * data[i + 2]
            + 0 + 0;
        g = valueMatric['a10'] * data[i]
            + valueMatric['a11'] * data[i + 1]
            + valueMatric['a12'] * data[i + 2]
            + 0 + 0;
        b = valueMatric['a20'] * data[i]
            + valueMatric['a21'] * data[i + 1]
            + valueMatric['a22'] * data[i + 2];
        
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }
    
    return imagedata
}


/**
 * 
 * @param {*} value 
 * 
 * 
| a00 a01 a02 |    [+0.213 +0.715 +0.072]
| a10 a11 a12 | =  [+0.213 +0.715 +0.072] +
| a20 a21 a22 |    [+0.213 +0.715 +0.072]

                        [+0.787 -0.715 -0.072]
cos(hueRotate value) *  [-0.213 +0.285 -0.072] +
                        [-0.213 -0.715 +0.928]

                        [-0.213 -0.715+0.928]
sin(hueRotate value) *  [+0.143 +0.140-0.283]
                        [-0.787 +0.715+0.072]

 */
function hueRotateMatrix (value) {
    var a00, a01, a02, a10, a11, a12, a20, a21, a22;
    var cosV = Math.cos(value);
    var sinV = Math.sin(value);

    a00 = .213 + cosV * .787 + sinV * (-.213);
    a10 = .213 + cosV * (-.213) + sinV * .143;
    a20 = .213 + cosV * (-.213) + sinV * (-.787);

    a01 = .715 + cosV * (-.715) + sinV * (-.715);
    a11 = .715 + cosV * (.285) + sinV * (.140);
    a21 = .715 + cosV * (-.715) + sinV * (.715);

    a02 = .072 + cosV * (-.072) + sinV * (.928);
    a12 = .072 + cosV * (-.072) + sinV * (-.283);
    a22 = .072 + cosV * (.928) + sinV * (.072);

    return {
        a00: a00,
        a01: a01,
        a02: a02,
        a10: a10,
        a11: a11,
        a12: a12,
        a20: a20,
        a21: a21,
        a22: a22
    }
}

function blur$1 (imagedata, opts) {
    var i,j;
    var data = imagedata.data;
    var width = imagedata.width;
    var height = imagedata.height;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = Math.round(opts.amount) || 0;
    var dotIndex;
    var gaussianDot;


    if (!amount) {
        return imagedata
    }

    var weights = getWeights(amount);

    for (j = 0; j < height; j++) {
        for (i = 0; i < width; i++) {
            dotIndex = i * 4 + j * 4 * width;
            
            gaussianDot = getGaussianDot(i, j, weights, imagedata, amount);

            data[dotIndex] = gaussianDot.r;
            data[dotIndex + 1] = gaussianDot.g;
            data[dotIndex + 2] = gaussianDot.b;
            data[dotIndex + 3] = gaussianDot.a;
        }
    }

    return imagedata
}

function getGaussianDot (x, y, weights, imagedata, amount) {
    var w = imagedata.width;
    var h = imagedata.height;

    var dotIndex = x * 4 + y * 4 * w;
    var tempDotIndex;

    
    var matrixObj = getDotMatrix(x, y, imagedata, amount, weights);
    var dotMatrix = matrixObj.list;
    var allWeights = matrixObj.allweights;

    var ret = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    };

    
    
    for (var i = 0; i < dotMatrix.length; i++) {
        tempDotIndex = dotIndex + dotMatrix[i]['x'] * 4 + dotMatrix[i]['y'] * w * 4;

        ret.r += imagedata.data[tempDotIndex] * dotMatrix[i]['weight'] / allWeights;
        ret.g += imagedata.data[tempDotIndex + 1] * dotMatrix[i]['weight'] / allWeights;
        ret.b += imagedata.data[tempDotIndex + 2] * dotMatrix[i]['weight'] / allWeights;
        ret.a += imagedata.data[tempDotIndex + 3] * dotMatrix[i]['weight'] / allWeights;

    }

    return ret
}


// 获取已目标点为中心的半径为amount的实际weights矩阵
function getDotMatrix (x, y, imagedata, amount, weights) {
    var i,j;
    var ret = [];
    var allweights = 0;

    for (i = -amount; i <= amount; i++) {
        for (j = -amount; j <= amount; j++) {

            // 将周围存在的点推入栈中
            if ((x + i) >= 0 && (x + i) < imagedata.width && (y + j) >= 0 && (y + j) < imagedata.height) {
                ret.push({x: i, y: j, weight: weights[i][j]});
                allweights += weights[i][j];
            }
        }
    }

    return {list: ret, allweights: allweights}
}



function getWeights (amount) {
    var i,j;
    var ret = {};
    for (i = -amount ; i <= amount; i++) {
        ret[i] = {};

        for (j = -amount; j <= amount; j++) {
            ret[i][j] = gaussian(i, j, amount);
        }
    }
    return ret
}

function gaussian (x, y, deviation) {
    var ret = Math.exp(
        - (x * x + y * y) / (2 * deviation * deviation)
    ) /
    (2 * Math.PI * deviation * deviation);
    return ret
}

function brightness$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata.data;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var r,g,b;

    for (; i < len; i += 4) {
        r = data[i] * amount;
        g = data[i + 1] * amount;
        b = data[i + 2] * amount;

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }
    return imagedata    
}

function contrast$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata.data;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var r,g,b;
    var intercept = -(.5 * amount) + .5;

    for (; i < len; i += 4) {
        r = data[i] * amount + intercept;
        g = data[i + 1] * amount + intercept;
        b = data[i + 2] * amount + intercept;

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }
    return imagedata    
}

// according to https://drafts.fxtf.org/filter-effects/#opacityEquivalent

function opacity$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata.data;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var a;

    var tableValues = [0, +amount];

    for (; i < len; i += 4) {
        a = getInterpolation(data[i + 3] / 255, tableValues);
        data[i + 3] = a * 255;
    }
    return imagedata
}

function getInterpolation (c, tableValues) {
    if (c === 1) {
        return tableValues[1]
    }

    return tableValues[0] + c * (tableValues[1] - tableValues[0])
}

// according to https://drafts.fxtf.org/filter-effects/#invertEquivalent

function invert$1 (imagedata, opts) {
    var i = 0;
    var data = imagedata.data;
    var len = data.length;
    var opts = opts || {amount: 0};
    var amount = opts.amount || 0;
    var r,g,b;

    var tableValues = [+amount, 1 - amount];

    for (; i < len; i += 4) {
        r = getInterpolation$1(data[i] / 255, tableValues);
        g = getInterpolation$1(data[i + 1] / 255, tableValues);
        b = getInterpolation$1(data[i + 2] / 255, tableValues);

        data[i] = r * 255;
        data[i + 1] = g * 255;
        data[i + 2] = b * 255;
    }
    return imagedata
}

function getInterpolation$1 (c, tableValues) {
    if (c === 1) {
        return tableValues[1]
    }

    return tableValues[0] + c * (tableValues[1] - tableValues[0])
}

var index = {
    grayscale: grayscale$1,
    saturate: saturate$1,
    sepia: sepia$1,
    hueRotate: hueRotate$1,
    blur: blur$1,
    brightness: brightness$1,
    contrast: contrast$1,
    opacity: opacity$1,
    invert: invert$1
}

return index;

})));
