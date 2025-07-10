export default function Navbar({onGoBack, onGoForward, onGoUp, backDisabled, forwardDisabled, upDisabled}) {
    return (
        <section className="explorer-controls-row explorer-navbar">
            <div className="tactile-bump">&nbsp;</div>
            <button className="explorer-nav-button back-button" onClick={onGoBack} onTouchEnd={onGoBack} disabled={backDisabled} aria-label="back button">
                <div className="explorer-nav-button-inner">
                    <img className="explorer-nav-button-icon" src={`/images/back_button${backDisabled ? "_disabled" : ""}.png`}/>
                    <p>Back</p>
                </div>
            </button>
            
            <button className="explorer-nav-button forward-button" onClick={onGoForward} onTouchEnd={onGoForward} disabled={forwardDisabled} aria-label="forward button">
                <div className="explorer-nav-button-inner">
                    <img className="explorer-nav-button-icon" src={`/images/forward_button${forwardDisabled ? "_disabled" : ""}.png`}/>
                    <p>Forward</p>
                </div>
            </button>
            <button className="explorer-nav-button up-button" onClick={onGoUp} onTouchEnd={onGoUp} disabled={upDisabled} aria-label="move up directory button">
                <div className="explorer-nav-button-inner">
                    <img className="explorer-nav-button-icon" src={`/images/up_button${upDisabled ? "_disabled" : ""}.png`}/>
                    <p>Up</p>
                </div>
            </button>
        </section>
    );
}