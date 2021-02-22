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
      <div>
          <div className="col-sm-12 col-md-4 float-right" >
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
          {/*<Link to="/courses/grid">*/}
          {/*    <i className="fas fa-th float-right fa-2x"></i>*/}
          {/*</Link>*/}
        <h2>Course Table</h2>

        <table className="table">
            <thead></thead>
            <tbody>
              {/*<CourseRow title="CS5610" owner="me"/>*/}
              {/*<CourseRow title="CS3200" owner="you"/>*/}
              {/*<CourseRow title="CS5200" owner="him"/>*/}
              {/*<CourseRow title="CS4550" owner="she"/>*/}
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
