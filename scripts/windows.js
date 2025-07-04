// ==============  Draggable stuff  =========================

$(".content-panel-header").disableSelection();
$(".panel-header-x").disableSelection();

const content_panels = document.getElementsByClassName("content-panel");
for (let i = 0; i < content_panels.length; i++) {
    content_panels[i].style.width = "" + content_panels[i].clientWidth + "px";
    content_panels[i].style.height = "" + content_panels[i].clientHeight + "px";
}

$(".content-panel").draggable({handle: ".content-panel-header", cancel: ".panel-header-x", distance: "0"});


$(".panel-header-x").on("click", function() {
    $(this).closest(".content-panel").hide();
});


// ============  Focus on mousedown  =======================

let windows = [];

$(".content-panel.ui-draggable").map(function() {
    windows.push(this);
});

$(".content-panel.ui-draggable").on("mousedown", function() {
    windows = windows.filter(element => element != this);
    windows.push(this);
    for (let i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = i;
    }
});