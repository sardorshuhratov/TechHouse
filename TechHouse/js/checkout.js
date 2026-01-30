document.addEventListener("DOMContentLoaded", () => {
    const sumBox = document.getElementById("summary");
    const totalEl = document.getElementById("total");
    const msg = document.getElementById("msg");

    function renderSummary() {
        const cart = Cart.readCart();
        let total = 0;
        sumBox.innerHTML = "";

        if (cart.length === 0) {
            sumBox.innerHTML = "<div class='text-muted'>Savat bo'sh</div>";
            totalEl.textContent = "0";
            return;
        }

        cart.forEach(i => {
            const p = PRODUCTS.find(x => x.id === i.id);
            if (!p) return;

            total += p.price * i.qty;
            sumBox.innerHTML += `<div>${p.name} x${i.qty}</div>`;
        });

        totalEl.textContent = formatSum(total);
    }

    renderSummary();

    document.getElementById("orderBtn").onclick = () => {
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        const cart = Cart.readCart();
        if (cart.length === 0) {
            msg.textContent = "Savat bo'sh. Avval mahsulot qo'shing.";
            msg.className = "text-danger";
            return;
        }

        if (!name || !phone || !address) {
            msg.textContent = "Barcha maydonlarni to'ldiring";
            msg.className = "text-danger";
            return;
        }

        Cart.clearCart();

        msg.textContent = "Buyurtma qabul qilindi ✅ Bosh sahifaga yo'naltirilmoqda...";
        msg.className = "text-success";
        renderSummary();

        setTimeout(() => {
            location.href = "index.html";
        }, 1500);
    };
});
