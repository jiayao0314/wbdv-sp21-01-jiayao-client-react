import './App.css';
import CourseManager from "./components/course-manager/course-manager";
import CourseEditor from "./components/course-editor/course-editor";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"

function App() {
  return (
      <BrowserRouter>
          <div className="container-fluid">
          <Route path="/" exact={true}
                 component={Home}/>
          <Route path="/courses"
                 component={CourseManager}/>
          </div>
      </BrowserRouter>

  );
}

export default App;
