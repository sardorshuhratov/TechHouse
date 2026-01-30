document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("navSearch");
    const badge = document.getElementById("cartCount");

    if (badge && window.Cart) {
        badge.textContent = Cart.cartCount();
    }

    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const q = input.value.trim();
                if (q) {
                    location.href = "products.html?search=" + encodeURIComponent(q);
                }
            }
        });
    }
});
