import React, {useState} from 'react'

const ListWidget = ({widget, setWidget, editing}) => {

    const [checkValue, setCheckValue] = useState(widget.ordered)

    const handleCheckValue =  () => {
        setCheckValue(!checkValue);
        setWidget({...widget, ordered:!checkValue})
    }

    return (
        <div>
            <h2>List Widget</h2>
            {
                !editing &&
                <>
                    {
                        widget.ordered &&
                        <ol>
                            {
                                widget.text.split("\n").map(item => {
                                    return(
                                        <li key={item._id}>{item}</li>
                                    )
                                })
                            }
                        </ol>
                    }
                    {
                        !widget.ordered &&
                        <ul>
                            {
                                widget.text.split("\n").map(item => {
                                    return(
                                        <li key={item._id}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    }
                </>
            }
            {
                editing &&
                <div>
                    <input id={widget.id} type="checkbox" defaultChecked={checkValue} onClick={(e) => {
                        handleCheckValue()
                    }}/> Ordered
                    <br/>
                    List Items
                    <textarea rows={10} defaultValue={widget.text} className="form-control"
                              onChange={(e) => setWidget({...widget, text: e.target.value})}>

                    </textarea>
                </div>
            }
        </div>
    )
}

export default ListWidget