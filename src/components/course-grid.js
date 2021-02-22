import React from 'react'
import {Link} from "react-router-dom";
import CourseEditor from "./course-editor";
import CourseCard from "./course-card";
import CourseRow from "./course-row";

const CourseGrid = ({
    courses,
    deleteCourse,
    updateCourse,
    }) =>
    <div>

        <div className="row">
            <h4 className="col-md-4 d-none d-md-block">Recent Documents</h4>
            <h4 className="col-md-4 d-none d-md-block">Owned by me
                <i className="fas fa-sort-down"></i>
            </h4>
            <div className="col-sm-12 col-md-4 float-right" >
                <Link to="/courses/table">
                    <i className="float-right fas fa-2x fa-list"></i>
                </Link>
                <Link to="/courses/table">
                    <i className="float-right fas fa-2x fas fa-sort-alpha-up-alt" style={{paddingRight: "15px"}}></i>
                </Link>
                <Link to="/courses/table">
                    <i className="float-right fas fa-2x fa-file" style={{paddingRight: "15px"}}></i>
                </Link>
            </div>

        </div>

        <div className="row">
            {/*<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 ">*/}
                {
                    courses.map(course =>
                        <CourseCard
                            key={course._id}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            course={course}/>
                    )
                }
            {/*</div>*/}
        </div>

    </div>

export default CourseGrid
