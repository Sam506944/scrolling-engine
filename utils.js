import { editorLoop } from './editor.js';
import { gameLoop } from './game.js';

export const canvas = document.getElementById('canvas');
export const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 650;
canvas.style.cursor = 'none';

const img = new Image();

let mode = 0;

export function renderTile(posX, posY, texture, scale) {
    let sourceX = 64 * (texture % 22);
    let sourceY = 64 * Math.trunc(texture / 22);
    
    let displayX = posX * scale;
    let displayY = posY * scale;
 
    context.beginPath();
    context.drawImage(img, sourceX, sourceY, 64, 64, displayX, displayY, scale, scale);
    img.src = 'tilesheet_complete.png';

}

export function checkMode() {
    if (event.keyCode === 69) mode = 0; 
    if (event.keyCode === 71) mode = 1;
}

function mainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (mode === 0) {
        editorLoop()
    } else if (mode === 1) {
        gameLoop()
    }
}

setInterval(mainLoop)
