import { useState, useEffect, useRef } from "react"

import { Scrollbar } from 'react-scrollbars-custom';
import Item from "/src/Item.jsx"

export default function ExplorerViewport({currentDir, onItemDoubleClick}) {
    var dirname = currentDir.category == "drive" ? `(${currentDir.name})` : currentDir.name;
    var itemsList = currentDir.children;

    const imgURLs = {
        folder: "/images/explorer_folder.png",
        folder_selected: "/images/explorer_folder_selected.png",
        trojan: "/images/explorer_folder.png",
        trojan_selected: "/images/explorer_folder_selected.png",
        note: "/images/note_icon.png",
        note_selected: "/images/note_icon_selected.png",
        jpg: "/images/photo.ico",
        jpg_selected: "/images/photo.ico",
        python: "/images/python.png",
        python_selected : "/images/python_selected.png",
        drive: "/images/hard_disk_large.png",
        drive_selected: "/images/hard_disk_large_selected.png"
    }

    const itemDesc = {
        folder: "File Folder",
        trojan: "trojan.exe",
        note: "NOTE File",
        drive: "Local Disk",
        python : "Python Source File"
    }

   // Preloading the above images; effect runs on initial render and never again 
    useEffect(() => {
        Object.values(imgURLs).forEach((filename) => {
            new Image().src = filename;
        });
    }, []);

    const [selectedItemName, setSelectedItemName] = useState(null);
    var selectedItemDesc = "Select an item to view its description.";
    const focusedItemName = useRef(null);

    useEffect(() => {
        setSelectedItemName(null);
    }, [currentDir]);


    if (selectedItemName !== null) {
        itemsList = itemsList.map(item => {
            if (item.name == selectedItemName) {
                selectedItemDesc = itemDesc[item.type];
                return {...item, selected: true};
            } else return item;
        });
        focusedItemName.current = null;
    }

    // selects the Item that is clicked
    function itemClicked(e) {
        setSelectedItemName(e.currentTarget.querySelector("p").innerText);
        e.stopPropagation();
    }

    // clears Item selection when the background is clicked and replaces text
    // highlighting with a dotted "focused" box
    function bgClicked() {
        focusedItemName.current = selectedItemName;
        setSelectedItemName(null);
        selectedItemDesc = "Select an item to view its description.";
    }

    // selects the Item that is tabbed to
    function onTab() {
        setSelectedItemName(document.activeElement.querySelector("p").innerText);
    }
    

    return (
        <div className="content-panel-body-outer">
            <div className="content-panel-body">
                <div className="viewport" onClick={bgClicked}>
                    <div className="explorer-description-sidebar">
                        <img className="file-icon" src={imgURLs[currentDir.type]}/>
                        <h2>{dirname}</h2>
                        <img className="bar" src="/images/explorer_description_bar.png" />
                        <h3>{selectedItemName}</h3>
                        <p>{selectedItemDesc}</p>
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
                                            key={item.name}
                                            additionalClassName={classes}
                                            src={imgURLs[type]}
                                            name={item.name}
                                            onClick={itemClicked}
                                            onItemDoubleClick={onItemDoubleClick}
                                            onTab={onTab}
                                        />;
                            })}
                        </div>
                    </Scrollbar>
                </div>
            </div>
        </div>
    );
}