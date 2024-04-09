var numSwitch = 0;
var event = new Event('loop', {
    bubbles: true,
    cancelable: true,
    composed: false
  })
document.addEventListener('DOMContentLoaded', 
() => {

    document.getElementById("guitar").addEventListener("click", () => {
        new Audio('audio/badtothebone.wav').play();
    });

    document.getElementById("loop-id").addEventListener("click", () => {
        if (numSwitch == 0) {
            numSwitch = 1;
            document.getElementById("loop-id").classList.remove("loop");
            document.getElementById("loop-id").classList.add("selected");
            loop();
        } else if (numSwitch == 2) {
            numSwitch = 1;
            document.getElementById("surprise-id").classList.remove("selected");
            document.getElementById("surprise-id").classList.add("surprise");
            document.getElementById("loop-id").classList.remove("loop");
            document.getElementById("loop-id").classList.add("selected");
            loop();
        } else if (numSwitch == 1) {
            numSwitch = 0;
            document.getElementById("loop-id").classList.remove("selected");
            document.getElementById("loop-id").classList.add("loop");
        }
    });
    document.getElementById("surprise-id").addEventListener("click", () => {
        if (numSwitch == 0) {
            numSwitch = 2;
            document.getElementById("surprise-id").classList.remove("surprise");
            document.getElementById("surprise-id").classList.add("selected");
            surprise();
        } else if (numSwitch == 1) {
            numSwitch = 2;
            document.getElementById("loop-id").classList.remove("selected");
            document.getElementById("loop-id").classList.add("loop");
            document.getElementById("surprise-id").classList.remove("surprise");
            document.getElementById("surprise-id").classList.add("selected");
            surprise();
        } else if (numSwitch == 2) {
            numSwitch = 0;
            document.getElementById("surprise-id").classList.remove("selected");
            document.getElementById("surprise-id").classList.add("surprise");
        }
    });
    document.addEventListener("loop", () => {
        loop();
    });
    
}
);

function loop() {
    new Audio('audio/badtothebone.wav').play();
    setTimeout(function(){
        if (numSwitch == 1) {
            document.dispatchEvent(event);
        }
    }, 2600);  
}

function surprise() {

    let rand = Math.floor(Math.random() * 59) + 1;
    let interval = rand * 1000 * 60; 

    setTimeout(function(){
        if (numSwitch == 2) {
            new Audio('audio/badtothebone.wav').play();
            surprise();
        }
    }, interval); 
}