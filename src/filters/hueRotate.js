export default hueRotate

function hueRotate (imagedata, opts) {
    var i = 0
    var data = imagedata.data
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = +opts.amount || 0
    var r,g,b,a
    var valueMatric = hueRotateMatrix(amount)

    for (i; i < len; i += 4) {
        r = valueMatric['a00'] * data[i] 
            + valueMatric['a01'] * data[i + 1]
            + valueMatric['a02'] * data[i + 2]
            + 0 + 0
        g = valueMatric['a10'] * data[i]
            + valueMatric['a11'] * data[i + 1]
            + valueMatric['a12'] * data[i + 2]
            + 0 + 0
        b = valueMatric['a20'] * data[i]
            + valueMatric['a21'] * data[i + 1]
            + valueMatric['a22'] * data[i + 2]
        
        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
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
    var a00, a01, a02, a10, a11, a12, a20, a21, a22
    var cosV = Math.cos(value)
    var sinV = Math.sin(value)

    a00 = .213 + cosV * .787 + sinV * (-.213)
    a10 = .213 + cosV * (-.213) + sinV * .143
    a20 = .213 + cosV * (-.213) + sinV * (-.787)

    a01 = .715 + cosV * (-.715) + sinV * (-.715)
    a11 = .715 + cosV * (.285) + sinV * (.140)
    a21 = .715 + cosV * (-.715) + sinV * (.715)

    a02 = .072 + cosV * (-.072) + sinV * (.928)
    a12 = .072 + cosV * (-.072) + sinV * (-.283)
    a22 = .072 + cosV * (.928) + sinV * (.072)

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