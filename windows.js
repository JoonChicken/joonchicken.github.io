import { files } from "/explorer_files.js";
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/highlight.min.js';
import python from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/languages/python.min.js';

hljs.registerLanguage('python', python);

// get query from URL and spawn the relevant virtual window
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
let name_of_file = params.get("window");
console.log(name_of_file)
if (name_of_file != null && files[name_of_file] != null) {
    create_window(name_of_file, 210);
}


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
        "note" : "/images/icons/note_viewer.ico",
        "jpg" : "/images/icons/photo.ico",
        "exe" : "/images/icons/console.png",
        "py" : "/images/icons/python.png",
        "sh" : "/images/icons/codeicon.ico",
        "makefile" : "/images/icons/codeicon.ico"
    };

    const window_title = {
        "note": "Note Viewer",
        "jpg" : "Image Viewer",
        "exe" : "Command Prompt",
        "py" : "Pythonny",
        "sh" : "Generic Code Viewer",
        "makefile" : "Generic Code Viewer"
    };

    const window_sizes = { // width, height
        "note": [540, 500],
        "jpg": [750, 600],
        "exe" : [600, 400],
        "py": [700, 600],
        "sh": [700, 600],
        "makefile": [700, 600]
    }

// create new virtual window with the specified filename and an optional top in px
// (currently only used for spawning from URL params)
export async function create_window(filename, window_top = -1) {
    const filenameArray = filename.split(".");
    const type = filenameArray.size !== 1 ? filenameArray[filenameArray.length - 1] : filename;

    let cursorChanger = $(`<div></div>`, {
        id: "cursor-changer",
        style : `z-index: 999999; position: fixed; cursor: wait; height: 100%; width: 100%; opacity: 0%;`
    });
    $("body").prepend(cursorChanger);
    await sleep(type !== "jpg" ? 80 : 2000);
    
    const numUntouched = $(".untouched").length;
    const top = window_top === -1 ? 890 + numUntouched * 20 : window_top;
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
                ${type === "py" || type === "sh" || type === "makefile" ? `
                    <div class="window-controls-container">
                        <div class="window-controls-row" style="height: 40px;">
                            <div class="tactile-bump">&nbsp;</div>
                            <a class="raised-button" href="/window_content/${filename}" aria-label="Download this file" download>
                                <div class="raised-button-inner">Download</div>
                            </a>
                            <a class="raised-button disabled" disabled aria-label="Run this file [Disabled]">
                                <div class="raised-button-inner">Run</div>
                            </a>
                        </div>
                    </div>
                    <div class="window-spacer"></div>
                ` : ""}
                <div class="content-panel-body-outer">
                    <div class="content-panel-body doScroll"
                        ${type === "jpg" ? `style="display: flex; justify-content: center; background-color: black"` : ""}
                        ${type === "note" ? `style="padding: 10px; height: 100%"` : ""}>
                            ${files[filename][Symbol.toStringTag] === 'AsyncFunction' ? await files[filename](filename) : files[filename]}
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
    $("#cursor-changer").remove();
    hljs.highlightAll();
    return newWindow;
}

// =====  trojan easter egg  =====


// thanks to geeks for geeks for the scrolling code
function disableScroll() {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;
    let scrollLeft =
        window.pageXOffset ||
        document.documentElement.scrollLeft;
    
        window.onscroll = window.onwheel = function (e) {
            e.preventDefault();
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = window.onwheel = function () { };
}

export async function run_trojan() {
    console.log("Downloading McAfee SecureSearch...");
    let trojanElement = $(`<div></div>`, {
        id: "t-div",
        style : `z-index: 99999; position: fixed; cursor: wait; height: 100%; width: 100%;
                background-color: white; opacity: 0%;`
    });
    $("body").prepend(trojanElement);
    await sleep(500);
    let cmd_window;
    create_window("trojan.exe").then(window => cmd_window = window);
    console.log(cmd_window);
    await sleep(200);
    cmd_window.remove();
    await sleep(300);
    console.log("Progress: [....................] 0%");
    await sleep(500);
    console.log("Progress: [....................] 3%");
    await sleep(500);
    console.log("Progress: [#...................] 5%");
    await sleep(500);
    console.log("Progress: [####................] 21%");
    await sleep(500);
    console.log("Progress: [######..............] 34%");
    disableScroll();
    let opacity = 0;
    while (opacity < 0.5) {
        opacity += 0.03;
        await sleep(20);
        $("#t-div").css("opacity", `${opacity}`);
    }
    await sleep(3000);
    $("#t-div").css("opacity", "0%");
    enableScroll();
    console.log("Progress: [###################.] 93%");
    await sleep(200);
    console.log("Progress: [####################] 100%");
    console.log("Installing...");
    await sleep(2000);
    $("#t-div").remove();
    console.log("McAfee SecureSearch successfully installed. Please restart your browser for changes to take effect.");
}