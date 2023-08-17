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

document.querySelector("button#yapimcilar").addEventListener("click", () => {
    document.querySelector(".perde").style.zIndex = "5";
    document.querySelector(".yapimcilar").style.zIndex = "6";
    document.querySelector(".perde").style.opacity = "1";
    document.querySelector(".yapimcilar").style.scale = "1";
});

document.querySelector(".perde").addEventListener("click", () => {
    document.querySelector(".perde").style.zIndex = "-5";
    document.querySelector(".yapimcilar").style.zIndex = "-6";
    document.querySelector(".perde").style.opacity = "0";
    document.querySelector(".yapimcilar").style.scale = "0";
});

document.querySelector(".yapimcilar .kapat").addEventListener("click", () => {
    document.querySelector(".perde").style.zIndex = "-5";
    document.querySelector(".yapimcilar").style.zIndex = "-6";
    document.querySelector(".perde").style.opacity = "0";
    document.querySelector(".yapimcilar").style.scale = "0";
});

document.querySelectorAll("[copy]").forEach(item => {
    item.addEventListener("click", () => {
        navigator.clipboard.writeText(item.getAttribute("copy"));
        yapimciMesaj("Discord kullanıcı adı panoya kopyalandı!");
    });
});

const yapimciMesaj = (str) => {
    document.querySelector(".yapimcilar .mesaj").innerHTML = str;
    document.querySelector(".yapimcilar .mesaj").style.display = "block";
    setTimeout(() => {
        document.querySelector(".yapimcilar .mesaj").style.display = "none";
    }, 1500);
}

var playing = false;

window.addEventListener("click", () => {
    if (playing) return;
    const musiki = document.createElement("audio");
    musiki.setAttribute("src", "./kaynak/anamenumusiki.wav");
    musiki.volume = .4;
    musiki.setAttribute("autoplay", "autoplay");
    musiki.setAttribute("loop", "loop");
    musiki.style.display = "none";
    musiki.play();
    playing = true;
});