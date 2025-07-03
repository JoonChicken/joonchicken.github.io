export default function Item({additionalClassName, src, name}) {
    return (
        <div className={"explorer-item " + additionalClassName}>
            <img src={src} />
            <p>{name}</p>
        </div>
    );
}