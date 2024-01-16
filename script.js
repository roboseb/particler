const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let offset = 0;
const lineLength = 400;

ctx.canvas.width = 500;
ctx.canvas.height = 500;
ctx.setLineDash([lineLength, lineLength * 2]);

ctx.lineWidth = 10;
ctx.lineCap = 'round';

function draw(angle) {


    ctx.lineDashOffset = -offset;

    ctx.beginPath();
    x1 = canvas.width/2;
    y1 = canvas.height/2;
    length =  400;
    
    x2 = x1 + Math.cos(Math.PI * (angle + 180) / 180) * length;
    y2 = y1 + Math.sin(Math.PI * (angle + 180) / 180) * length;
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function animate() {
    offset += 30;
    if (offset > lineLength * 3) {
        offset = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lineCount = 12;
    const startAngle = -10;
    const endAngle = 180;

    for (let i = 0; i < lineCount; i ++) {
        draw((endAngle - startAngle) / (lineCount - 1) * i);
    }

    setTimeout(animate, 16);
}

animate();


//draw(270);