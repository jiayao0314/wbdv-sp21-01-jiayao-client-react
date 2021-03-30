// import React from 'react'
//
// const ListWidget = ({
//     widget, editing
//     }) => {
//     return (
//         <div>
//             <h2>List Widget</h2>
//             {
//                 !editing &&
//                     <>
//                         {
//                             widget.ordered &&
//                                 <ol>
//                                     {
//                                         widget.text.split("\n").map(item => {
//                                             return (
//                                                 <li>{item}</li>
//                                             )
//                                         })
//                                     }
//                                 </ol>
//                         }
//                         {
//                             !widget.ordered &&
//                                 <ul>
//                                     {
//                                         widget.text.split("\n").map(item => {
//                                             return (
//                                                 <li>{item}</li>
//                                             )
//                                         })
//                                     }
//                                 </ul>
//                         }
//                     </>
//             }
//             {
//                 editing &&
//                     <div>
//                         <input checked={widget.ordered} type="checkbox">Ordered</input>
//                         <br/>
//                         List Items
//                         <textarea rows={10} value={widget.text} className="form-control"></textarea>
//                     </div>
//             }
//         </div>
//         )
//     }
//
// export default ListWidget

import React from 'react'

const ListWidget = (
    widget, editing,
    newOrdered, setNewOrdered,
    newText, setNewText,
) => {
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
                                    return (
                                        <li>{item}</li>
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
                                    return (
                                        <li>{item}</li>
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
                    <input
                        checked={newOrdered}
                        onChange={(event) => setNewOrdered(event.target.checked)}

                        // checked={widget.ordered}
                        type="checkbox">
                        Ordered
                    </input>
                    <br/>
                    List Items
                    <textarea rows={10}
                              value={newText}
                              onChange={(event) => setNewText(event.target.value)}
                              className="form-control"/>
                    {/*<textarea rows={10} value={widget.text} className="form-control"></textarea>*/}
                </div>
            }
        </div>
    )
}

export default ListWidget