// ==============  Interactive Controls  =========================
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)") == true || window.matchMedia("(prefers-reduced-motion: reduce)").matches == true;

const control_wrapper = $("#control-wrapper");
const control_hover = $("#control-hover")[0];
const control_panel = $("#interactives-control")[0];

var emerged = false;
var emerge_speed = 200;
if (reducedMotion) {
    emerge_speed = 0;
}
const emerge = () => {
    emerged = true;
    control_wrapper.animate({left: "95"}, emerge_speed);

}
const collapse = () => {
    emerged = false;
    control_wrapper.animate({left: "0"}, emerge_speed);
}


control_hover.onmouseenter = control_panel.onmouseenter = emerge;
control_wrapper[0].onmouseleave = collapse;
control_hover.ontouchstart = () => {
    if (emerged) {
        collapse();
    } else {
        emerge();
    }
}