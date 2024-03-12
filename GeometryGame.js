const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let developerMode = true;
var gamestate = "Menu"

var mousePosition = {
    x: 0,
    y: 0
}

function setMousePosition (e) {
    let multiplierX = 2
    let multiplierY = 2
    mousePosition.x = (e.pageX - 59) * multiplierX;
    mousePosition.y = (e.pageY - 43) * multiplierY;
    console.log(mousePosition.x, mousePosition.y);
}

canvas.addEventListener('mousemove', setMousePosition, false);
canvas.addEventListener('mousemove', setMousePosition, false);

c.fillRect(0, 0, canvas.width, canvas.height);

class Gui {
    constructor({ position, hitboxSize, image, size }) {
        this.position = position;
        
        this.hitboxSize = hitboxSize;

        this.size = size;

        this.image = new Image();
        this.image.src = image;

        this.visible = true;
    }

    getPosition() {
        return this.position;
    }
    
    setPosition(position) {
        this.position = position;
    }

    hideGUI() {
        this.visible = false;
    }

    replaceImage(newImage) {
        this.image.src = newImage;
    }

    draw() {
        if (this.visible) {
            if (developerMode) {
                c.fillStyle = 'red';

                c.fillRect(
                    this.position.x - (this.image.width / 2),
                    this.position.y - (this.image.height / 2),
                    this.image.width,
                    this.image.height
                );
            }

            c.drawImage(this.image,
                this.position.x - (this.image.width / 2),
                this.position.y - (this.image.height / 2)
            );
        }
    }

    update() {
        this.draw();
    }


}
function returnArrayXY(x, y) {
    return {
        x: x,
        y: y
    };
}
function playLevel(levelData) {
    gamestate = "Playing"
}
function startGame () {
    let playButton = new Gui({
        position: returnArrayXY(canvas.width / 2, 400),
        hitboxSize: returnArrayXY(50, 50),
        image: './gamefiles/images/costume.png',
        size: 120
    });

    function animate () {
        window.requestAnimationFrame(animate);

        c.clearRect(0, 0, canvas.width, canvas.height);

        playButton.update();
        playButton.setPosition(mousePosition);
    };

    animate()
}