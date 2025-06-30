// ==============  Draggable stuff  =========================

$(".content-panel-header").disableSelection();
$(".panel-header-x").disableSelection();

const content_panels = document.getElementsByClassName("content-panel");
for (var i = 0; i < content_panels.length; i++) {
    content_panels[i].style.width = "" + content_panels[i].clientWidth + "px";
    content_panels[i].style.height = "" + content_panels[i].clientHeight + "px";
}

$(".content-panel").draggable({handle: ".content-panel-header", cancel: ".panel-header-x"});


$(".panel-header-x").on("click", function() {
    $(this).closest(".content-panel").hide();
});


// ============  Focus on mousedown  =======================

var focusedWindow = null;

$(".content-panel.ui-draggable").on("mousedown", function() {
    if (focusedWindow !== null) {
        focusedWindow.classList.remove("focused");
    }
    focusedWindow = this;
    this.classList.add("focused");
});