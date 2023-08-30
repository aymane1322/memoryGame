"use strict";
const startGameInputFocus = document.getElementById("name");
const playNowButton = document.getElementById("playNow");
const backGround = document.getElementById("backGround");
const startGameContainer = document.querySelector(".startGame");
const gameContainer = document.querySelector(".gameContainer");
const playerName = document.getElementById("playerName");
const wrongTries = document.getElementById("wrongTries");
const gameImg = document.querySelectorAll(".gameImg");
const gameImgQ = document.querySelectorAll(".gameImgQ");
const onePieceMusice = document.querySelector(".onePiece");
const winSound = document.querySelector(".winSound");
const failSound = document.querySelector(".failSound");
const playerInformation = document.querySelector(".playerInformation");
const youWin = document.querySelector(".youWin");
const game = document.querySelector(".game");
let gamerName = '';
let wrongTriesCount = 0;
let tryCount = 1;
let firstPickX;
let secendPickX;
let isClickable = true;
let playing = false;
window.addEventListener("DOMContentLoaded", () => {
    onePieceMusice.play();
});
startGameInputFocus.addEventListener("keyup", e => {
    if (startGameInputFocus.value !== '') {
        startGameInputFocus.classList.add("startGameInputFocus");
        gamerName = startGameInputFocus.value;
        if (e.key === "Enter") {
            playNowButton.click();
        }
    }
    else {
        startGameInputFocus.classList.remove("startGameInputFocus");
    }
});
startGameInputFocus.addEventListener("click", _ => {
    startGameInputFocus.classList.remove("required");
});
playNowButton.addEventListener("click", _ => {
    winSound.volume = 1;
    failSound.volume = 1;
    if (startGameInputFocus.value !== '') {
        onePieceMusice.play();
        onePieceMusice.volume = 0.1;
        backGround.src = "images/background2.jpg";
        startGameContainer.remove();
        gameContainer.style.display = "flex";
        playerName.innerHTML = startGameInputFocus.value;
        wrongTries.innerHTML = String(wrongTriesCount);
        firstAnimation();
    }
    else {
        startGameInputFocus.classList.add("required");
    }
});
gameImgQ.forEach(gameImgQe => {
    gameImgQe.addEventListener("click", _ => {
        if (playing && isClickable) {
            if (tryCount === 1) {
                firstPickX = gameImgQe.dataset.x || '';
                tryCount++;
                isClickable = false;
                setTimeout(() => { isClickable = true; }, 600);
            }
            else if (tryCount === 2) {
                isClickable = false;
                setTimeout(() => { isClickable = true; }, 800);
                secendPickX = gameImgQe.dataset.x || '';
                if (firstPickX === secendPickX) {
                    winSound.play();
                    setTimeout(() => { gameImgQe.style.display = "none"; }, 2000);
                    gameImgQe.classList.add("done");
                    gameImgQ.forEach(e => {
                        if (e.dataset.x === firstPickX) {
                            setTimeout(() => { e.style.display = "none"; }, 2000);
                            e.classList.add("done");
                        }
                    });
                    winSound.currentTime = 0;
                }
                else {
                    failSound.play();
                    let currentSize = window.getComputedStyle(wrongTries).fontSize;
                    wrongTries.style.fontSize = `${parseInt(currentSize) * 1.6}px`;
                    setTimeout(() => { wrongTries.style.fontSize = "clamp(10px,4vw,30px)"; }, 1000);
                    wrongTriesCount++;
                    wrongTries.innerHTML = String(wrongTriesCount);
                    setTimeout(() => cleanUp(), 1300);
                    failSound.currentTime = 0;
                }
                tryCount = 1;
            }
            gameImgQe.classList.add("swapface1");
            gameImgQe.previousElementSibling.classList.add("swapface1");
        }
        endGame();
    });
});
gameImgQ.forEach(gameImgQ => {
    gameImgQ.addEventListener("animationend", _ => {
        if (playing) {
            gameImgQ.classList.remove("swapface1");
            gameImgQ.style.visibility = "hidden";
            gameImgQ.previousElementSibling.classList.add("swapface2");
        }
    });
});
gameImg.forEach(gameImg => {
    gameImg.addEventListener("animationend", _ => {
        if (playing) {
            gameImg.classList.remove("swapface1");
            gameImg.classList.remove("swapface2");
        }
    });
});
function cleanUp() {
    gameImgQ.forEach(e => {
        if (!e.classList.contains("done")) {
            e.style.visibility = "visible";
        }
    });
}
onePieceMusice.addEventListener("ended", () => {
    onePieceMusice.currentTime = 0;
    onePieceMusice.play();
});
function endGame() {
    if (Array.from(gameImgQ).filter(e => e.classList.contains("done")).length === 20) {
        setTimeout(() => {
            random();
            game.style.display = "none";
            youWin.style.display = "flex";
            youWin.addEventListener("click", () => {
                playing = false;
                gameImgQ.forEach(e => {
                    e.style.display = "";
                    e.style.visibility = "visible";
                    e.classList.remove("done");
                });
                wrongTriesCount = 0;
                wrongTries.innerHTML = String(wrongTriesCount);
                game.style.display = "flex";
                youWin.style.display = "none";
                firstAnimation();
            });
        }, 1400);
    }
}
function random() {
    let arr = [...Array(20).keys()];
    let temp;
    for (let key in arr) {
        let randomNumber = Math.floor(Math.random() * 20);
        temp = arr[key];
        arr[key] = arr[randomNumber];
        arr[randomNumber] = temp;
    }
    ;
    let imgContainer = Array.from(document.querySelectorAll(".imgContainer"));
    for (let key in imgContainer) {
        imgContainer[key].style.order = `${arr[key]}`;
    }
}
random();
function firstAnimation() {
    gameImgQ.forEach((e) => {
        e.classList.add("firstAnimation");
    });
    setTimeout(() => {
        gameImgQ.forEach((e) => {
            e.classList.remove("firstAnimation");
        });
        playing = true;
    }, 12200);
}
//# sourceMappingURL=index.js.map