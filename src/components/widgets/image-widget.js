import React from 'react'

const ImageWidget = (
    widget, editing,
    newURL, setNewURL,
    newHeight, setNewHeight,
    newWidth, setNewWidth
) => {
    return (
        <div>
            <h2>Image Widget</h2>
            {
                !editing &&
                    <img src={widget.src}
                         alt={"can not find img"}
                         width={widget.width}
                         height={widget.height}/>
            }
            {
                editing &&
                <div>
                    URL
                    <input value={newURL}
                           onChange={(event) => setNewURL(event.target.value)}
                           className="form-control"/>
                    width
                    <input value={newHeight}
                           onChange={(event) => setNewHeight(event.target.value)}
                           className="form-control"/>
                    height
                    <input value={newWidth}
                           onChange={(event) => setNewWidth(event.target.value)}
                           className="form-control"/>
                </div>
            }
        </div>
    )
}

export default ImageWidget