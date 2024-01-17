// Initialize basic canvas.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Default options for different particle animation parameters.
let options = {
    lineCount: 20,
    animationSpeed: 5,
    lineLength: 400,
    lineWidth: 8,
    lineCap: 'round',
    lineCount: 10,
    angleSize: 180,
}

// Canvas and animation initialization based on options.
let offset = 0;
ctx.canvas.width = 500;
ctx.canvas.height = 500;
ctx.setLineDash([options.lineLength, options.lineLength * 2]);

ctx.lineWidth = options.lineWidth;
ctx.lineCap = options.lineCap;

// Draw a line from the center point towards the passed angle.
function draw(angle) {

    // Progress the line along the offset.
    ctx.lineDashOffset = -offset;

    ctx.lineWidth = options.lineWidth;

    ctx.beginPath();
    x1 = canvas.width/2;
    y1 = canvas.height/2;
    length =  400;
    
    x2 = x1 + Math.cos(Math.PI * (angle + 180 - ((options.angleSize - 180) / 2)) / 180) * length;
    y2 = y1 + Math.sin(Math.PI * (angle + 180 - ((options.angleSize - 180) / 2)) / 180) * length;
    
    // ctx.moveTo(x1, y1);
    // ctx.lineTo(x2, y2);
    // ctx.stroke();

    const bezierAngleX = 0;
    const bezierAngleY = 0;

    // ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1 + bezierAngleX, y1 + bezierAngleY, x2 + bezierAngleX, y2 + bezierAngleY, x2, y2);
    ctx.stroke();
}

//draw(180);


// // Draw lines based on option parameters.
function animate() {

    offset += parseInt(options.animationSpeed);

    // Wait for lines to be off screen before refreshing them.
    if (offset > options.lineLength * 3) {
        offset = 0;
    }

    // Clear canvas each frame.
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width * 2, canvas.height * 2);

    // Draw an amount of lines based on options.
    for (let i = 0; i < options.lineCount; i ++) {
        draw(options.angleSize / (options.lineCount - 1) * i);
    }

    // Refresh the animation ~60 times per second.
    setTimeout(animate, 16);
}

// Start the animation cycle.
animate();

// Add event listeners for option inputs.
const inputArray = Array.from(document.querySelectorAll('.option-input'));
inputArray.forEach((input) => {
    input.addEventListener('input', () => {
        options[input.id] = input.value;
    });
})