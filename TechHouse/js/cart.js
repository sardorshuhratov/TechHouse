const CART_KEY = "techhouse_cart_v3";

function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
}
function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, qty = 1) {
    const cart = readCart();
    const item = cart.find(x => x.id === id);
    if (item) item.qty += qty;
    else cart.push({ id, qty });
    writeCart(cart);
}

function inc(id) {
    addToCart(id, 1);
}
function dec(id) {
    const cart = readCart();
    const item = cart.find(x => x.id === id);
    if (!item) return;
    item.qty -= 1;
    const next = item.qty <= 0 ? cart.filter(x => x.id !== id) : cart;
    writeCart(next);
}

function removeItem(id) {
    writeCart(readCart().filter(x => x.id !== id));
}
function clearCart() {
    localStorage.removeItem(CART_KEY);
}
function cartCount() {
    return readCart().reduce((s, x) => s + x.qty, 0);
}

window.Cart = { readCart, addToCart, inc, dec, removeItem, clearCart, cartCount };
