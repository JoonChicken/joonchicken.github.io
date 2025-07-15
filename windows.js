import { files } from "/explorer_files.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let windows = [];

function layer_windows() {
    for (let i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = i;
    }
}

addEventListener("load", () => {

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

export async function create_window(filename) {
    const filenameArray = filename.split(".");
    const type = filenameArray[filenameArray.length - 1];

    let cursorChanger = $(`<div></div>`, {
        id: "c-div",
        style : `z-index: 999999; position: fixed; cursor: wait; height: 100%; width: 100%; opacity: 0%;`
    });
    $("body").prepend(cursorChanger);
    await sleep(type !== "jpg" ? 80 : 2000);
    
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
                        ${type === "note" ? `<div style="padding: 10px; height: 100%">` : ""}
                            ${files[filename]}
                        ${type === "note" ? `</div>` : ""}
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
    $("#c-div").remove();
}

// =====  trojan easter egg  =====

export async function run_trojan() {
    console.log("Downloading McAfee SecureSearch...");
    let trojanElement = $(`<div></div>`, {
        id: "t-div",
        style : `z-index: 99999; position: fixed; cursor: wait; height: 100%; width: 100%;
                background-color: white; opacity: 0%;`
    });
    $("body").prepend(trojanElement);
    await sleep(1000);
    console.log("Progress: [....................] 0%");
    await sleep(1000);
    console.log("Progress: [....................] 3%");
    await sleep(600);
    console.log("Progress: [#...................] 5%");
    await sleep(600);
    console.log("Progress: [####................] 21%");
    await sleep(600);
    console.log("Progress: [######..............] 34%");
    let opacity = 0;
    while (opacity < 0.5) {
        opacity += 0.03;
        await sleep(20);
        $("#t-div").css("opacity", `${opacity}`);
    }
    await sleep(6100);
    $("#t-div").css("opacity", "0%");
    console.log("Progress: [###################.] 93%");
    await sleep(200);
    console.log("Progress: [####################] 100%");
    console.log("Installing...");
    await sleep(3200);
    $("#t-div").remove();
    console.log("McAfee SecureSearch successfully installed. Please restart your browser for changes to take effect.");
}