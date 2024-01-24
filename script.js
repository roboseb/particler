// Initialize basic canvas.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Default options for different particle animation parameters.
let options = {
    lineCount: 20,
    animationSpeed: 5,
    lineLength: 400,
    lineGap: 800,
    totalLength: 500,
    lineWidth: 8,
    lineCap: 'round',
    angleSize: 180,
    bezierAngleX: 0,
    bezierAngleY: 0,
    startX: 0,
    startY: 0,
    lineDelay: 0,
    subtractedLines: 0,
}

// Set ranges for randomizing values.
let ranges = {
    lineCount: [1, 100],
    animationSpeed: [-20, 20],
    lineLength: [1, 1000],
    lineGap: [1, 1000],
    totalLength: [50, 2000],
    lineWidth: [1, 25],
    angleSize: [-1080, 1080],
    bezierAngleX: [-1080, 1080],
    bezierAngleY: [-1080, 1080],
    startX: [-200, 200],
    startY: [-200, 200],
    lineDelay: [-100, 100],
}

// Canvas and animation initialization based on options.
let offset = 0;
ctx.canvas.width = window.innerHeight - 20;
ctx.canvas.height = window.innerHeight - 20;
ctx.setLineDash([options.lineLength, options.lineGap]);

ctx.lineWidth = options.lineWidth;
ctx.lineCap = options.lineCap;

let direction = -5;

// Temp animation function.
const progressAni = () => {
    options.bezierAngleX += direction;
    options.bezierAngleY += direction;
    if (options.bezierAngleX >= 720) {
        direction = direction * -1;
    } else if (options.bezierAngleX <= -720) {
        direction = direction * -1;
    }
}

// Draw a line from th17e center point towards the passed angle.
function draw(angle, lineNumber) {

    // Progress the line along the offset.
    ctx.lineDashOffset = -offset + (lineNumber * options.lineDelay);

    ctx.setLineDash([options.lineLength, options.lineGap]);
    ctx.lineWidth = options.lineWidth;

    ctx.beginPath();
    x1 = canvas.width / 2 + options.startX;
    y1 = canvas.height / 2 + options.startY;

    x2 = x1 + Math.cos(Math.PI * (angle + 180 - ((options.angleSize - 180) / 2)) / 180) * options.totalLength;
    y2 = y1 + Math.sin(Math.PI * (angle + 180 - ((options.angleSize - 180) / 2)) / 180) * options.totalLength;

    // ctx.moveTo(x1, y1);
    // ctx.lineTo(x2, y2);
    // ctx.stroke();

    // ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1 + options.bezierAngleX, y1 + options.bezierAngleY, x2 + options.bezierAngleX, y2 + options.bezierAngleY, x2, y2);


    ctx.stroke();

}

//draw(180);


// // Draw lines based on option parameters.
function animate() {
    //progressAni();

    offset += parseInt(options.animationSpeed);

    // Wait for lines to be off screen before refreshing them.
    if (offset > options.lineLength + options.lineGap) {
        offset = 0;
    }

    // Clear canvas each frame.
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width * 2, canvas.height * 2);

    // Draw an amount of lines based on options.
    for (let i = 0; i < options.lineCount; i++) {

        // Skip drawing subtracted lines.

        const rangeStart = Math.round(options.lineCount / 2) - Math.round(options.subtractedLines / 2);
        const rangeEnd = rangeStart + options.subtractedLines;

        if (i > rangeStart && i < rangeEnd) {
            continue;
        }
        draw(options.angleSize / (options.lineCount - 1) * i, i);
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
        options[input.id] = parseInt(input.value);
    });
});

const randomize = () => {
    Array.from(Object.keys(ranges)).forEach(key => {
        const newValue = randomInRange(ranges[key][0], ranges[key][1]);
        options[key] = newValue;
        const input = document.getElementById(key);
        input.value = newValue;
    });
}

// Add event listener to randomize button.
const randomizeBtn = document.getElementById('randomizeBtn');
randomizeBtn.addEventListener('click', () => {
    randomize();
});

// Randomize on space key being pressed.
document.addEventListener("keydown", (event) => {
    randomize();
});

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

