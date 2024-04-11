var numSwitch = 0;

var riff = new Audio('audio/badtothebone.wav');
var riffLoop = new Audio('audio/badtothebone.wav');
riffLoop.loop = true;

var sliderVal = 0;
var sliderTick = 0;



document.addEventListener('DOMContentLoaded', 
() => {

    document.getElementById("guitar").addEventListener("click", () => {
        riff.play();
    });

    document.getElementById("loop").addEventListener("click", () => {
        if (numSwitch == 0) {
            numSwitch = 1;
            document.getElementById("loop").classList.remove("unselected");
            document.getElementById("loop").classList.add("selected");
            loop();
        } else if (numSwitch == 2) {
            numSwitch = 1;
            document.getElementById("surprise").classList.remove("selected");
            document.getElementById("surprise").classList.add("unselected");
            document.getElementById("loop").classList.remove("unselected");
            document.getElementById("loop").classList.add("selected");
            loop();
        } else if (numSwitch == 1) {
            numSwitch = 0;
            document.getElementById("loop").classList.remove("selected");
            document.getElementById("loop").classList.add("unselected");
            riffLoop.pause();
        }
    });
    document.getElementById("surprise").addEventListener("click", () => {
        if (numSwitch == 0) {
            numSwitch = 2;
            document.getElementById("surprise").classList.remove("unselected");
            document.getElementById("surprise").classList.add("selected");
            if (riffLoop.paused != true) {
                riffLoop.pause();
            }
            surprise();
        } else if (numSwitch == 1) {
            numSwitch = 2;
            document.getElementById("loop").classList.remove("selected");
            document.getElementById("loop").classList.add("unselected");
            document.getElementById("surprise").classList.remove("unselected");
            document.getElementById("surprise").classList.add("selected");
            surprise();
        } else if (numSwitch == 2) {
            numSwitch = 0;
            document.getElementById("surprise").classList.remove("selected");
            document.getElementById("surprise").classList.add("unselected");
        }
    });

    document.getElementById("slider").addEventListener("change", ()=> {
        sliderVal = document.getElementById("slider").value;
        console.log(sliderVal)
        if (sliderVal == 0) {
            document.getElementById("speaker").src = "img/mute.png";
        } else if (sliderVal > 0) {
            document.getElementById("speaker").src = "img/speaker.png";
        }
        sliderTick++;
        if (sliderTick > 4) {
            document.getElementById("bad-dude").classList.remove("hide");
        }
    });
    
}
);

// playing functions

function loop() {
    riffLoop.play(); 
}

function surprise() {

    let rand = Math.floor(Math.random() * 44) + 16;
    console.log("riff will play in " + rand + " min");
    let interval = rand * 1000 * 60; 

    setTimeout(function(){
        if (numSwitch == 2) {
            riff.play();
            surprise();
        }
    }, interval); 
}