import React from 'react'

const ParagraphWidget = ({widget, setWidget, editing}) => {

    return(
        <>
            {
                editing &&
                <>
                    <textarea defaultValue={widget.text}
                              onChange={(event) => setWidget({...widget, text: event.target.value})}
                              className="form-control"
                              rows={4}
                              cols={40}
                    />
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
