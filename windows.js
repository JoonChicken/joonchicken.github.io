import { files } from "/explorer_files.js";

let windows = [];

function layer_windows() {
    for (let i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = i;
    }
}

addEventListener("load", (e) => {

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
        $(this).closest(".content-panel").remove();
    });


    // ============  Focus on mousedown  =======================

    $(".content-panel.ui-draggable").map(function() {
        windows.push(this);
    });

    $(".content-panel.ui-draggable").on("mousedown", function() {
        windows = windows.filter(element => element != this);
        windows.push(this);
        layer_windows();
    });

});

// ===========  Create new windows  ==========================

    const window_icons = {
        "note" : "/images/note_viewer.ico",
        "jpg" : "/images/photo.ico"
        
    };

    const window_title = {
        "note": "Note Viewer",
        "jpg" : "Image Viewer"
    };

    const window_sizes = { // width, height
        "note": [480, 500],
        "jpg": [800, 600]
    }

export function create_window(filename) {
    const filenameArray = filename.split(".");
    const type = filenameArray[filenameArray.length - 1];
    const numUntouched = $(".untouched").length;
    const top = 890 + numUntouched * 20;
    const marginL = -350 + numUntouched * 20;
    const window = $(`
        <div id="new-window" class="content-panel untouched" style="width: ${window_sizes[type][0]}px; height: ${window_sizes[type][1]}px; top: ${top}px; margin-left: ${marginL}px">
            <div class="content-panel-inner" height="auto">
                <div class="content-panel-header" height="auto">
                    <div class="panel-header-info">
                        <img class="panel-icon" src="${window_icons[type]}" height="18px">
                        <div>
                            ${window_title[type]} - [${filename}]
                        </div>
                    </div>
                    <div class="panel-header-x">✖</div>
                </div>
                <div class="content-panel-body-outer">
                    <div class="content-panel-body doScroll" ${type == "jpg" ? `style="display: flex; justify-content: center; background-color: black"` : ""}>
                        ${type !== "jpg" ? `<div style="padding: 10px">` : ""}
                            ${files[filename]}
                        ${type !== "jpg" ? `</div>` : ""}
                    </div>
                </div>
            </div>
        </div>
    `);
    $("#body-wrapper").append(window);
    const newWindow = $("#new-window");
    newWindow.draggable({handle: ".content-panel-header", cancel: ".panel-header-x", distance: "0"});
    newWindow.find(".panel-header-x").on("click", function() {
        $(this).closest(".content-panel").remove();
    });
    newWindow.on("mousedown", function () {
        $(this).removeClass("untouched");
        windows = windows.filter(element => element != this);
        windows.push(this);
        layer_windows();
        $(this).on("mousedown", function () {
            windows = windows.filter(element => element != this);
            windows.push(this);
            layer_windows();
        });
    });
    newWindow.attr("id", "");
    windows.push(window[0]);
    layer_windows();
}