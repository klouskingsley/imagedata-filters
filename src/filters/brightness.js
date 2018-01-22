export default brightness

function brightness (imagedata, opts) {
    var i = 0
    var data = imagedata.data
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = +opts.amount || 0
    var r,g,b,a

    for (; i < len; i += 4) {
        r = data[i] * amount
        g = data[i + 1] * amount
        b = data[i + 2] * amount

        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
    }
    return imagedata    
}