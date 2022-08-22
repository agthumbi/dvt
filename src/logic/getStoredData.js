export default function getStoredData(arr, key) {


    if (arr != undefined && arr[key] != undefined)
        return arr[key]
    return []
}
