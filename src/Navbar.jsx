export default function Navbar() {
    return (
        <section className="explorer-controls-row explorer-navbar">
            <div className="tactile-bump">&nbsp;</div>
            <button className="explorer-nav-button back-button" aria-label="back button">
                <div className="explorer-nav-button-inner">
                    <img/>
                    <p>Back</p>
                </div>
            </button>
            <button className="explorer-nav-button forward-button" aria-label="forward button">
                <div className="explorer-nav-button-inner">
                    <img/>
                    <p>Forward</p>
                </div>
            </button>
            <button className="explorer-nav-button up-button" aria-label="move up directory button">
                <div className="explorer-nav-button-inner">
                    <img/>
                    <p>Up</p>
                </div>
            </button>
        </section>
    );
}