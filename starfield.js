//inspired from https://www.youtube.com/watch?v=17WoOqgXsRM

let speed = 20;

document.getElementById('speed-slider').addEventListener('input', function(e){
    speed = parseInt(e.target.value);
})

class Star {
    constructor(){
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = this.pz = random(width*2);      
    }

    update(){
        this.z = this.z - speed;
        if(this.z < 1){
            this.z = this.pz = width*2;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    show(){
        fill(255);
        noStroke();

        const r = map(this.z, 0, width, 16, 0);
        
        const sx = map(this.x / this.z, 0, 1, 0, width);
        const sy = map(this.y / this.z, 0, 1, 0, height);
        const px = map(this.x / this.pz, 0, 1, 0, width);
        const py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z; 

        stroke(255);
        line(px, py, sx, sy)
    }
}

const stars = [];

function setup(){
    frameRate(30);
    createCanvas(windowWidth, windowHeight);
    canvas.style.position = "fixed";
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.zIndex = -100;
    for(let i = 0; i < 1000; i++){
        stars.push(new Star())
    }
}

function draw(){
    background(0);
    translate(width/2, height/2);
    stars.forEach(star=>{star.update();star.show();});
}

function windowResize(){
    canvasResize(windowWidth, windowHeight)
}
