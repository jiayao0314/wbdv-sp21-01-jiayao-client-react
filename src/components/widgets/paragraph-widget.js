import React from 'react'

const ParagraphWidget = (
    {
        widget, editing,
        newText, setNewText,
        newType, setNewType
    }) => {

    return(
        <>
            {
                editing &&
                <>
                    <select value={newType}
                            onChange={(event) => setNewType(event.target.value)}
                            className="form-control">
                        <option value={"HEADING"}>Heading</option>
                        <option value={"PARAGRAPH"}>Paragraph</option>
                        <option value={"VIDEO"}>Video</option>
                        <option value={"IMAGE"}>Image</option>
                        <option value={"LINK"}>Link</option>
                        <option value={"LIST"}>List</option>
                        <option value={"HTML"}>HTML</option>
                    </select>

                    <textarea value={newText}
                              onChange={(event) => setNewText(event.target.value)}
                              className="form-control"></textarea>
                </>
            }
            {
                !editing &&
                <p>
                    {widget.text}
                </p>
            }
        </>
    )
}

export default ParagraphWidget
