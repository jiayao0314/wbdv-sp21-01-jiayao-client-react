import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";



export default class CourseTable extends
  React.Component {

    constructor(props) {
        super(props);
    }

  render() {
    return(
      <div className="row">
          <div className="col-6 col-md-4">Title</div>
          <div className="col-md-3 d-none d-md-block">Owned by</div>
          <div className="col-md-2 d-none d-lg-block">Last modified</div>
          <div className="col-6 col-md-3 float-right" >
              <Link to="/courses/grid">
                  <i className="float-right fas fa-2x fa-th"></i>
              </Link>
              <Link to="/courses/grid">
                  <i className="float-right fas fa-2x fas fa-sort-alpha-up-alt" style={{paddingRight: "15px"}}></i>
              </Link>
              <Link to="/courses/grid">
                  <i className="float-right fas fa-2x fa-file" style={{paddingRight: "15px"}}></i>
              </Link>
          </div>

        <table className="table">
            <thead></thead>
            <tbody>

              {
                this.props.courses.map(course =>
                  <CourseRow
                      key={course._id}
                      deleteCourse={this.props.deleteCourse}
                      updateCourse={this.props.updateCourse}
                    course={course}
                    title={course.title}
                    lastModified={course.lastModified}
                    owner={course.owner}/>)
              }
            </tbody>
        </table>
      </div>
    )
  }
}
