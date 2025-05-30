/* Draw background on canvas */


function draw() {
const canvas = document.getElementById("starry-canvas");
if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(200 0 0)";
    ctx.fillRect(0, 0, 50, 50);

}
}
draw();