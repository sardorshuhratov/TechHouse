function updateBadge() {
    const el = document.getElementById("cartCount");
    if (el) el.textContent = Cart.cartCount();
}

document.addEventListener("DOMContentLoaded", () => {
    updateBadge();

    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    const p = getProductById(id);
    const box = document.getElementById("productBox");

    if (!p) {
        box.innerHTML = `<div class="alert alert-danger">Mahsulot topilmadi.</div>`;
        return;
    }

    const hasSale = p.oldPrice && p.oldPrice > p.price;

    box.innerHTML = `
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <div class="card card-clean p-2">
          <img class="w-100" style="height:360px;object-fit:cover;border-radius:8px;" src="${p.img}" alt="${p.name}">
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="card card-clean p-3 h-100">
          <h3 class="mb-1">${p.name}</h3>
          <div class="small-muted mb-2">${p.category} • Mavjud: <b>${p.stock}</b></div>

          <div class="mb-2">
            <div class="fs-4 fw-bold">${formatSum(p.price)} so'm</div>
            ${hasSale ? `<div class="small-muted"><del>${formatSum(p.oldPrice)} so'm</del> <span class="text-danger">Aksiya</span></div>` : ``}
          </div>

          <div class="small-muted mb-3">
            Qisqa tavsif: yuqori sifatli, qulay foydalanish, kafolat va servis mavjud.
            Yetkazib berish yoki do'kondan olib ketish (pickup) mumkin.
          </div>

          <div class="d-flex align-items-center gap-2 mb-3">
            <label class="small-muted">Miqdor:</label>
            <button class="btn btn-sm btn-outline-secondary" id="minusBtn">-</button>
            <input id="qtyInput" class="form-control form-control-sm" style="width:70px;" value="1">
            <button class="btn btn-sm btn-outline-secondary" id="plusBtn">+</button>
          </div>

          <div class="d-flex gap-2 mt-auto">
            <button class="btn btn-primary w-100" id="addBtn">Savatga qo'shish</button>
            <a href="cart.html" class="btn btn-outline-secondary">Savat</a>
          </div>

          <div id="msg" class="text-success mt-2"></div>
        </div>
      </div>
    </div>
  `;

    const qtyInput = document.getElementById("qtyInput");
    document.getElementById("minusBtn").onclick = () => {
        let v = Number(qtyInput.value) || 1;
        v = Math.max(1, v - 1);
        qtyInput.value = v;
    };
    document.getElementById("plusBtn").onclick = () => {
        let v = Number(qtyInput.value) || 1;
        v = v + 1;
        qtyInput.value = v;
    };

    document.getElementById("addBtn").onclick = () => {
        let qty = Number(qtyInput.value) || 1;
        if (qty < 1) qty = 1;

        Cart.addToCart(p.id, qty);
        updateBadge();

        const msg = document.getElementById("msg");
        msg.textContent = "Savatga qo'shildi ✅";
        setTimeout(() => msg.textContent = "", 1200);
    };
});
