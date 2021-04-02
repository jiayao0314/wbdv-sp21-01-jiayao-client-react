import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import topicService from '../../services/topic-service'
import widgetService from "../../services/widget-service";


const TopicTabs = (
    {
        topics=[],
        findTopicsForLesson,
        createTopicForLesson,
        deleteTopic=(item) => alert("delete topic" + item._id),
        updateTopic,
        findTopic,
    }) => {
    const {layout, courseId, moduleId, lessonId, topicId} = useParams();
    useEffect(() => {
        console.log("LOAD TOPICS FOR LESSON: " + lessonId)
        if(lessonId !== "undefined" && typeof lessonId !== "undefined") {
            findTopicsForLesson(lessonId)
        }
    }, [lessonId]) // when the lessonId is changed, update the state
    return(
        <div>
            <h4 style={{textAlign: "center"}}>Topics</h4>
            <ul className="nav nav-pills">
                {
                    topics.map(topic =>
                        <li key={topic._id}
                            className={`nav-item ${topicId === topic._id ? 'active' : ''}`}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                                updateItem={updateTopic}
                                deleteItem={deleteTopic}
                                findLesson={findTopic}
                                active={true}
                                item={topic}/>
                        </li>
                    )
                }
                <li>
                    <i onClick={() => createTopicForLesson(lessonId)} className="fas fa-plus"></i>
                </li>
            </ul>
        </div>)}

const stpm = (state) => ({
    topics: state.topicReducer.topics
})
const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => {
        console.log("LOAD TOPICS FOR LESSON:")
        console.log(lessonId)
        topicService
            .findTopicsForLesson(lessonId)
            .then(topics => dispatch({
                type: "FIND_TOPICS_FOR_LESSON",
                topics
            }))
        alert("select Topics first or you can not add Widgets!")
        widgetService.findWidgetsForTopic(undefined)
            .then(widgets => dispatch({type: "FIND_WIDGETS_FOR_TOPIC", widgets: undefined}))
    },
    createTopicForLesson: (lessonId) => {
        console.log("CREATE TOPIC FOR LESSON: " + lessonId)
        topicService
            .createTopicForLesson(lessonId, {title: "New Topic"})
            .then(topic => dispatch({
                type: "CREATE_TOPIC",
                topic
            }))
    },
    deleteTopic: (item) =>
        topicService.deleteTopic(item._id)
            .then(status => dispatch({
                type: "DELETE_TOPIC",
                topicToDelete: item
            })),
    updateTopic: (topic) =>
        topicService.updateTopic(topic._id, topic)
            .then(status => dispatch({
                type: "UPDATE_TOPIC",
                topic
            })),
    findTopic: (topicId) =>
        // alert(lessonId);
        topicService.findTopic(topicId)
            .then(theTopic => dispatch({
                type: "FIND_TOPIC",
                topic: theTopic
            })),
})

export default connect(stpm, dtpm)(TopicTabs)