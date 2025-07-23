export default function Addressbar({path, onAddressbarChanged}) {
    var pathStr = path.join("\\");
    if (pathStr === "") {
        pathStr = "My Computer";
    } else if (pathStr[pathStr.length - 1] === ":") {
        pathStr += "\\";
    }

    // consider changing to read & write addressbar later
    // using onAddressbarChanged function

    return (
        <section className="window-controls-row explorer-addressbar">
            <div className="tactile-bump">&nbsp;</div>
            <span>Address</span>
            <div className="path-container">
                <div className="path-container-inner">
                    <img className="hard-disk-icon" src="/images/icons/hard_disk.png"/>
                    <input type="text" className="path" value={pathStr} readOnly />
                </div>
            </div>
        </section>
    );
}