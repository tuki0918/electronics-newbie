const canvas_size = 320;
const canvas_line = 16;
const canvas_dot_size = (canvas_size / canvas_line);
const canvasBg = document.getElementById('board-bg');
const canvasPalet = document.getElementById('board-palet');

// canvas matrix data
const data = (new Array(canvas_line)).fill(0).map(() => {
    return (new Array(canvas_line)).fill(0);
});

// background canvas
if (canvasBg.getContext) {
    canvasBg.width = canvas_size;
    canvasBg.height = canvas_size;
    const ctx = canvasBg.getContext('2d');
    const lines = (new Array(canvas_line)).fill(canvas_dot_size);
    const points = lines.map((line, i) => line * i);
    points.map(point => {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ccc';
        // X line
        ctx.beginPath();
        ctx.moveTo(0, point);
        ctx.lineTo(canvas_size, point);
        ctx.closePath();
        ctx.stroke();
        // Y line
        ctx.beginPath();
        ctx.moveTo(point, 0);
        ctx.lineTo(point, canvas_size);
        ctx.closePath();
        ctx.stroke();
    });
}

// main canvas
if (canvasPalet.getContext) {
    canvasPalet.width = canvas_size;
    canvasPalet.height = canvas_size;
    const ctx = canvasPalet.getContext('2d');
    const state = {
        x: 0,
        y: 0,
        drawing: false
    };
    canvasPalet.addEventListener('mousemove', e => {
        if (!state.drawing) {
            return;
        };
        const rect = e.target.getBoundingClientRect();
        state.x = e.clientX - rect.left;
        state.y = e.clientY - rect.top;

        const x = Math.floor(state.x / canvas_dot_size);
        const y = Math.floor(state.y / canvas_dot_size);

        // uodate canvas
        ctx.fillStyle = '#00CC99';
        ctx.fillRect(x * canvas_dot_size, y * canvas_dot_size, canvas_dot_size, canvas_dot_size);
        // uodate matrix data
        data[y][x] = 1;

        // auto eraser
        setTimeout(() => {
            ctx.clearRect(x * canvas_dot_size, y * canvas_dot_size, canvas_dot_size, canvas_dot_size);
            data[y][x] = 0;
        }, 3 * 1000);

    }, false);

    canvasPalet.addEventListener('mousedown', e => {
        state.drawing = true;
    }, false);

    canvasPalet.addEventListener('mouseup', () => {
        state.drawing = false;
    }, false);
}
