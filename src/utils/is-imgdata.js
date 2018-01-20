export default isImgData

function isImgData (data) {
    return Array.isArray(data) && !(data.length % 4)
}
