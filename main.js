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


/* Top menu resizing based on viewport width */
const menu_width_threshold = 900;
const content_size_threshold = 660;
const window_min_size = 420;
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
menuResize();

function menuResize() {
    let window_width = window.innerWidth;
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

window.addEventListener('resize', () => {
    menuResize();
});