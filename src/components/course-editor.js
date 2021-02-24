import React from 'react'
import {Link} from "react-router-dom";
import "../course-editor/course-editor.style.client.css";

let courseEditorHTML

const CourseEditor = ({history}) => {
    return (
        <div className="body">
            {/*<h1>*/}
            {/*    /!*2. use history*!/*/}
            {/*    <i className="fas fa-arrow-left"*/}
            {/*       onClick={() => history.goBack()}></i>*/}

            {/*    Course Editor*/}
            {/*    /!*1. hard code*!/*/}
            {/*    <Link to="/courses/table">*/}
            {/*        <i className="fas fa-times float-right"></i>*/}
            {/*    </Link>*/}
            {/*</h1>*/}

            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container-fluid course-navbar">
                    {/*<a className="navbar-brand col-4" href="../../public/index.html" className="mr-2 mt-1">*/}
                    <div className="nav-title" onClick={() => history.goBack()}>
                        <i className="fas fa-arrow-left"/>
                            Course Editor
                    </div>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNavDropdown">
                        <ul className="navbar-nav course-editor-nav">
                            <li className="nav-item active">
                                Build
                                {/*<a className="nav-link active" href="#">Build</a>*/}
                            </li>
                            <li className="nav-item ">
                                Pages
                                {/*<a className="nav-link" href="#">Pages</a>*/}
                            </li>
                            <li className="nav-item ">
                                Theme
                                {/*<a className="nav-link" href="#">Theme</a>*/}
                            </li>
                            <li className="nav-item ">
                                Store
                                {/*<a className="nav-link" href="#">Store</a>*/}
                            </li>
                            <li className="nav-item ">
                                Apps
                                {/*<a className="nav-link" href="#">Apps</a>*/}
                            </li>
                            <li className="nav-item ">
                                Settings
                                {/*<a className="nav-link" href="#">Settings</a>*/}
                            </li>
                            <li>
                                <i className="fa fa-plus add-btn "></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid widget-container">
                <div className="row">
                    <div className="col-md-3 module-list text-center">
                        <ul className="nav flex-column nav-pills module-list-pill">
                            <a className="nav-link mr-2 mb-3" href="#">
                                Module 1: HTML/CSS
                                <i className="fa fa-times float-right mt-1 ml-1"></i>
                            </a>
                            <a className="nav-link mr-2 mb-3" href="#">
                                Module 2: jQuery
                                <i className="fa fa-times float-right mt-1 ml-1"></i>
                            </a>
                            <a className="nav-link mr-2 mb-3" href="#">
                                Module 3: React
                                <i className="fa fa-times float-right mt-1 ml-1"></i>
                            </a>
                            <a className="nav-link mr-2 mb-3" href="#">
                                Module 4: Redux
                                <i className="fa fa-times float-right mt-1 ml-1"></i>
                            </a>
                            <a className="nav-link mr-2 mb-3" href="#">
                                Module 5: Angular
                                <i className="fa fa-times float-right mt-1 ml-1"></i>
                            </a>
                            <a className="nav-link mr-2 mb-3" href="#">
                                Module 6: Node
                                <i className="fa fa-times float-right mt-1 ml-1"></i>
                            </a>
                            <a className="nav-link mr-2 mb-3 active" href="#">
                                Module 7: MongoDB
                                <i className="fa fa-times float-right mt-1 ml-1"></i>
                            </a>
                            <a className="nav-link mr-2">
                                <div className="row">
                                    <div className="col-9 col-md-10">
                                    </div>
                                    <div className="col-3 col-md-2">
                                        <button className="btn btn-success" type="submit">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </ul>
                    </div>

                    <div className="col-md-9 topic-list">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="nav nav-pills topic-pill-list">
                                    <li className="nav-item mr-2 mb-2">
                                        <a className="nav-link active" href="#">Topic 1</a>
                                    </li>
                                    <li className="nav-item mr-2 mb-2">
                                        <a className="nav-link " href="#">Topic 2</a>
                                    </li>
                                    <li className="nav-item mr-2 mb-2">
                                        <a className="nav-link" href="#">Topic 3</a>
                                    </li>
                                    <li className="nav-item mr-2 mb-2">
                                        <a className="nav-link" href="#">Topic 4</a>
                                    </li>
                                    <li className="nav-item mr-2 mb-2">
                                        <a className="nav-link" href="#"><i className="fa fa-plus"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-12 text-right">
                                <button className="btn btn-info mr-3">Save</button>
                                <label htmlFor="previewBtn">Preview</label>
                                <input id="previewBtn"
                                       checked data-toggle="toggle"
                                       data-onstyle="success"
                                       data-offstyle="danger"
                                       type="checkbox"/>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            </div>
    )
}


export default CourseEditor

// fas fa-arrow-left