export default saturate

function saturate (imagedata, opts) {
    var i = 0
    var data = imagedata.data
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = +opts.amount || 0
    var r,g,b

    for (; i < len; i += 4) {
        r = (.213 + .787 * amount) * data[i]
            + (.715 - .715 * amount) * data[i + 1]
            + (.072 - .072 * amount) * data[i + 2]
        g = (.213 - .213 * amount) * data[i]
            + (.715 + .285 * amount) * data[i + 1]
            + (.072 - .072 * amount) * data[i + 2]
        b = (.213 - .213 * amount) * data[i]
            + (.715 - .715 * amount) * data[i + 1]
            + (.072 + .928 * amount) * data[i + 2]
        
        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
    }
    return imagedata
}
