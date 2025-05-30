/* Important stuff */
const window_width = window.innerWidth;


/* Date-specific footer */
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
    menuResize();
    backgroundResize();
});



// Top menu resizing based on viewport width
const menu_width_threshold = 900;
const content_size_threshold = 660;
const window_min_size = 420;
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
menuResize();

function menuResize() {
    /* window width defined above */
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

    if (window_width < menu_width_threshold) {
        let menuGap = lerp(5, 30, minMenuRatio);
        document.getElementById("menu-buttons-flex-container").style.gap = menuGap + "px";
    } else {
        document.getElementById("menu-buttons-flex-container").style.gap = "30px";
    }
}
    

/* Drawing background on canvas */
function draw() {
    const canvas = document.getElementById("starry-canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200 0 0)";
        ctx.fillRect(0, 0, 1, 50);
        ctx.fillStyle = "rgb(200 200 200)";
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    }
}

/* Resizing background canvas with viewport width */
function backgroundResize() {
    const canvas_wrapper = document.getElementById("starry-wrapper");
    const canvas = document.getElementById("starry-canvas");
    const h = document.getElementById("menubar-wrapper").offsetHeight + document.getElementById("body-wrapper").offsetHeight + document.getElementById("footer-transition-wrapper").offsetHeight;
    canvas_wrapper.style.height = h + "px";
    canvas.width = canvas_wrapper.innerWidth;
    canvas.height = h;

    draw();
}
backgroundResize();