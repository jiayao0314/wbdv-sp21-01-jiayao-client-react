import React from 'react'
import {Link, useParams} from "react-router-dom";
import "./course-editor.style.client.css";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import moduleReducer from "../../reducer/module-reducer";
import lessonReducer from "../../reducer/lesson-reducer";
import topicReducer from "../../reducer/topic-reducer";
import widgetReducer from "../../reducer/widget-reducer";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import TopicTabs from "./topic-pills";
import WidgetList from "../widgets/widget-list";

const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer,
    widgetReducer:widgetReducer
})

const store = createStore(reducer)

const CourseEditor = ({history}) => {
    // const {courseId, moduleId, lessonId} = useParams();
    const {layout} = useParams();
    return (
        <Provider store={store}>
            <div className="body">
                <Link className="fas fa-arrow-left"
                   to={`/courses/${layout}`}/>
                Course Editor
                <i onClick={() => history.goBack()}
                   className="fas fa-times float-right"></i>
                <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="container-fluid widget-container">
                    <div className="row">
                        <div className="col-md-3 module-list text-center">
                            <ModuleList/>
                        </div>

                        <div className="col-md-9 topic-list">
                            <LessonTabs/>
                            <TopicTabs/>
                            <WidgetList/>
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    )
}


export default CourseEditor

// fas fa-arrow-left