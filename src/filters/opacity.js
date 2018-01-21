export default opacity

// according to https://drafts.fxtf.org/filter-effects/#opacityEquivalent

function opacity (imagedata, opts) {
    var i = 0
    var data = imagedata.data
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = opts.amount || 0
    var a

    var tableValues = [0, +amount]

    for (; i < len; i += 4) {
        a = getInterpolation(data[i + 3] / 255, tableValues)
        data[i + 3] = a * 255
    }
    return imagedata
}

function getInterpolation (c, tableValues) {
    if (c === 1) {
        return tableValues[1]
    }

    return tableValues[0] + c * (tableValues[1] - tableValues[0])
}