import { useState, useEffect, useRef } from "react"
import file_tree from "/src/file_tree.js"

import Menubar from "/src/Menubar.jsx"
import Navbar from "/src/Navbar.jsx"
import Addressbar from "/src/Addressbar.jsx"
import ExplorerViewport from "/src/ExplorerViewport";


// I wish js had pointers :(
function findNodeWithPath(path) {
    var folder = file_tree;
    for (var name of path) {
        for (var child of folder.children) {
            if (name == child.name) {
                folder = child;
            }
        }
    }
    return folder;
}


export default function App() {
    const [path, setPath] = useState([]);
    const [currentDir, setCurrentDir] = useState(findNodeWithPath(path));
    const history = useRef([]);
    const backtrackHistory = useRef([]);

    
    useEffect(() => {
        setCurrentDir(findNodeWithPath(path));
    }, [path]);



    function onItemDoubleClick(e) {
        const pathOfSelected = path;
        path.push(e.currentTarget.querySelector("p").innerHTML);
        if (findNodeWithPath(pathOfSelected).category === "file") {
            console.log("summon new window to view file");
            // ----------------
            //-----------------

        } else {
            setPath(pathOfSelected);
            setCurrentDir(findNodeWithPath(pathOfSelected));
            history.current.push(path);
        }
        e.stopPropagation();
    }

    function onGoBack() {
        setPath(history.current[history.current.length - 1]);
        history.current.pop();
    }

    function onGoForward() {
        console.log("forward")
    }

    function onGoUp() {
        console.log("------------")
        console.log(path);
        history.current.push(path);
        setPath(path.slice(0, -1));
    }

    function onAddressbarChanged() {

    }


    return (
        <>
            <div className="explorer-controls-container">
                <Menubar />
                <Navbar onGoBack={onGoBack} onGoForward={onGoForward} onGoUp={onGoUp}
                        backDisabled={history.current.length === 0}
                        forwardDisabled={backtrackHistory.current.length === 0}
                        upDisabled={path.length === 0}
                />
                <Addressbar path={path} onAddressbarChanged={onAddressbarChanged} />
            </div>
            <div className="explorer-spacer"></div>
            <ExplorerViewport currentDir={currentDir} onItemDoubleClick={onItemDoubleClick} />
        </>
    );
}