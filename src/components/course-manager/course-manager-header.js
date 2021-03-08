import React from 'react';
import {Link} from "react-router-dom";

const CourseManagerHeader = ({
    courseName,
    addCourse,
    addCourseWithInput
    }) => {
    return (
        <>
            <div style={{paddingBottom:'60px'}}>
                <div
                    style={{
                        position: "fixed",
                        color: "red",
                        bottom: "30px",
                        right: "30px",
                        zIndex: "1000"
                    }} >
                    <i onClick={addCourse}
                       className="fa fa-plus-circle fa-4x"/>
                </div>

                <nav className="navbar fixed-top navbar-light bg-light">
                    <a className="button" href="/">
                        <button className="navbar-toggler" type="button" data-toggle="collapse">
                            <span className="navbar-toggler-icon"/>
                        </button>
                    </a>
                    <a className="navbar-brand d-none d-lg-table-cell" href="/">Course Manager</a>

                    <input type="text"
                           value={courseName}
                           onChange={addCourseWithInput}
                           className="form-control col-9 col-sm-9 col-md-8"
                           placeholder="newCourse" />

                    <i onClick={addCourse}
                       className="fas fa-plus-circle float-right fa-2x"
                       style={{color: "red"}} />
                </nav>
            </div>
        </>
    )
}

export default CourseManagerHeader;