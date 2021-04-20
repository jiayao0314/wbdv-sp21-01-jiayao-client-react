import React, {useState} from 'react'
import CourseTable from "../course-table/course-table";
import CourseGrid from "../course-grid/course-grid";
import {BrowserRouter as Router, Switch, Link, Route, useParams} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse} from "../../services/course-service";
import CourseEditor from "../course-editor/course-editor";
import CourseManagerHeader from "./course-manager-header";

export default class CourseManager
  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            courseName: ""
        }
    }


  componentDidMount() {
    courseService.findAllCourses()
        // es 6 syntax simplification: a json object property is the same name as value, u can drop the value name
        .then(courses => this.setState({courses}))
        // .then(courses => this.setState({courses: courses}))
  }
  // componentDidMount = () => findAllCourses().then(..)



    deleteCourse = (courseToDelete) => {
        courseService.deleteCourse(courseToDelete._id)
            .then(status => {
                this.setState((prevState) => {
                    let nextState = {}
                    nextState.courses =
                        prevState
                            .courses
                            .filter(course => course !== courseToDelete)
                    return nextState
                })
            })
    }

  updateCourse = (course) => {
    courseService.updateCourse(course._id, course)
        .then(status => {
            this.setState((prevState) => {
                let nextState = {...prevState}
                nextState.courses = prevState.courses.map(c => {
                    if(c._id === course._id) {
                        return course
                    } else {
                        return c
                    }
                })
                return nextState
            })
        })
  }
//
// updateCourse = (course) => {
//     courseService.updateCourse(course._id, course)
//         .then(status => {
//             this.setState((prevState) => ({
//                 ...prevState,
//                 courses: prevState.courses.map(
//                     (c) => c._id === course._id ? course : c)
//                 })
//             )})}


  addCourse = () => {
        // console.log("hello", this.state.courseName)
      // 空的时候可能不会打印东西，要随便加点字符串
    const newCourse = {
      title: this.state.courseName? this.state.courseName : "New Course",
      owner: "me",
      lastModified: "2/10/2021"
    }
    courseService.createCourse(newCourse)
        .then(actualCourse => {
                console.log(actualCourse)
                this.setState(
                    (prevState) => ({
                        ...prevState,
                        courses: [
                            ...prevState.courses,
                            actualCourse
                        ], courseName: ""
                    }))
        })
  }


  // addCourseWithInput(e) {
  //       this.setState({
  //           courseName: e.target.value}
  //       )
  // }

    render() {
        return(
            <div>
                    <Route path="/courses/table" exact={true}>
                        <CourseManagerHeader
                            addCourse={this.addCourse}
                            addCourseWithInput={(event) => this.setState({courseName: event.target.value})}
                            // addCourseWithInput={this.addCourseWithInput}
                            courseName={this.state.courseName}/>
                        <CourseTable
                            updateCourse={this.updateCourse}
                            deleteCourse={this.deleteCourse}
                            courses={this.state.courses}/>
                    </Route>
                    <Route path="/courses/grid" exact={true}>
                        <CourseManagerHeader
                            addCourse={this.addCourse}
                            addCourseWithInput={(event) => this.setState({courseName: event.target.value})}
                            // addCourseWithInput={this.addCourseWithInput}
                            courseName={this.state.courseName}/>
                        <CourseGrid
                            updateCourse={this.updateCourse}
                            deleteCourse={this.deleteCourse}
                            courses={this.state.courses}/>
                    </Route>
            </div>
    )
  }
}
// export default CourseManager
