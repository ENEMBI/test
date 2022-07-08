export function numberWithCommas(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
export function* shuffle() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var i = array.length;
    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}
