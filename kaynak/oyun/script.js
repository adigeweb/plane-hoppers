const oyuncu = document.querySelector(".oyuncu");
const yer = document.querySelector(".yer");

const mesajlar = [
    "biraz daha çalış",
    "eh fena değil",
    "iyi gidiyorsun",
    "yapıyosun bu işi"
];

const getCSSRule = (ruleName) => {
    ruleName = ruleName.toLowerCase();
    var result = null;
    var find = Array.prototype.find;

    find.call(document.styleSheets, styleSheet => {
        result = find.call(styleSheet.cssRules, cssRule => {
            return cssRule instanceof CSSStyleRule 
                && cssRule.selectorText.toLowerCase() == ruleName;
        });
        return result != null;
    });
    return result;
}

window.addEventListener("load", () => {
    oyuncu.style.top = "10%";
    if (localStorage.getItem("ucakKostum") && localStorage.getItem("alinanlar").includes(btoa(localStorage.getItem("ucakKostum")))) {
        oyuncu.style.background = `url("../kaynak/${localStorage.getItem("ucakKostum")}")`;
        oyuncu.style.backgroundSize = "100% 100%";
    }
    if (localStorage.getItem("engelKostum") && localStorage.getItem("alinanlar").includes(btoa(localStorage.getItem("engelKostum")))) {
        getCSSRule(".bariyer .ust, .bariyer .alt").style.background = `url("../${localStorage.getItem("engelKostum")}")`;
        getCSSRule(".bariyer .ust, .bariyer .alt").style.backgroundSize = "100% 100%";
    }
});

document.body.addEventListener("keydown", (event) => {
    if (!game.started) game.loop(20);
    if (event.keyCode === 32) {
        game.jumping = true;
        clearInterval(game.jumpTimeout);
        game.jumpTimeout = setTimeout(() => { game.jumping = false }, screen.height / 5);
    }
});

window.addEventListener("touchstart", () => {
    if (!game.started) game.loop(20);
    game.jumping = true;
    clearInterval(game.jumpTimeout);
    game.jumpTimeout = setTimeout(() => { game.jumping = false }, screen.height / 5);
});

window.addEventListener("click", () => {
    if (!game.started) game.loop(20);
    game.jumping = true;
    clearInterval(game.jumpTimeout);
    game.jumpTimeout = setTimeout(() => { game.jumping = false }, screen.height / 5);
});

class Update {
    constructor(script) {
        this.script = script;
        this.frame = 0;
        this.jumpTimeout;
        this.score = 0;
    }
    loop(delay) {
        this.gameLoop = setInterval(this.script, delay);
        this.started = true;
        this.jumping = false;
    }
    over(callback) {
        clearInterval(this.gameLoop);
        callback(this.score);
    }
}

function touches(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}

const game = new Update(
    () => {
        game.frame++;
        if (!touches(oyuncu, yer) && !game.jumping) oyuncu.style.top = (parseInt(oyuncu.style.top.replace("%", "")) + 1).toString() + "%";
        if (game.jumping) oyuncu.style.top = (parseInt(oyuncu.style.top.replace("%", "")) - 1).toString() + "%";
        if (touches(oyuncu, yer)) {
            game.over((puan) => {
                document.querySelector(".kaybettin #sonPuan").innerText = `Skor: ${puan}`;
                document.querySelector(".oyuncu").style.background = "url(\"./kaynak/patlama.png\")";
                if (puan < 4) {
                    document.querySelector(".kaybettin #mesaj").innerText = mesajlar[0];
                }
                else if (puan < 7) {
                    document.querySelector(".kaybettin #mesaj").innerText = mesajlar[1];
                }
                else if (puan < 10) {
                    document.querySelector(".kaybettin #mesaj").innerText = mesajlar[2];
                }
                else if (puan > 10) {
                    document.querySelector(".kaybettin #mesaj").innerText = mesajlar[3];
                }
                document.querySelector(".kaybettin").style.display = "flex";
                if (!localStorage.getItem("para")) {
                    localStorage.setItem("para", "0");
                }
                const mevcutPara = localStorage.getItem("para");
                localStorage.setItem("para", new String(parseInt(mevcutPara) + puan));
            });
        }
        if (game.frame % 75 == 0) {
            const engel = document.createElement("div");
            engel.className = "bariyer";
            const ust = document.createElement("div");
            ust.className = "ust";
            const alt = document.createElement("div");
            alt.className = "alt";
            engel.style.left = "100vw";
            engel.style.bottom = (Math.floor(Math.random() * 40) - 35).toString() + "%";
            engel.appendChild(ust);
            engel.appendChild(alt);
            document.body.appendChild(engel);
        }
        const bariyerler = document.querySelectorAll(".bariyer");
        if (bariyerler) {
            bariyerler.forEach(item => {
                item.style.left = (parseInt(item.style.left.replace("vw", "")) - 1).toString() + "vw";
                if (item.style.left.replace("vw", "") < 0) {
                    item.remove();
                }
                if ((parseInt(item.style.left.replace("vw", "")) + 5) < 20) {
                    if (!item.getAttribute("gecti")) {
                        item.setAttribute("gecti", true);
                        game.score++;
                    }
                }
            });
            document.querySelectorAll(".bariyer .ust").forEach(item => {
                if (touches(item, oyuncu)) {
                    game.over((puan) => {
                        document.querySelector(".kaybettin #sonPuan").innerText = `Skor: ${puan}`;
                        document.querySelector(".oyuncu").style.background = "url(\"./kaynak/patlama.png\")";
                        if (puan < 4) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[0];
                        }
                        else if (puan < 7) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[1];
                        }
                        else if (puan < 10) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[2];
                        }
                        else if (puan > 10) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[3];
                        }
                        document.querySelector(".kaybettin").style.display = "flex";
                        if (!localStorage.getItem("para")) {
                            localStorage.setItem("para", "0");
                        }
                        const mevcutPara = localStorage.getItem("para");
                        localStorage.setItem("para", new String(parseInt(mevcutPara) + puan));
                    });
                }
            });
            document.querySelectorAll(".bariyer .alt").forEach(item => {
                if (touches(item, oyuncu)) {
                    game.over((puan) => {
                        document.querySelector(".kaybettin #sonPuan").innerText = `Skor: ${puan}`;
                        document.querySelector(".oyuncu").style.background = "url(\"./kaynak/patlama.png\")";
                        if (puan < 4) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[0];
                        }
                        else if (puan < 7) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[1];
                        }
                        else if (puan < 10) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[2];
                        }
                        else if (puan > 10) {
                            document.querySelector(".kaybettin #mesaj").innerText = mesajlar[3];
                        }
                        document.querySelector(".kaybettin").style.display = "flex";
                        if (!localStorage.getItem("para")) {
                            localStorage.setItem("para", "0");
                        }
                        const mevcutPara = localStorage.getItem("para");
                        localStorage.setItem("para", new String(parseInt(mevcutPara) + puan));
                    });
                }
            });
        }
        document.querySelector(".puan span").innerHTML = game.score;
    }
);

document.querySelector(".kaybettin button#tekrar").addEventListener("click", () => {
    location.reload();
});

document.querySelector(".kaybettin button#menu").addEventListener("click", () => {
    location.href = "./";
});
