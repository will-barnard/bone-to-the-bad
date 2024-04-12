// CONST
var RIFF = new Audio('audio/badtothebone.wav');
var RIFF_LOOP = new Audio('audio/badtothebone.wav');
RIFF_LOOP.loop = true;

// var
var buttonSwitch = 0;
var sliderVal = 0;
var sliderTick = 0;

// events
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("guitar").addEventListener("click", () => {
        RIFF.play();
    });

    let loop = document.getElementById("loop");
    let surprise = document.getElementById("surprise");

    // controls
    document.getElementById("loop").addEventListener("click", () => {
        if (buttonSwitch == 0) {
            buttonSwitch = 1;
            loop.classList.remove("unselected");
            loop.classList.add("selected");
            loopFunc();
        } else if (buttonSwitch == 2) {
            buttonSwitch = 1;
            surprise.classList.remove("selected");
            surprise.classList.add("unselected");
            loop.classList.remove("unselected");
            loop.classList.add("selected");
            loopFunc();
        } else if (buttonSwitch == 1) {
            buttonSwitch = 0;
            loop.classList.remove("selected");
            loop.classList.add("unselected");
            RIFF_LOOP.pause();
        }
    });
    document.getElementById("surprise").addEventListener("click", () => {
        if (buttonSwitch == 0) {
            buttonSwitch = 2;
            surprise.classList.remove("unselected");
            surprise.classList.add("selected");
            if (RIFF_LOOP.paused != true) {
                RIFF_LOOP.pause();
            }
            surpriseFunc();
        } else if (buttonSwitch == 1) {
            buttonSwitch = 2;
            loop.classList.remove("selected");
            loop.classList.add("unselected");
            surprise.classList.remove("unselected");
            surprise.classList.add("selected");
            surpriseFunc();
        } else if (buttonSwitch == 2) {
            buttonSwitch = 0;
            surprise.classList.remove("selected");
            surprise.classList.add("unselected");
        }
    });

    // volume slider
    document.getElementById("slider").addEventListener("change", ()=> {

        let speaker = document.getElementById("speaker");
        let badDude = document.getElementById("bad-dude");

        sliderVal = document.getElementById("slider").value;
        if (sliderVal == 0) {
            speaker.src = "img/mute.png";
        } else if (sliderVal > 0) {
            speaker.src = "img/speaker.png";
        }
        sliderTick++;
        if (sliderTick > 0 && sliderTick < 2) {
            badDude.classList.remove("hide");
            badDude.classList.add("unhide");
        }
        if (sliderTick > 3) {
            document.getElementById("controls").remove();
            badDude.remove();
            document.getElementById("privileges").classList.remove("hide");
            document.getElementById("privileges").classList.add("unhide");
        }
    });
}
);

// func
function loopFunc() {
    RIFF_LOOP.play(); 
}
function surpriseFunc() {
    let rand = Math.floor(Math.random() * 44) + 16;
    console.log("riff will play in " + rand + " min");
    let interval = rand * 1000 * 60; 
    setTimeout(()=> {
        if (buttonSwitch == 2) {
            RIFF.play();
            surprise();
        }
    }, interval
); 
}