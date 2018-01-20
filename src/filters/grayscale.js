export default grayscale

// according to https://drafts.fxtf.org/filter-effects/#grayscaleEquivalent

function grayscale (imagedata, opts) {
    var i = 0
    var data = imagedata
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = opts.amount || 0
    var r,g,b,a
    for (; i < len; i += 4) {
        r = (0.2126 + 0.7874 * (1 - amount)) * data[i]
            + (0.7152 - 0.7152 * (1 - amount)) * data[i + 1]
            + (0.0722 - 0.0722 * (1 -amount)) * data[i + 2]
            + 0
            + 0
        g = (0.2126 - 0.2126 * (1 - amount)) * data[i]
            + (0.7152 + 0.2848 * (1 - amount)) * data[i + 1]
            + (0.0722 - 0.0722 * (1 - amount)) * data[i + 2]
            + 0
            + 0
        b = (0.2126 - 0.2126 * (1 - amount)) * data[i]
            + (0.7152 - 0.7152 * (1 - amount)) * data[i + 1]
            + (0.0722 + 0.9278 * (1 - amount)) * data[i + 2]
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
