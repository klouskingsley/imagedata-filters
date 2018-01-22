export default sepia

function sepia (imagedata, opts) {
    var i = 0
    var data = imagedata.data
    var len = data.length
    var opts = opts || {amount: 0}
    var amount = +opts.amount || 0
    var r,g,b
    var compleAmount = 1 - amount
    for (; i < len; i += 4) {

        r = (0.393 + 0.607 * compleAmount) * data[i]
            + (0.769 - 0.769 * compleAmount) * data[i + 1]
            + (0.189 - 0.189 * compleAmount) * data[i + 2]
        g = (0.349 - 0.349 * compleAmount) * data[i]
            + (0.684 + 0.314 * compleAmount) * data[i + 1]
            + (0.168 - 0.168 * compleAmount) * data[i + 2]
        b = (0.272 - 0.272 * compleAmount) * data[i]
            + (0.534 - 0.534 * compleAmount) * data[i + 1]
            + (0.131 + 0.869 * compleAmount) * data[i + 2]

        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
    }
    return imagedata
}
