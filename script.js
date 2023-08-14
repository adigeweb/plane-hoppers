document.querySelector("button#basla").addEventListener("click", () => {
    location.href = "oyun.html";
});

document.querySelector("button#dukkan").addEventListener("click", () => {
    location.href = "dukkan.html";
});

document.querySelector("button#sifirla").addEventListener("click", () => {
    Swal.fire({
        icon: "warning",
        title: "Oyun Sıfırlama",
        text: "Dikkat! \"Tamam\" butonuna bastığında paran sıfırlanacak ve dükkandan aldığın her şey silinecek!",
        showCancelButton: true
    }).then(res => {
        if (res.isConfirmed) {
            localStorage.setItem("para", 0);
            localStorage.setItem("alinanlar", "none");
            localStorage.removeItem("ucakKostum");
            localStorage.removeItem("engelKostum");
        }
    });
});