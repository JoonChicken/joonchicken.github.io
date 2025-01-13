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
const window_width_threshold = 900;
const window_width_min = 640;
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
window.addEventListener('resize', () => {
    let window_width = window.innerWidth;
    if (window_width < window_width_min) {
        document.getElementById("menubar-spacer").style.padding = "50px 4% 50px 8%"
    } else if (window_width < window_width_threshold) {
        let ratio = invlerp(window_width_min, window_width_threshold, window_width);
        let rightpad = lerp(4, 15, ratio);
        let leftpad = lerp(8, 17, ratio);
        document.getElementById("menubar-spacer").style.padding = "50px " + rightpad + "% 50px " + leftpad + "%"
    } else {
        document.getElementById("menubar-spacer").style.padding = "50px 15% 50px 17%"
    }
});