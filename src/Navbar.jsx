export default function Navbar() {
    return (
        <section className="explorer-controls-row explorer-navbar">
            <div className="tactile-bump">&nbsp;</div>
            <div className="explorer-nav-button-outer" disabled={true}>
                <button className="explorer-nav-button back-button" disabled={true} aria-label="back button">
                    <img className="explorer-nav-button-icon" src="/images/back_button_disabled.png"/>
                    <p>Back</p>
                </button>
            </div>
            <div className="explorer-nav-button-outer" disabled={true}>
                <button className="explorer-nav-button forward-button" disabled={true} aria-label="forward button">
                    <img className="explorer-nav-button-icon" src="/images/forward_button_disabled.png"/>
                    <p>Forward</p>
                </button>
            </div>
            <div className="explorer-nav-button-outer" disabled={true}>
                <button className="explorer-nav-button up-button" disabled={true} aria-label="move up directory button">
                    <img className="explorer-nav-button-icon" src="/images/up_button_disabled.png"/>
                    <p>Up</p>
                </button>
            </div>
        </section>
    );
}