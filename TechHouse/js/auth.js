document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const msg = document.getElementById("authMsg");

            const p1 = document.getElementById("regPass").value;
            const p2 = document.getElementById("regPass2").value;

            if (p1 !== p2) {
                msg.textContent = "Parollar mos emas!";
                msg.className = "text-danger mt-2";
                return;
            }

            msg.textContent = "Ro'yxatdan o'tildi ✅";
            msg.className = "text-success mt-2";

            setTimeout(() => location.href = "login.html", 800);
        });
    }

    // LOGIN (demo)
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const msg = document.getElementById("authMsg");
            msg.textContent = "Kirish muvaffaqiyatli (demo) ✅";
            msg.className = "text-success mt-2";
            setTimeout(() => location.href = "index.html", 800);
        });
    }
});
