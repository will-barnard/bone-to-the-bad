// CONST
var RIFF = new Audio('audio/badtothebone.wav');
var RIFF_LOOP = new Audio('audio/badtothebone.wav');
RIFF_LOOP.loop = true;

// var
var buttonSwitch = 0;
var sliderVal = 0;
var sliderTick = 0;
var surpriseBool = false;
var surpriseGroupBool = false;
var surpriseTime;

// events
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("guitar").addEventListener("click", () => {
        RIFF.play();
    });

    let loop = document.getElementById("loop");
    let surprise = document.getElementById("surprise");
    let surpriseGroup = document.getElementById("surprise-group");

    // controls
    document.getElementById("loop").addEventListener("click", () => {
        if (buttonSwitch == 0) {
            buttonSwitch = 1;
            loop.classList.remove("unselected");
            loop.classList.add("selected");
            loopFunc();
        } else if (buttonSwitch == 2) {
            buttonSwitch = 1;
            surpriseBool = false;
            surprise.classList.remove("selected");
            surprise.classList.add("unselected");
            loop.classList.remove("unselected");
            loop.classList.add("selected");
            loopFunc();
        } else if (buttonSwitch == 3) {
            buttonSwitch = 1;
            surpriseGroupBool = false;
            surpriseGroup.classList.remove("selected");
            surpriseGroup.classList.add("unselected");
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
            if (RIFF_LOOP.paused != true) {
                RIFF_LOOP.pause();
            }
            loop.classList.remove("selected");
            loop.classList.add("unselected");
            surprise.classList.remove("unselected");
            surprise.classList.add("selected");
            surpriseFunc();
        } else if (buttonSwitch == 3) {
            buttonSwitch = 2;
            surpriseGroupBool = false;
            surpriseGroup.classList.remove("selected");
            surpriseGroup.classList.add("unselected");
            surprise.classList.remove("unselected");
            surprise.classList.add("selected");
            surpriseFunc();
        } else if (buttonSwitch == 2) {
            buttonSwitch = 0;
            surpriseBool = false;
            surprise.classList.remove("selected");
            surprise.classList.add("unselected");
        }
    });
    document.getElementById("surprise-group").addEventListener("click", () => {
        if (buttonSwitch == 0) {
            console.log("test");
            buttonSwitch = 3;
            surpriseGroup.classList.remove("unselected");
            surpriseGroup.classList.add("selected");
            surpriseGroupFunc();
        } else if (buttonSwitch == 1) {
            buttonSwitch = 3;
            loop.classList.remove("selected");
            loop.classList.add("unselected");
            surpriseGroup.classList.remove("unselected");
            surpriseGroup.classList.add("selected");
            surpriseGroupFunc();
        } else if (buttonSwitch == 2) {
            buttonSwitch = 3;
            surpriseBool = false;
            surprise.classList.remove("selected");
            surprise.classList.add("unselected");
            surpriseGroup.classList.remove("unselected");
            surpriseGroup.classList.add("selected");
            surpriseGroupFunc();
        } else if (buttonSwitch == 3) {
            buttonSwitch = 0;
            surpriseGroup.classList.remove("selected");
            surpriseGroup.classList.add("unselected");
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
    surpriseBool = true;
    surprise(surpriseBool)
}
function surprise(bool) {
    if (bool) {
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
}
function surpriseGroupFunc() {
    RIFF.play()
    console.log("surprise group");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://brewsterdsm.ddns.net:49156/get");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        surpriseTime = new Date(xhr.response);
        let interval = surpriseTime - Date.now();
        interval  = (interval) - (5 * 60 * 60 * 1000);
        console.log("riff will play in " + (interval / 60 / 1000) + " min");
        console.log("riff will play in " + (interval) + " miliseconds");
        setTimeout( ()=> {
            if (buttonSwitch == 3) {
                RIFF.play();
                surpriseGroupFunc();
            }
        }, interval);
    } else {
        console.log(`Error: ${xhr.status}`);
    }
};
}