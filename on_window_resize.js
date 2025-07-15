import {createNoise2D} from "https://cdn.skypack.dev/simplex-noise@4.0.3";
const noise2D = createNoise2D();

const bg_canvas = document.getElementById("starry-canvas");
const bg_ctx = bg_canvas.getContext('2d');
let bg_imageData = bg_ctx.getImageData(0, 0, bg_canvas.width, bg_canvas.height);
let bg_data = bg_imageData.data;
const bg_scale = 2;


let window_width = document.body.clientWidth;


// ====================  When resizing window:  ===========================
//           * Adjust background bg_canvas width and redraw *

window.onresize = onresize;

window.onload = onresize;

onresize = () => {
    window_width = document.body.clientWidth;
    backgroundResize();
    drawBackground();
}


const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));   

// Resizing background bg_canvas with viewport width
function backgroundResize() {
    const bg_canvas_wrapper = document.getElementById("starry-wrapper");
    const h = document.getElementById("menubar-wrapper").offsetHeight + document.getElementById("body-wrapper").offsetHeight + document.getElementById("footer-transition-wrapper").offsetHeight;
    const w = window_width;
    bg_canvas_wrapper.style.height = h + "px";
    bg_canvas_wrapper.style.width = w + "px";
    bg_canvas.style.width = w;
    bg_canvas.style.height = h;
    bg_canvas.width = w / bg_scale;
    bg_canvas.height = h / bg_scale;

    bg_imageData = bg_ctx.getImageData(0, 0, bg_canvas.width, bg_canvas.height);
    bg_data = bg_imageData.data;
}


// Drawing background on bg_canvas
function drawBackground() {
    let col = 0;
    let scale = 0.1;
    let threshold = 0.5;
    for (let i = 0; i < bg_canvas.width; i++) { // image array stores rgba
        for (let j = 0; j < bg_canvas.height; j++) {
            col = (noise2D((i) * scale, (j) * scale) + noise2D((i + Math.random() * 100) * scale * 2, (j + Math.random() * 100) * scale * 2)) * 0.5;
            col *= col;
            if (col > threshold) {
                bg_data[(i + j * bg_canvas.width) * 4] = col * 255;
                bg_data[(i + j * bg_canvas.width) * 4 + 1] = col * 255;
                bg_data[(i + j * bg_canvas.width) * 4 + 2] = col * 255;
                bg_data[(i + j * bg_canvas.width) * 4 + 3] = lerp(100, (invlerp(bg_canvas.height, 0, j) * 0.8 + 0.2) * 255, col);
            } else {
                bg_data[(i + j * bg_canvas.width) * 4 + 3] = 0;
            }
        }
    }
    bg_ctx.putImageData(bg_imageData, 0, 0);
}




onresize();
