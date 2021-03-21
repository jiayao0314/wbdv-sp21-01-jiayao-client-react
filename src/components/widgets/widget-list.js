import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom";
import widgetService from '../../services/widget-service'

const WidgetList = (
    {
        widgets=[],
        findWidgetsForTopic,
        createWidgetForTopic,
        deleteWidget,
        updateWidget
    }

) => {
    const {moduleId, lessonId, topicId} = useParams();
    const [editingWidget, setEditingWidget] = useState({});

    const [newText, setNewText] = useState("")
    const [newSize, setNewSize] = useState()
    const [newType, setNewType] = useState()

    useEffect(() => {
        findWidgetsForTopic(topicId);
    }, [moduleId, lessonId, topicId])

    return(
        <div>
            <i onClick={() => createWidgetForTopic(topicId)} className="fas fa-plus fa-2x float-right"></i>
            {/*<h2>Widget List ({widgets.length}) {editingWidget.id}</h2>*/}
            <ul className="list-group">
                {
                    widgets.map(widget =>
                        <li className="list-group-item" key={widget.id}>
                            {
                                editingWidget.id === widget.id &&
                                <>
                                    <i onClick={() => {
                                        updateWidget({...editingWidget, text:newText, size:newSize, type:newType});
                                        {setEditingWidget({});}
                                    }} className="fas fa-2x fa-check float-right"></i>
                                    <i onClick={() => deleteWidget(widget)}
                                       className="fas fa-2x fa-trash float-right"></i>
                                </>
                            }
                            {
                                editingWidget.id !== widget.id &&
                                <i onClick={() => {
                                    setEditingWidget(widget);
                                    setNewText(widget.text);
                                    setNewSize(widget.size);
                                    setNewType(widget.type)}}
                                   className="fas fa-2x fa-cog float-right"></i>
                            }
                            {
                                widget.type === "HEADING" &&
                                <HeadingWidget
                                    newText = {newText}
                                    newSize = {newSize}
                                    newType = {newType}
                                    editing={editingWidget.id === widget.id}
                                    updateWidget = {updateWidget}
                                    deleteWidget = {deleteWidget}
                                    setNewText = {setNewText}
                                    setNewSize = {setNewSize}
                                    setNewType = {setNewType}
                                    widget={widget}/>
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    newText = {newText}
                                    newType = {newType}
                                    editing={editingWidget.id === widget.id}
                                    setNewText = {setNewText}
                                    setNewType = {setNewType}
                                    widget={widget}/>
                            }
                        </li>
                    )
                }
            </ul>
            {/*{JSON.stringify(widgets)}*/}
        </div>
    )
}

const stpm = (state) => ({
    widgets: state.widgetReducer.widgets
})
const dtpm = (dispatch) => ({
    findWidgetsForTopic: (topicId) => {
        widgetService.findWidgetsForTopic(topicId)
            .then(widgets => dispatch({
                type: "FIND_WIDGETS",
                widgets
            }))
    },
    createWidgetForTopic: (topicId, type, size, text) => {
        //console.log("CREATE TOPIC FOR LESSON: " + lessonId)
        widgetService
            .createWidgetForTopic(topicId, type, size, text)
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget
            }))
    },
    updateWidget: (widget) =>
        widgetService.updateWidget(widget.id, widget)
            .then(status => dispatch({
                type: "UPDATE_WIDGET",
                widget
            })),
    deleteWidget: (widget) => {
        widgetService.deleteWidget(widget.id)
            .then(status => dispatch({
                type: "DELETE_WIDGET",
                widgetToDelete:widget
            }))
    },

})


export default connect(stpm, dtpm)(WidgetList);