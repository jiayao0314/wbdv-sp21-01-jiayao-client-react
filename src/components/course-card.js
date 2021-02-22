import React, {useState} from 'react'
import {Link} from "react-router-dom";
import "../course-card/course-card.css";

// const div1 = {
//     width: "300px",
//     margin: "30px auto",
//     backgroundColor: "#44014C",  //驼峰法
//     minHeight: "200px",
//     boxSizing: "border-box"
// };

const CourseCard = ({
    course,
    deleteCourse,
    updateCourse
    }) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(course.title)

    const saveCourse = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: title
        }
        updateCourse(newCourse)
    }

    return(
        <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="card-content">
                <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top" alt="..."/>
                <div className="card-body">
                    {
                        !editing &&
                        <h5 className="card-title">{course.title}</h5>
                    }
                    {
                        editing &&
                        <input
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}/>
                    }
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                        the card's content.</p>
                    <Link to="/editor" className="btn btn-primary">
                        Go somewhere
                    </Link>

                    {
                        editing &&
                        <i onClick={() => deleteCourse(course)} className="my-controls-at-top-right2 fas fa-times" style={{color:"red"}}></i>}
                    {
                        editing &&
                        <i onClick={() => saveCourse()} className="my-controls-at-top-right1 fas fa-check" style={{color:"green"}}></i>
                    }
                    {
                        !editing &&
                        <i onClick={() => setEditing(true)} className="my-controls-at-bottom-right fas fa-edit" style={{color:"blue"}}></i>
                    }
                </div>
            </div>
        </div>
    )
}


export default CourseCard