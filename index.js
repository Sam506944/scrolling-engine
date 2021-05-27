import {textures} from './textures.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const img = new Image();

let mouseX = 0;
let mouseY = 0;

function makeTile(posX, posY, texture) {
    let sourceX = textures[texture][3];
    let sourceY = textures[texture][2];
    let sourceWidth = textures[texture][1];
    let sourceHeight = textures[texture][0];
    let displayX = posX;
    let displayY = posY;
    let displayWidth = map.scale;
    let displayHeight = map.scale;
    context.beginPath();
    context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, displayX, displayY, sourceWidth, sourceHeight);
    img.src = 'spritesheet_complete.png';

}

const map = {
    scale: 64,
    mapX: [0, 1, 2, 0, 1, 2, 0, 1, 2],
    mapY: [0, 0, 0, -1, -1, -1, -2, -2, -2],
    mapT: [247, 247, 247, 247, 247, 247, 249, 249, 249],
    update: function() {
        for (let i = 0; i < this.mapX.length; i++) {
            let posX = this.mapX[i];
            let posY = this.mapY[i];
            let texture = this.mapT[i];
            makeTile((posX - camera.posX) * map.scale, (posY - camera.posY) * map.scale, texture);
        }
    }
}


const player = {
    velocityX: 0,
    velocityY: 0,
    posX: 0,
    posY: 0,
    texture: 159,
    up: false,
    left: false,
    right: false,
    down: false,
    update: function() {
        if (player.up) {
            player.velocityY -= 0.009;
        } if (player.left) {
            player.velocityX += 0.009;
        }  if (player.right) {
            player.velocityX -= 0.009;
        }  if (player.down) {
            player.velocityY += 0.009;
        }
        
        this.velocityX *= 0.8;
        this.velocityY *= 0.8; 
        this.posX += this.velocityX;
        this.posY += this.velocityY;
        makeTile((this.posX - camera.posX) * map.scale, (this.posY - camera.posY) * map.scale, this.texture)
    }
}

const camera = {
    posX: 0,
    posY: 0,
    targetX: 6,
    targetY: 6,
    speed: 0.008,
    update: function() {
        this.posX += (player.posX - this.posX - this.targetX) * this.speed;
        this.posY += (player.posY - this.posY - this.targetY) * this.speed;
    },
}

const editor = {
    posX: 0,
    posY: 0,
    texture: 1,
    update: function() {
        const cameraOffsetX = (camera.posX * map.scale) % map.scale;
        const cameraOffsetY = (camera.posY * map.scale) % map.scale
        this.posX = Math.round(mouseX / map.scale) * map.scale - cameraOffsetX;
        this.posY = Math.round(mouseY / map.scale) * map.scale - cameraOffsetY;
        makeTile(this.posX, this.posY, this.texture);
    }
}


document.onkeydown = function(event) {
    if (event.keyCode === 87) {
        player.up = true;
    } else if (event.keyCode === 68) {
        player.left = true;
    } else if (event.keyCode === 65) {
        player.right = true;
    } else if (event.keyCode === 83) {
        player.down = true;
    }
}

document.onkeyup = function(event) {
    if (event.keyCode === 87) {
        player.up = false;
    } else if (event.keyCode === 68) {
        player.left = false;
    } else if (event.keyCode === 65) {
        player.right = false;
    } else if (event.keyCode === 83) {
        player.down = false;
    } else if (event.keyCode === 13) {
        editor.texture ++;
    }
}

document.onmousemove = function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    // camera.targetX = (canvas.height / 2  + map.scale - event.clientX / 4) / map.scale;
    // camera.targetY = (canvas.width / 2 + map.scale - event.clientY / 4) / map.scale;
}

document.onmousedown = function(event) {  
    map.mapX.push(Math.round((editor.posX / map.scale) + camera.posX))
    map.mapY.push(Math.round((editor.posY / map.scale) + camera.posY))
    map.mapT.push(editor.texture)
}


function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    editor.update();
    map.update();
    player.update();
    camera.update();
}

setInterval(update); 

