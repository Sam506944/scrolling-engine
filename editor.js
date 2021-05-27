import {context, renderTile, checkMode, canvas} from './utils.js';

export const editor = {
    scale: 32,
    posX: 0,
    posY: 0,
    mapX: [],
    mapY: [],
    mapT: [],
    mouseX: null,
    mouseY: null,
    texture: 1,
    update: function() {
        
        renderTile(this.mouseX, this.mouseY, editor.texture, editor.scale)
        
        for (let i in this.mapX) {
            let renderX = this.mapX[i] + this.posX;
            let renderY = this.mapY[i] + this.posY;
            let renderT = this.mapT[i];

            if (renderX < canvas.width && renderX  > 0 && renderY - editor.scale < canvas.height && renderY > 0) {
                renderTile(renderX, renderY, renderT, editor.scale);
            }
        }

    }
}

export function editorLoop(event) {

    document.onkeydown = function(event) {
        
        if (event.keyCode === 187) {
            editor.scale ++;
        } else if (event.keyCode === 189) editor.scale --;

        if (event.keyCode === 38) {
            editor.texture ++;
        } else if (event.keyCode === 40) editor.texture --;
        
        if (event.keyCode === 87) editor.posY += 1;
        if (event.keyCode === 83) editor.posY -= 1;
        if (event.keyCode === 65) editor.posX += 1;
        if (event.keyCode === 68) editor.posX -= 1;

        if (event.keyCode === 90) {
            editor.mapX.pop();
            editor.mapY.pop();
            editor.mapT.pop();
        }

        checkMode();

    }

    document.onmousemove = function(event) {
        editor.mouseX = Math.round(event.clientX / editor.scale);
        editor.mouseY = Math.round(event.clientY / editor.scale);
    }
    
    document.onmousedown = function(event) {
        editor.mapX.push(editor.mouseX - editor.posX);
        editor.mapY.push(editor.mouseY - editor.posY);
        editor.mapT.push(editor.texture);
    }

    document.onmousewheel = function(event) {
        editor.texture ++;
    }
    
    editor.update();

}

