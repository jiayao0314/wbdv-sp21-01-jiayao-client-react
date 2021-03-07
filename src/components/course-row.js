import React, {useState} from 'react'
import {Link} from "react-router-dom";

const CourseRow = (
  {
    course,
    lastModified="1/1/2021",
    owner="who knows?",
      deleteCourse,
      updateCourse,
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
        <tr className="row">
        <td className="col-6 col-md-4">
            {
                !editing &&
                <Link to={`/courses/table/edit/${course._id}`}>
                    <i className="fa fa-file" style={{padding:"10px"}}></i>
                    {course.title}
                </Link>
            }
            {
                editing &&
                <input
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}/>
            }
        </td>
        <td className="col-md-3 d-none d-md-block">{course.owner}</td>
        <td className="col-md-2 d-none d-lg-block">{course.lastModified}</td>
        <td className="col-6 col-md-3">
            {
                editing &&
                <i onClick={() => deleteCourse(course)} className="fas fa-times float-right" style={{color: "red"}}/>}
            {/*<i onClick={() => setEditing((prevEditing) => !prevEditing)} className="fas fa-edit"></i>*/}

            {
                editing &&
                <i onClick={() => saveCourse()} className="fas fa-check float-right" style={{color: "green"}}/>
            }

            {
                !editing &&
                <i onClick={() => setEditing(true)} className="fas fa-edit float-right" style={{color: "blue"}}/>
            }


        </td>
    </tr>)
}

export default CourseRow
