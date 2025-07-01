import Menubar from "/src/Menubar.jsx"
import Navbar from "/src/Navbar.jsx"
import Addressbar from "/src/Addressbar.jsx"
import ExplorerViewport from "/src/ExplorerViewport";

export default function App() {
    return (
        <>
            <div className="explorer-controls-container">
                <Menubar />
                <Navbar />
                <Addressbar />
            </div>
            <div className="explorer-spacer"></div>
            <ExplorerViewport />
        </>
    );
}