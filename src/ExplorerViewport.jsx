import { Scrollbar } from 'react-scrollbars-custom';
import Item from "/src/Item.jsx"

export default function ExplorerViewport() {
    return (
        <div className="content-panel-body-outer">
            <div className="content-panel-body">
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
                    <div className="viewport" style={{height: "1000px"}}> {/* height will eventually depend on # items passed*/}
                        {/* Viewport content goes below */}
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken" />
                        <Item src="/images/explorer_folder.png" text="joonchicken" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                        <Item src="/images/explorer_folder.png" text="joonchicken.github.io_is_a_project_of_mine" />
                    </div>
                </Scrollbar>
            </div>
        </div>
    );
}