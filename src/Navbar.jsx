export default function Navbar() {
    return (
        <section className="explorer-controls-row explorer-navbar">
            <div className="tactile-bump">&nbsp;</div>
            <button className="explorer-nav-button back-button" disabled={false} aria-label="back button">
                <div className="explorer-nav-button-inner">
                    <img className="explorer-nav-button-icon" src="/images/back_button.png"/>
                    <p>Back</p>
                </div>
            </button>
            
            <button className="explorer-nav-button forward-button" disabled={true} aria-label="forward button">
                <div className="explorer-nav-button-inner">
                    <img className="explorer-nav-button-icon" src="/images/forward_button_disabled.png"/>
                    <p>Forward</p>
                </div>
            </button>
            <button className="explorer-nav-button up-button" disabled={false} aria-label="move up directory button">
                <div className="explorer-nav-button-inner">
                    <img className="explorer-nav-button-icon" src="/images/up_button.png"/>
                    <p>Up</p>
                </div>
            </button>
        </section>
    );
}