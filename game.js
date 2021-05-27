import { context, renderTile, checkMode, canvas } from './utils.js';
import { editor } from './editor.js';

const game = {
    right: false,
    left: false, 
    up: false,
    down: false,
    map: {
        scale: 32,
        mapX: [0, 1, 2, 3, 4],
        mapY: [0, 1, 2, 3, 4],
        mapT: [0, 1, 2, 3, 4],
        update: function() {
            for (let i in this.mapX) {
                
                let renderX = this.mapX[i] + game.camera.posX;
                let renderY = this.mapY[i] + game.camera.posY;
                let renderT = this.mapT[i];
                console.log(renderX, renderY, renderT)
    
                renderTile(renderX, renderY, renderT, this.scale);
                
            }
        }
    },
    player: {
        velocityX: 0,
        velocityY: 0,
        posX: 0,
        posY: 0,
        update: function() {
            document.onkeydown = function(event) {  
                if (event.keyCode === 37) {
                    game.right = true;
                } else if (event.keyCode === 39) {
                    game.left = true;
                } if (event.keyCode === 38) {
                    game.up = true;
                } else if (event.keyCode === 40) {
                    game.down = true;
                }
            }

            if (game.up === true) {
                this.velocityY += 0.009;
            } if (game.down === true) {
                this.velocityY -= 0.009;
            } if (game.right === true) {
                this.velocityX += 0.009;
            } if (game.left === true) {
                this.velocityX -= 0.009;
            }
        
            this.velocityX *= 0.9;
            this.velocityY *= 0.9;
            this.posX += this.velocityX;
            this.posY += this.velocityY;

            renderTile(this.posX - game.camera.posX, this.posY - game.camera.posY, 14, game.map.scale);
        }
    },
    camera: {
        posX: 0,
        posY: 0,
        update: function() {
            this.posX += game.player.posX / game.map.scale;
            this.posY += game.player.posY / game.map.scale;
        }
    }

}


export function gameLoop() {   
    game.map.update();
    game.player.update();
    game.camera.update();
}
