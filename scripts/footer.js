// Date-specific footer
const date = new Date()
var month = date.getMonth()
var year = date.getFullYear()
var emojiString = ""
if (month == 11) {
    emojiString = "🎅"
} else {
    emojiString = "❤️"
}
document.getElementById("footer-emojis").innerHTML = " With " + emojiString + ",";
const copyright = document.getElementById("footer-copyright");
copyright.innerHTML = "©" + year + " Joon Heo";



