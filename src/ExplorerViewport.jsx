import { useState, useEffect, useRef } from "react"

import { Scrollbar } from 'react-scrollbars-custom';
import Item from "/src/Item.jsx"

export default function ExplorerViewport({itemsList}) {
    const imgURLs = {
        folder: "/images/explorer_folder.png",
        folder_selected: "/images/explorer_folder_selected.png",
        file: "/images/note_icon.png",
        file_selected: "/images/note_icon_selected.png"
    }

   // Preloading the above images; effect runs on initial render and never again 
    useEffect(() => {
        Object.values(imgURLs).forEach((filename) => {
            new Image().src = filename;
        });
    }, []);

    const [selectedItemName, setSelectedItemName] = useState(null);
    const focusedItemName = useRef(null);

    // 
    if (selectedItemName !== null) {
        itemsList = itemsList.map(item => {
            if (item.name == selectedItemName) return {...item, selected: true};
            else return item;
        });
    }

    function itemClicked(e) {
        setSelectedItemName(e.currentTarget.querySelector("p").innerHTML);
        focusedItemName.current = null;
        e.stopPropagation();
    }

    function bgClicked() {
        focusedItemName.current = selectedItemName;
        setSelectedItemName(null);
    }
    

    return (
        <div className="content-panel-body-outer">
            <div className="content-panel-body">
                <div className="viewport" onClick={bgClicked}>
                    <div className="explorer-description-sidebar">
                        <img className="file-icon" src={"/images/hard_disk_large.png"}/>
                        <h2>{"(C:)"}</h2>
                        <img className="bar" src="/images/explorer_description_bar.png" />
                        <p>Select an item to view its description.</p>
                    </div>
                    <Scrollbar noScrollX
                        thumbYProps={{
                            renderer: (props) => {
                                const { elementRef, ...restProps } = props;
                                return (<div {...restProps} ref={elementRef} children={
                                    <div className="thumbYInnerDiv"></div>
                                }></div>);
                            },
                        }}
                    >
                        <div className="explorer-items" style={{height: `${Math.ceil(itemsList.length / 5.0) * 114}px`}}>
                            {itemsList.map(item => {
                                let type = item.type;
                                type += item.selected ? "_selected" : "";

                                let classes = item.selected ? "item-selected" : "";
                                classes += focusedItemName.current === item.name ? " item-focused" : "";

                                return <Item
                                            key={item.id}
                                            additionalClassName={classes}
                                            src={imgURLs[type]}
                                            name={item.name}
                                            onClick={itemClicked}
                                        />;
                            })}
                        </div>
                    </Scrollbar>
                </div>
            </div>
        </div>
    );
}