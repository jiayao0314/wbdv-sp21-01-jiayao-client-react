import React, {useState} from 'react'
import {Link} from "react-router-dom";

const CourseRow = (
  {
    course,
    lastModified="1/1/2021",
    owner="who knows?",
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
        <tr>
        <td>
            {
                !editing &&
                <Link to="/editor">
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
        <td className="d-none d-md-table-cell">{course.owner}</td>
        <td className="d-none d-lg-table-cell">{course.lastModified}</td>
        <td>
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
