import React, {useEffect} from "react";
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../../services/module-service"
import lessonService, {findLessonsForModule} from "../../services/lesson-service";
import topicService from "../../services/topic-service";

const ModuleList = (
    {
        myModules=[],
        createModule=() => alert("Create Module 234"),
        deleteModule=(item) => alert("delete " + item._id),
        updateModule,
        findModulesForCourse=(courseId) => console.log(courseId),
        findModule=(moduleId) => console.log(moduleId)
    }) => {
    const {layout, courseId, moduleId} = useParams();
    // const {} = useParams();
    useEffect(() => {
        findModulesForCourse(courseId)
    }, [])
    return (
        <div>
            <h2>Modules</h2>
            <ul className="list-group">
                {
                    myModules.map(module =>
                        <li key={module._id}
                            className={`list-group-item ${moduleId === module._id ? 'active' : ''}`}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
                                findModule={findModule}
                                active={true}
                                item={module}/>
                        </li>
                    )
                }

                <li className="list-group-item">
                    <i onClick={() => createModule(courseId)}
                        className="fas fa-plus fa-2x"></i>
                </li>
            </ul>
        </div>
    )
}

const stpm = (state) => {
    return {
        // myModules: state.modules
        myModules: state.moduleReducer.modules
    }
}

const dtpm = (dispatch) => {
    return {
        createModule: (courseId) => {
            moduleService.createModuleForCourse(courseId, {title: "New Module"})
                .then(theActualModule => dispatch({
                    type: "CREATE_MODULE",
                    module: theActualModule
                }))
        },
        deleteModule: (item) =>
            moduleService.deleteModule(item._id)
                .then(status => dispatch({
                    type: "DELETE_MODULE",
                    moduleToDelete: item
                })),
        updateModule: (module) =>
            moduleService.updateModule(module._id, module)
                .then(status => dispatch({
                    type: "UPDATE_MODULE",
                    module
                })),
        findModulesForCourse: (courseId) => {
            return (
                moduleService.findModulesForCourse(courseId)
                    .then(theModules => dispatch({
                        type: "FIND_MODULES_FOR_COURSE",
                        modules: theModules
                    })),
                alert("select Modules first or you can not add Lessons or Topics!"),
                lessonService.findLessonsForModule(undefined)
                    .then(lessons => dispatch({type: "FIND_LESSONS_FOR_MODULE", lessons: undefined})),
                topicService.findTopicsForLesson(undefined)
                    .then(topics => dispatch({type: "FIND_TOPICS_FOR_LESSON", topics: undefined}))
                )},
        findModule: (moduleId) =>
            // alert(moduleId);
            moduleService.findModule(moduleId)
                .then(theModule => dispatch({
                    type: "FIND_MODULE",
                    module: theModule
                })),
        }
}

export default connect(stpm, dtpm)(ModuleList)

