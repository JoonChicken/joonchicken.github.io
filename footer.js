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
document.getElementById("footer-emojis").innerHTML = " With " + emojiString + ",";
const copyright = document.getElementById("footer-copyright");
copyright.innerHTML = "©" + year + " Joon Heo";



