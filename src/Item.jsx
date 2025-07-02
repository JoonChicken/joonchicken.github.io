export default function Item({src, text}) {
    return (
        <div className="explorer-item">
            <img className="explorer-item-icon" src={src} />
            <p className="explorer-item-text">{text}</p>
        </div>
    );
}