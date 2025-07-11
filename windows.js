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

export function new_window(filename) {
    const window = $(`
        <div id="new-window" class="content-panel" style="width: 430px; height: 430px; margin-left: 20px; top: 340px">
            <div class="content-panel-inner" height="auto">
                <div class="content-panel-header" height="auto">
                    <div class="panel-header-info">
                        <img class="panel-icon" src="/images/photo.ico" height="18px">
                        <div>
                            Test Window
                        </div>
                    </div>
                    <div class="panel-header-x">✖</div>
                </div>
                <div class="content-panel-body-outer">
                    <div class="content-panel-body">
                        New window woohoo!
                    </div>
                </div>
            </div>
        </div>
    `);
    $("#body-wrapper").append(window);
    const theNewWindow = $("#new-window");
    theNewWindow.draggable({handle: ".content-panel-header", cancel: ".panel-header-x", distance: "0"});
    theNewWindow.find(".panel-header-x").on("click", function() {
        $(this).closest(".content-panel").hide();
    });
    theNewWindow.attr("id", "");
    windows.push(window[0]);
    layer_windows();
}

function layer_windows() {
    for (let i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = i;
    }
}

$(".content-panel.ui-draggable").map(function() {
    windows.push(this);
});

$(".content-panel.ui-draggable").on("mousedown", function() {
    windows = windows.filter(element => element != this);
    windows.push(this);
    layer_windows();
});