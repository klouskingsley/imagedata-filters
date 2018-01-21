export default invert

// according to https://drafts.fxtf.org/filter-effects/#invertEquivalent

function invert (imagedata, opts) {
    var i = 0
    var data = imagedata.data
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = opts.amount || 0
    var r,g,b

    var tableValues = [+amount, 1 - amount]

    for (; i < len; i += 4) {
        r = getInterpolation(data[i] / 255, tableValues)
        g = getInterpolation(data[i + 1] / 255, tableValues)
        b = getInterpolation(data[i + 2] / 255, tableValues)

        data[i] = r * 255
        data[i + 1] = g * 255
        data[i + 2] = b * 255
    }
    return imagedata
}

function getInterpolation (c, tableValues) {
    if (c === 1) {
        return tableValues[1]
    }

    return tableValues[0] + c * (tableValues[1] - tableValues[0])
}