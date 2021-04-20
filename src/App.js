import './App.css';
import CourseManager from "./components/course-manager/course-manager";
import CourseEditor from "./components/course-editor/course-editor";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home";
import React from "react";
import QuizzesList from "./components/quizzes/quizzes-list";
import Quiz from "./components/quizzes/quiz";
import QuizResults from "./components/quizzes/quiz-results";

function App() {
  return (
      <BrowserRouter>
          <div className="container-fluid">
          <Route path="/" exact={true}
                 component={Home}/>
          <Route path="/courses"
                 component={CourseManager}/>
          <Route path="/courses/:courseId/quizzes" exact={true}>
              <QuizzesList/>
          </Route>
          <Route path="/courses/:courseId/quizzes/:quizId" exact={true}>
              <Quiz/>
          </Route>
          <Route path={"/courses/:courseId/quizzes/:quizId/results"} exact={true}>
              <QuizResults/>
          </Route>
          <Route path={[
              "/courses/:layout/edit/:courseId",
              "/courses/:layout/edit/:courseId/modules/:moduleId",
              "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId",
              "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId",
              "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId/:widgetId"]}
                 exact={true}
                 render={(props) =>
                     <CourseEditor
                         {...props}/>}/>
          </div>
      </BrowserRouter>

  );
}

export default App;
