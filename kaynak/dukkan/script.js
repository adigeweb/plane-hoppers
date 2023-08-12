window.addEventListener("load", () => {
    document.querySelector("p.para span#sayi").innerText = localStorage.getItem("para");
});

document.querySelectorAll(".kutu button.al").forEach(btn => {
    if (!localStorage.getItem("alinanlar")) localStorage.setItem("alinanlar", "none");
    if (!localStorage.getItem("para")) localStorage.setItem("para", "0");
    if (localStorage.getItem("alinanlar").split(",").includes(btoa(btn.getAttribute("esya")))) {
        if (localStorage.getItem(`${btn.getAttribute("tur")}Kostum`) === btn.getAttribute("esya")) {
            btn.innerText = "Mevcut";
            btn.style.background = "limegreen";
            btn.addEventListener("click", () => {
                localStorage.setItem(`${btn.getAttribute("tur")}Kostum`, "");
                location.reload();
            });
        }
        else {
            btn.innerText = "Kullan";
            btn.addEventListener("click", () => {
                localStorage.setItem(`${btn.getAttribute("tur")}Kostum`, btn.getAttribute("esya"));
                location.reload();
            });
        }
    }
    else {
        btn.addEventListener("click", () => {
            fetch("../kaynak/veri/index.json")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data[btn.getAttribute("esya")]["fiyat"] <= localStorage.getItem("para")) {
                    localStorage.setItem("alinanlar", localStorage.getItem("alinanlar") + "," + btoa(btn.getAttribute("esya")));
                    localStorage.setItem("para", localStorage.getItem("para") - data[btn.getAttribute("esya")]["fiyat"]);
                    location.reload();
                }
                else {
                    alert("Yetersiz para :(");
                }
            }).catch(err => console.error(err));
        });
    }
});