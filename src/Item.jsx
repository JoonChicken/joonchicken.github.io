export default function Item({additionalClassName, src, name, onClick, onItemDoubleClick, onTab}) {
    return (
        <button className={"explorer-item " + additionalClassName} onClick={onClick} onDoubleClick={onItemDoubleClick}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        onItemDoubleClick(e);
                    } else if (e.key == "Tab") {
                        onTab();
                    }
                }}
        >
            <img src={src} />
            <p>{name}</p>
        </button>
    );
}