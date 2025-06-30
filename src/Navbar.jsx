export default function Navbar() {
    return (
        <section className="explorer-navbar">
            <button className="back-button" aria-label="back button">
                <img/>
                <p>Back</p>
            </button>
            <button className="forward-button" aria-label="forward button">
                <img/>
                <p>Forward</p>
            </button>
            <button className="up-button" aria-label="move up directory button">
                <img/>
                <p>Up</p>
            </button>
        </section>
    );
}