import { Scrollbar } from 'react-scrollbars-custom';

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
                    <div style={{height: "1000px"}}>
                        <h1>Hello!</h1>
                    </div>
                </Scrollbar>
            </div>
        </div>
    );
}