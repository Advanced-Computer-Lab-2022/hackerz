function priceAsc(a,b) {
    return parseInt(a.price, 10) - parseInt(b.price, 10);
}

function priceDesc(a,b) {
    return parseInt(b.price, 10) - parseInt(a.price, 10);
}

module.exports = { priceAsc, priceDesc }