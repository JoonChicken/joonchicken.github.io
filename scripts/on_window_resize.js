import {createNoise2D} from "https://cdn.skypack.dev/simplex-noise@4.0.3";
const noise2D = createNoise2D();
const canvas = document.getElementById("starry-canvas");
const ctx = canvas.getContext('2d');
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imageData.data;
const back_scale = 2;

var window_width = document.body.clientWidth;


// ====================  When resizing window:  ===========================
//           * Adjust background canvas width and redraw *
//                     * Adjust menu bar width *

window.onresize = onresize;

window.onload = onresize;

onresize = () => {
    window_width = document.body.clientWidth;
    menuResize();
    backgroundResize();
    draw();
}


// Top menu resizing based on viewport width
const menu_width_threshold = 900;
const content_size_threshold = 660;
const window_min_size = 420;
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));

function menuResize() {
    if (document.getElementById("menubar-spacer") == null) return;

    // window width defined above
    var contentMenuRatio = invlerp(content_size_threshold, menu_width_threshold, window_width);
    var minMenuRatio = invlerp(window_min_size, menu_width_threshold, window_width);

    if (window_width < content_size_threshold) {
        document.getElementById("menubar-spacer").style.padding = "50px 4% 50px 8%";
    } else if (window_width < menu_width_threshold) {
        var rightPad = lerp(4, 15, contentMenuRatio);
        var leftPad = lerp(8, 17, contentMenuRatio);
        document.getElementById("menubar-spacer").style.padding = "50px " + rightPad + "% 50px " + leftPad + "%";
    } else {
        document.getElementById("menubar-spacer").style.padding = "50px 15% 50px 17%";
    }

    if (window_width < menu_width_threshold) {
        var marginModifier = lerp(0, 5, contentMenuRatio);
        document.getElementById("title-text-top-container").style.marginLeft = -5 + marginModifier + "px";
        document.getElementById("title-text-bottom-container").style.marginLeft = -235 + marginModifier + "px";
    } else {
        document.getElementById("title-text-top-container").style.marginLeft = "0px";
        document.getElementById("title-text-bottom-container").style.marginLeft = "-230px";
    }

    if (window_width < window_min_size) {
        var menuGap = lerp(5, 30, minMenuRatio);
        document.getElementById("menu-buttons-flex-container").style.gap = menuGap + "px";
    } else {
        document.getElementById("menu-buttons-flex-container").style.gap = "30px";
    }
}
    

// Resizing background canvas with viewport width
function backgroundResize() {
    const canvas_wrapper = document.getElementById("starry-wrapper");
    const h = document.getElementById("menubar-wrapper").offsetHeight + document.getElementById("body-wrapper").offsetHeight + document.getElementById("footer-transition-wrapper").offsetHeight;
    const w = window_width;
    canvas_wrapper.style.height = h + "px";
    canvas_wrapper.style.width = w + "px";
    canvas.style.width = w;
    canvas.style.height = h;
    canvas.width = w / back_scale;
    canvas.height = h / back_scale;

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;
}


// Drawing background on canvas
function draw() {
    var col = 0;
    var scale = 0.1;
    var threshold = 0.5;
    for (var i = 0; i < canvas.width; i++) { // image array stores rgba
        for (var j = 0; j < canvas.height; j++) {
            col = (noise2D((i) * scale, (j) * scale) + noise2D((i + Math.random() * 100) * scale * 2, (j + Math.random() * 100) * scale * 2)) * 0.5;
            col *= col;
            if (col > threshold) {
                data[(i + j * canvas.width) * 4] = col * 255;
                data[(i + j * canvas.width) * 4 + 1] = col * 255;
                data[(i + j * canvas.width) * 4 + 2] = col * 255;
                data[(i + j * canvas.width) * 4 + 3] = lerp(100, (invlerp(canvas.height, 0, j) * 0.8 + 0.2) * 255, col);
            } else {
                data[(i + j * canvas.width) * 4 + 3] = 0;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}


onresize();
