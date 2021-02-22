import React, {useState} from 'react'
import CourseTable from "./course-table";
import CourseGrid from "./course-grid";
import {Link, Route} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse} from "../services/course-service";
import CourseEditor from "./course-editor";


const stickyBottomRight = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    color: "red",
    zIndex: "10000"
};


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
    const newCourse = {
      title: this.state.courseName,
      owner: "me",
      lastModified: "2/10/2021"
    }
    courseService.createCourse(newCourse)
        .then(actualCourse =>
            this.setState(
                (prevState) => ({
                    ...prevState,
                    courses: [
                        ...prevState.courses,
                        actualCourse
                    ]
                })))
  }


  addCourseWithInput(e) {
        this.setState({
            courseName: e.target.value}
        )
  }

    // onInputChange = e => this.setState({value: e.target.value})

  render() {

    return(
      <div>
        <nav className="navbar fixed-top navbar-light bg-light">

        <Link to="/">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
            </button>
        </Link>
        <a className="navbar-brand d-none d-lg-table-cell" href="/">Course Manager</a>

        <input type="text"
               value={this.state.value}
               onChange={e => this.addCourseWithInput(e)}
               className="form-control col-9 col-sm-9 col-md-8"
               placeholder="newCourse" />

        <i onClick={this.addCourse}
           className="fas fa-plus-circle float-right fa-2x"
           style={{color: "red"}} />


        <div className="row" style={stickyBottomRight}>
            <i onClick={this.addCourse}
               className="fa fa-plus-circle fa-4x"/>
        </div>

        </nav>



        <div style={{padding:"60px"}}>
            {/*<Route path="/courses/table" component={CourseTable}/>*/}
            <Route path="/courses/table" exact={true} >
              <CourseTable
                  updateCourse={this.updateCourse}
                  deleteCourse={this.deleteCourse}
                  courses={this.state.courses}/>
            </Route>
            <Route path="/courses/grid" exact={true} >
                <CourseGrid
                    updateCourse={this.updateCourse}
                    deleteCourse={this.deleteCourse}
                    courses={this.state.courses}/>
            </Route>

            {/*/!*1. original hard code*!/*/}
            {/*<Route path="/courses/editor">*/}
            {/*    <Link to='../../public/static/course-editor.template.client.html'></Link>*/}
            {/*    <CourseEditor />*/}
            {/*</Route>*/}
            {/*  */}
            {/*  /!*2. add render attribute to Route and pass in param props, which can be use in CourseEditor*!/*/}
            {/*  <Route path="courses/editor"*/}
            {/*      render={(props) => <CourseEditor props={props}/>}>*/}
            {/*  </Route>*/}
            {/*  */}

              {/*introduce spread: expand and pass one object, then can be un-wrap and use the target attribute*/}
              <Route path="courses/editor"
                     render={(props) =>
                         <CourseEditor
                             {...props}/>}>
              </Route>
        </div>
      </div>
    )
  }
}
// export default CourseManager
