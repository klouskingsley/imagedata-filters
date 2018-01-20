export default sepia

// according to https://drafts.fxtf.org/filter-effects/#sepiaEquivalent

function sepia (imagedata, opts) {
    var i = 0
    var data = imagedata
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = opts.amount || 0
    var r,g,b,a
    for (; i < len; i += 4) {
        r = (0.393 + 0.607 * (1 - amount)) * data[i]
            + (0.769 - 0.769 * (1 - amount)) * data[i + 1]
            + (0.189 - 0.189 * (1 -amount)) * data[i + 2]
            + 0
            + 0
        g = (0.349 - 0.349 * (1 - amount)) * data[i]
            + (0.684 + 0.314 * (1 - amount)) * data[i + 1]
            + (0.168 - 0.168 * (1 - amount)) * data[i + 2]
            + 0
            + 0
        b = (0.272 - 0.272 * (1 - amount)) * data[i]
            + (0.534 - 0.534 * (1 - amount)) * data[i + 1]
            + (0.131 + 0.869 * (1 - amount)) * data[i + 2]
            + 0
            + 0
        a = data[i + 3]

        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = a
    }
    return imagedata
}
