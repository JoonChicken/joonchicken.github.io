import {createNoise2D} from "https://cdn.skypack.dev/simplex-noise@4.0.3";
const noise2D = createNoise2D();
const canvas = document.getElementById("starry-canvas");
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
var center_x = canvas.width / 2;
var center_y = canvas.height / 2;


var window_width = window.innerWidth;


// Date-specific footer
const date = new Date()
let month = date.getMonth()
let year = date.getFullYear()
let emojiString = ""
if (month == 11) {
    emojiString = "🎅"
} else {
    emojiString = "❤️"
}
document.getElementById("footer-emojis").innerHTML = emojiString + " Graphic design is my passion " + emojiString
document.getElementById("footer-copyright").innerHTML = "© " + year + " Joon Heo" 


// resize with these functions
window.addEventListener('resize', () => {
    resizer();
});

window.onload = function () {
    resizer();
}

function resizer() {
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    window_width = window.innerWidth;
    menuResize();
    backgroundResize();
}



// Top menu resizing based on viewport width
const menu_width_threshold = 900;
const content_size_threshold = 660;
const window_min_size = 420;
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));

function menuResize() {
    // window width defined above
    let contentMenuRatio = invlerp(content_size_threshold, menu_width_threshold, window_width);
    let minMenuRatio = invlerp(window_min_size, menu_width_threshold, window_width);

    if (window_width < content_size_threshold) {
        document.getElementById("menubar-spacer").style.padding = "50px 4% 50px 8%";
    } else if (window_width < menu_width_threshold) {
        let rightPad = lerp(4, 15, contentMenuRatio);
        let leftPad = lerp(8, 17, contentMenuRatio);
        document.getElementById("menubar-spacer").style.padding = "50px " + rightPad + "% 50px " + leftPad + "%";
    } else {
        document.getElementById("menubar-spacer").style.padding = "50px 15% 50px 17%";
    }

    if (window_width < menu_width_threshold) {
        let marginModifier = lerp(0, 5, contentMenuRatio);
        document.getElementById("title-text-top-container").style.marginLeft = -5 + marginModifier + "px";
        document.getElementById("title-text-bottom-container").style.marginLeft = -235 + marginModifier + "px";
    } else {
        document.getElementById("title-text-top-container").style.marginLeft = "0px";
        document.getElementById("title-text-bottom-container").style.marginLeft = "-230px";
    }

    if (window_width < window_min_size) {
        let menuGap = lerp(5, 30, minMenuRatio);
        document.getElementById("menu-buttons-flex-container").style.gap = menuGap + "px";
    } else {
        document.getElementById("menu-buttons-flex-container").style.gap = "30px";
    }
}
menuResize();
    

// Drawing background on canvas
function draw() {
    var col = 0;
    var threshold = 0.9;
    for (var i = 0; i < canvas.width; i++) { // image array stores rgba
        for (var j = 0; j < canvas.height; j++) {
            col = noise2D(i - center_x, j - center_y);
            if (col > threshold) {
                data[(i + j * canvas.height) * 4] = col * 255;
                data[(i + j * canvas.height) * 4 + 1] = col * 255;
                data[(i + j * canvas.height) * 4 + 2] = col * 255;
                data[(i + j * canvas.height) * 4 + 3] = 255;
            } else {
                data[(i + j * canvas.height) * 4 + 3] = 0;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
    console.log(canvas.width + "   " + canvas.height);
}

// Resizing background canvas with viewport width
function backgroundResize() {
    const canvas_wrapper = document.getElementById("starry-wrapper");
    const h = document.getElementById("menubar-wrapper").offsetHeight + document.getElementById("body-wrapper").offsetHeight + document.getElementById("footer-transition-wrapper").offsetHeight;
    const w = window_width;
    canvas_wrapper.style.height = h + "px";
    canvas_wrapper.style.width = w + "px";
    canvas.width = w;
    canvas.height = h;

    draw();
}
backgroundResize();