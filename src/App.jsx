import { useState, useEffect, useRef } from "react"
import file_tree from "/src/file_tree.js"
import { create_window, run_trojan } from "/windows.js"

import Menubar from "/src/Menubar.jsx"
import Navbar from "/src/Navbar.jsx"
import Addressbar from "/src/Addressbar.jsx"
import ExplorerViewport from "/src/ExplorerViewport";


// I wish js had pointers :(
function findNodeWithPath(pathArray) {
    var folder = file_tree;
    for (var name of pathArray) {
        for (var child of folder.children) {
            if (name == child.name) {
                folder = child;
            }
        }
    }
    return folder;
}


export default function App() {
    const [path, setPath] = useState(["C:", "projects"]);
    const [currentDir, setCurrentDir] = useState(findNodeWithPath(path));
    const history = useRef([]);
    const backtrackHistory = useRef([]);

    useEffect(() => {
        setCurrentDir(findNodeWithPath(path));
    }, [path])


    function onItemDoubleClick(e) {
        const pathOfSelected = [...path];
        pathOfSelected.push(e.currentTarget.querySelector("p").innerText);
        const selectedNode = findNodeWithPath(pathOfSelected)
        if (selectedNode.type === "folder" || selectedNode.type === "drive" || selectedNode.type === "gibberish") {
            backtrackHistory.current = [];
            history.current.push(path);
            setPath(pathOfSelected);
        } else if (selectedNode.type === "trojan") {
            run_trojan();
        } else {
            create_window(e.currentTarget.querySelector("p").innerText);
        }
        e.stopPropagation();
    }

    function onGoBack() {
        backtrackHistory.current.push(path);
        setPath(history.current.pop());    
    }

    function onGoForward() {
        history.current.push(path);
        setPath(backtrackHistory.current.pop());
    }

    function onGoUp() {
        backtrackHistory.current = []
        history.current.push(path);
        setPath(path.slice(0, -1));
    }

    function onAddressbarChanged() {

    }


    return (
        <>
            <div className="window-controls-container">
                <Menubar />
                <Navbar onGoBack={onGoBack} onGoForward={onGoForward} onGoUp={onGoUp}
                        backDisabled={history.current.length === 0}
                        forwardDisabled={backtrackHistory.current.length === 0}
                        upDisabled={path.length === 0}
                />
                <Addressbar path={path} onAddressbarChanged={onAddressbarChanged} />
            </div>
            <div className="window-spacer"></div>
            <ExplorerViewport currentDir={currentDir} onItemDoubleClick={onItemDoubleClick} />
        </>
    );
}