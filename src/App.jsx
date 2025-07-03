import { useState } from "react"
import file_tree from "/src/file_tree.js"

import Menubar from "/src/Menubar.jsx"
import Navbar from "/src/Navbar.jsx"
import Addressbar from "/src/Addressbar.jsx"
import ExplorerViewport from "/src/ExplorerViewport";

export default function App() {
    const [itemsList, setItemsList] = useState(file_tree);

    return (
        <>
            <div className="explorer-controls-container">
                <Menubar />
                <Navbar />
                <Addressbar />
            </div>
            <div className="explorer-spacer"></div>
            <ExplorerViewport itemsList={itemsList} />
        </>
    );
}