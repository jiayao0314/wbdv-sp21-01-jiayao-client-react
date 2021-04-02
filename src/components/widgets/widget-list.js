import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import ImageWidget from "./image-widget";
import ListWidget from "./list-widget";
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
    const [widget, setWidget] = useState({});

    useEffect(() => {
        if(topicId) {
            findWidgetsForTopic(topicId);
        }
    }, [moduleId, lessonId, topicId])

    const handleChange = (async (event, id) => {
        setWidget(widget => ({...widget, type: event}))
    })
    return(
        <div>
            <i onClick={() => createWidgetForTopic(topicId)} className="fas fa-plus fa-2x float-right"></i>
            <h4>Widget List: click plus to add new one!</h4>
            <ul className="list-group">
                {
                    widgets.map(_widget =>
                        <li className="list-group-item" key={_widget.id}>
                            {
                                _widget.id === widget.id &&
                                <>
                                    <i onClick={() => {
                                        updateWidget(_widget.id, widget);
                                        setWidget({});
                                    }} className="fas fa-2x fa-check float-right"/>
                                    <i onClick={() => deleteWidget(_widget)}
                                       className="fas fa-2x fa-trash float-right"/>
                                    <select defaultValue={_widget.type}
                                            // onChange={(event) => setWidget(widget => ({...widget, type: event.target.value}))}
                                            onChange={(e) => handleChange(e.target.value, _widget.id)}
                                            className="form-control">
                                        <option value={"HEADING"}>Heading</option>
                                        <option value={"PARAGRAPH"}>Paragraph</option>
                                        <option value={"LIST"}>List</option>
                                        <option value={"IMAGE"}>Image</option>
                                    </select>
                                </>
                            }
                            {
                                _widget.id !== widget.id &&
                                <i onClick={() => {
                                    setWidget(_widget)}}
                                   className="fas fa-2x fa-cog float-right"/>
                            }
                            {
                                _widget.type === "HEADING" &&
                                <HeadingWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                            {
                                _widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                            {
                                _widget.type === "LIST" &&
                                <ListWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                            {
                                _widget.type === "IMAGE" &&
                                <ImageWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
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
    createWidgetForTopic: (topicId) => {
        //console.log("CREATE TOPIC FOR LESSON: " + lessonId)
        widgetService
            .createWidgetForTopic(topicId, {type: "HEADING", size: 1, text: "New Widget"})
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget
            }))
    },
    updateWidget: (wid, widget) =>
        widgetService.updateWidget(wid, widget)
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