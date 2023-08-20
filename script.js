const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = []
const colors = ["#7f00ff", "#0000ff", "#007fff", "#00ffff", "#00ff7f", "#00ff00", "#7fff00", "#ffff00", "#ff7f00", "#ff0000"];

const line = (a, b, x, y, color = "white") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = "2";
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(x, y);
    ctx.stroke();
}

const rotationMatrix = (angle) => {
    return [
        [Math.cos(angle), Math.sin(angle)],
        [-Math.sin(angle), Math.cos(angle)]
    ];
}

line(canvas.width / 2, 500, canvas.width / 2, 670, "#7f00ff") // trunk

const branch = (x, y, h, angle, limit) => {
    if (limit <= 0) return;

    let right = math.multiply([0, 1], rotationMatrix(angle));
    right = math.multiply(right, h);

    let left = math.multiply([0, 1], rotationMatrix(angle + (Math.PI / 2)));
    left = math.multiply(left, h);

    lines.push([x, y, x + right[0], y - right[1], colors[limit - 1]])
    branch(x + right[0], y - right[1], h * 0.67, angle - (((Math.PI) / 4) * 0.75), limit - 1);

    lines.push([x, y, x + left[0], y - left[1], colors[limit - 1]])
    branch(x + left[0], y - left[1], h * 0.67, angle + (((Math.PI) / 4) * 0.75), limit - 1);
}

branch(canvas.width / 2, 500, 190, -Math.PI / 4, 10); // construct the lines array

let i = 0;
const loop = () => {
    if (i < lines.length) {
        line(lines[i][0], lines[i][1], lines[i][2], lines[i][3], lines[i][4]);
        i++;
    }
    window.requestAnimationFrame(loop);
}
loop();