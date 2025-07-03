import { useState } from "react"

import { Scrollbar } from 'react-scrollbars-custom';
import Item from "/src/Item.jsx"

export default function ExplorerViewport({itemsList}) {
    const imgURLs = {
        folder: "/images/explorer_folder.png",
        folder_selected: "/images/explorer_folder_selected.png",
        file: "/images/note_icon.png",
        file_selected: "/images/note_icon_selected.png"
    }

    const [selectedItemName, setSelectedItemName] = useState(null);

    if (selectedItemName !== null) {
        itemsList = itemsList.map(item => {
            if (item.name == selectedItemName) return {...item, selected: true};
            else return item;
        });
    }

    console.log(itemsList);
    

    return (
        <div className="content-panel-body-outer">
            <div className="content-panel-body">
                <div className="viewport">
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
                        <div className="explorer-items" style={{height: `${Math.ceil(itemsList.length / 5.0) * 122}px`}}>
                            {itemsList.map(item => {
                                var type = item.type;
                                type += item.selected ? "_selected" : "";

                                return <Item
                                            key={item.id}
                                            additionalClassName={item.selected ? "item-selected" : ""}
                                            src={imgURLs[type]}
                                            name={item.name} />;
                            })}
                        </div>
                    </Scrollbar>
                </div>
            </div>
        </div>
    );
}