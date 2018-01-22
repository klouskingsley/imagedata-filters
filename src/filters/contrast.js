export default contrast

// TODO

function contrast (imagedata, opts) {
    var i = 0
    var data = imagedata.data
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = +opts.amount || 0
    var r,g,b
    var intercept = -(.5 * amount) + .5

    for (; i < len; i += 4) {
        // r = data[i] * amount + intercept
        // g = data[i + 1] * amount + intercept
        // b = data[i + 2] * amount + intercept
        r = 128 + (data[i] - 128) * amount
        g = 128 + (data[i + 1] - 128) * amount
        b = 128 + (data[i + 2] - 128) * amount

        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
    }
    return imagedata
}
