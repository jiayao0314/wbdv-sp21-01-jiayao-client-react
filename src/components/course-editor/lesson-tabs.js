import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../../services/lesson-service'
import topicService, {findTopicsForLesson} from "../../services/topic-service";


const LessonTabs = (
    {
        lessons=[],
        findLessonsForModule,
        createLessonForModule,
        deleteLesson=(item) => alert("delete lesson" + item._id),
        updateLesson,
        findLesson,
    }) => {
    const {layout, courseId, moduleId, lessonId} = useParams();
    // const {} = useParams();
    useEffect(() => {
        console.log("LOAD LESSONS FOR MODULE: " + moduleId)
        if(moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
    }, [moduleId]) // when the moduleId is changed, update the state

    return(
        <div>
            <h3>Lessons</h3>
            <ul className="nav nav-tabs">
                {
                    lessons.map(lesson =>
                        <li key={lesson._id}
                            className={`nav-item nav-link ${lessonId === lesson._id ? 'active' : ''}`}>
                            <EditableItem
                            to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                            updateItem={updateLesson}
                            deleteItem={deleteLesson}
                            findModule={findLesson}
                            active={true}
                            item={lesson}/>
                        </li>
                    )
                }
                <li>
                    <i onClick={() => createLessonForModule(moduleId)} className="fas fa-plus"></i>
                </li>
            </ul>
        </div>)}

const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})
const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => {
        return (
            lessonService.findLessonsForModule(moduleId)
                .then(lessons => dispatch({
                    type: "FIND_LESSONS_FOR_MODULE",
                    lessons
                })),
            alert("select Lessons first or you can not add Topics!"),
            topicService.findTopicsForLesson(undefined)
                .then(topics => dispatch({type: "FIND_TOPICS_FOR_LESSON", topics: undefined}))
                )},
    createLessonForModule: (moduleId) => {
        console.log("CREATE LESSON FOR MODULE: " + moduleId)
        lessonService
            .createLessonForModule(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({
                type: "CREATE_LESSON",
                lesson
            }))
    },
    deleteLesson: (item) =>
        lessonService.deleteLesson(item._id)
            .then(status => dispatch({
                type: "DELETE_LESSON",
                lessonToDelete: item
            })),
    updateLesson: (lesson) =>
        lessonService.updateLesson(lesson._id, lesson)
            .then(status => dispatch({
                type: "UPDATE_LESSON",
                lesson
            })),
    findLesson: (lessonId) =>
        lessonService.findLesson(lessonId)
            .then(theLesson => dispatch({
                type: "FIND_LESSON",
                lesson: theLesson
            })),
})

export default connect(stpm, dtpm)(LessonTabs)