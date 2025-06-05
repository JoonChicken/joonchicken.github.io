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
document.getElementById("footer-emojis").innerHTML = emojiString + " Graphic design is my passion " + emojiString
const copyright = document.getElementById("footer-copyright");
copyright.innerHTML = "<a href=\"https://creativecommons.org/publicdomain/zero/1.0/\"><img src=\"https://mirrors.creativecommons.org/presskit/icons/cc.svg\" style=\"max-width: 1em;max-height:1em;margin-left: .2em;\"><img src=\"https://mirrors.creativecommons.org/presskit/icons/zero.svg\" style=\"max-width: 1em;max-height:1em;margin-left: .2em;\"></img></a>" + year + " Joon Heo";



