export default function Item({additionalClassName, src, name, onClick}) {
    return (
        <button className={"explorer-item " + additionalClassName} onClick={onClick}>
            <img src={src} />
            <p>{name}</p>
        </button>
    );
}