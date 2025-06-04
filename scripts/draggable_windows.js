// ==============  Body Stuff  =========================

$(".content-panel-header").disableSelection();
$(".panel-header-x").disableSelection();
$(".content-panel").draggable({handle: ".content-panel-header", cancel: ".panel-header-x"});

const content_panels = $("content-panel");

for (var i = 0; i < content_panels.children().length - 1; i++) {
    content_panels.children()[i].find(".panel-header-x").click(() => {
        console.log("panel " + i + " clicked!");
        var this_panel = content_panels.children()[i];
        this_panel.hide();
    });
}