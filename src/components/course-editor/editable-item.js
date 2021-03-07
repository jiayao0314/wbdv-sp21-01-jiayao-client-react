import React, {useState} from "react";
import {Link} from "react-router-dom";

const EditableItem = ({
        to="/somewhere/to/go",
        deleteItem=() => alert("delete item"),
        updateItem,
        item={title: "Some Title", _id:"ABC"},
        active
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(item)
    return (
        <>
            {
                !editing &&
                <>
                    <Link className={`nav-link ${active ? 'active' : ''}`} to={to}>
                        {item.title}
                        <i onClick={() => setEditing(true)} className="fas fa-edit float-right float-middle"/>
                    </Link>
                </>
            }
            {
                editing &&
                <>
                    <input
                        onChange={(e) =>
                            setCachedItem({
                                ...cachedItem,
                                title: e.target.value
                            })}
                        value={cachedItem.title}/>
                    <i onClick={() => {
                        setEditing(false)
                        updateItem(cachedItem)
                    }} className="fas fa-check"/>
                    <i onClick={() => deleteItem(item)} className="fas fa-times"/>
                </>
            }
        </>
    )}



export default EditableItem