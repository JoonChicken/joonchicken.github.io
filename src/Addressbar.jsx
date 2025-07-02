export default function Addressbar() {
    return (
        <section className="explorer-controls-row explorer-addressbar">
            <div className="tactile-bump">&nbsp;</div>
            <span>Address</span>
            <div className="path-container">
                <div className="path-container-inner">
                    <img className="hard-disk-icon" src="/images/hard_disk.png"/>
                    <input className="path" defaultValue="C:\projects"/>
                </div>
            </div>
        </section>
    );
}