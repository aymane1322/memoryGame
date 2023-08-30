// Memory Game...
//html Elements variables :
const startGameInputFocus = document.getElementById("name") as HTMLInputElement;
const playNowButton = document.getElementById("playNow") as HTMLButtonElement;
const backGround = document.getElementById("backGround") as HTMLImageElement;
const startGameContainer = document.querySelector(".startGame") as HTMLDivElement;
const gameContainer = document.querySelector(".gameContainer") as HTMLDivElement;
const playerName = document.getElementById("playerName") as HTMLParagraphElement;
const wrongTries = document.getElementById("wrongTries") as HTMLParagraphElement;
const gameImg = document.querySelectorAll(".gameImg") as NodeListOf<Element>;
const gameImgQ = document.querySelectorAll(".gameImgQ") as NodeListOf<Element>;
const onePieceMusice = document.querySelector(".onePiece") as HTMLMediaElement;
const winSound = document.querySelector(".winSound") as HTMLMediaElement;
const failSound = document.querySelector(".failSound") as HTMLMediaElement;
const playerInformation = document.querySelector(".playerInformation") as HTMLDivElement;
const youWin = document.querySelector(".youWin") as HTMLDivElement;
const game = document.querySelector(".game") as HTMLDivElement;
//configuration variables :
let gamerName: string = '';
let wrongTriesCount: number = 0;
let tryCount: number = 1;
let firstPickX: string;
let secendPickX: string;
let isClickable: boolean = true;
let playing: boolean = false;
//start the music
window.addEventListener("DOMContentLoaded", () => {
    onePieceMusice.play();
})
//start game inpute animation :
startGameInputFocus.addEventListener("keyup",e=>{
    if (startGameInputFocus.value !== '') {
        startGameInputFocus.classList.add("startGameInputFocus");
        gamerName = startGameInputFocus.value;
        if (e.key === "Enter") {
            playNowButton.click();
        }
    } else {
        startGameInputFocus.classList.remove("startGameInputFocus");
    }
})
startGameInputFocus.addEventListener("click", _ => {
    startGameInputFocus.classList.remove("required")
})
//play Now logique :
playNowButton.addEventListener("click", _ => {
    winSound.volume = 1;
    failSound.volume = 1;
    if (startGameInputFocus.value !== '') {
        onePieceMusice.play();
        onePieceMusice.volume = 0.1;
        backGround.src = "images/background2.jpg"; //change background img
        startGameContainer.remove(); //remove start game container
        gameContainer.style.display = "flex"; // bring the new phase of the game
        playerName.innerHTML = startGameInputFocus.value;//put the player name in the right place
        wrongTries.innerHTML = String(wrongTriesCount);//put the right amoun of bad trys in the right place
        //first animation logique
        firstAnimation();
    } else {
        startGameInputFocus.classList.add("required")
    }
})
//click pictures logique :
gameImgQ.forEach(gameImgQe => {
    gameImgQe.addEventListener("click", _ => {
        if (playing && isClickable) {
            if (tryCount === 1) {
            firstPickX = (gameImgQe as HTMLImageElement).dataset.x||'';
            tryCount++;
            isClickable = false;
                setTimeout(() => { isClickable = true }, 600);
            } else if (tryCount === 2) {
                isClickable = false;
                setTimeout(() => {isClickable = true},800);
                secendPickX = (gameImgQe as HTMLImageElement).dataset.x || '';
                if (firstPickX === secendPickX) {//if the answer is correct
                    winSound.play();
                setTimeout(() => { (gameImgQe as HTMLImageElement).style.display = "none"; },2000);
                (gameImgQe as HTMLImageElement).classList.add("done")
                gameImgQ.forEach(e => {
                    if ((e as HTMLImageElement).dataset.x === firstPickX) {
                        setTimeout(() => { (e as HTMLImageElement).style.display = "none"; },2000);
                        (e as HTMLImageElement).classList.add("done");
                    }
                })
                winSound.currentTime = 0;
                } else {//if the answer is not correct
                    failSound.play();
                    let currentSize:string = window.getComputedStyle(wrongTries).fontSize
                    wrongTries.style.fontSize = `${parseInt(currentSize)*1.6}px`;
                    setTimeout(()=>{wrongTries.style.fontSize = "clamp(10px,4vw,30px)";},1000)
                    wrongTriesCount++;
                    wrongTries.innerHTML = String(wrongTriesCount);
                    setTimeout(() => cleanUp(), 1300)
                    failSound.currentTime = 0;
            }
            tryCount = 1;
            }
            gameImgQe.classList.add("swapface1");
            gameImgQe.previousElementSibling!.classList.add("swapface1"); 
        }
        //is game ended ?
        endGame();
    })
})
gameImgQ.forEach(gameImgQ=> {
    gameImgQ.addEventListener("animationend", _ => {
        if (playing) {
            gameImgQ.classList.remove("swapface1");
            (gameImgQ as HTMLImageElement).style.visibility = "hidden";
            gameImgQ.previousElementSibling!.classList.add("swapface2");
        }
    })
})
gameImg.forEach(gameImg => {
    gameImg.addEventListener("animationend", _ => {
        if (playing) {
            (gameImg as HTMLImageElement).classList.remove("swapface1");
            (gameImg as HTMLImageElement).classList.remove("swapface2");
        }
    })
})
function cleanUp() {
    gameImgQ.forEach(e => {
        if (!(e as HTMLImageElement).classList.contains("done")) {
            (e as HTMLImageElement).style.visibility = "visible";
        }
    })
}
onePieceMusice.addEventListener("ended", () => {
    onePieceMusice.currentTime = 0;
    onePieceMusice.play();
})
//end game function
function endGame():void {
    if (Array.from(gameImgQ).filter(e => e.classList.contains("done")).length===20) {
        setTimeout(() => {
            random();
            game.style.display = "none";
            youWin.style.display = "flex";
            youWin.addEventListener("click", () => {
            playing = false;
            gameImgQ.forEach(e=> {
                (e as HTMLImageElement).style.display = "";
                (e as HTMLImageElement).style.visibility = "visible";
                (e as HTMLImageElement).classList.remove("done");
            })
            wrongTriesCount = 0;
            wrongTries.innerHTML = String(wrongTriesCount);
            game.style.display = "flex";
            youWin.style.display = "none";
            firstAnimation();
        })
        },1400)
    }
}
//random function
function random():void {
    let arr: number[] = [...Array(20).keys()];
    let temp: number;
    for (let key in arr) {
        let randomNumber: number = Math.floor(Math.random() * 20);
        temp = arr[key];
        arr[key] = arr[randomNumber];
        arr[randomNumber] = temp;
    };
    let imgContainer: HTMLDivElement[] = Array.from(document.querySelectorAll(".imgContainer"));
    for (let key in imgContainer) {
        imgContainer[key].style.order = `${arr[key]}`
    }
}
random();
function firstAnimation() {
    gameImgQ.forEach((e) => {
        (e as HTMLImageElement).classList.add("firstAnimation");
    })
    setTimeout(() => {
        gameImgQ.forEach((e) => {
            (e as HTMLImageElement).classList.remove("firstAnimation");
        })
        playing = true;
    }, 12200)
}