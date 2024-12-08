import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import Appbar from "./Appbar.jsx";
import Addcourse from "./Addcourse.jsx";
import Getcourses from "./getcourses"; // Import Getcourses
import Course from "./Course"; // Import CourseDetails (or the appropriate component for course detail page)

function App() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqN3hWwAeNAuIhRPGOnJgw3MIcOQCjudpsNw&s)",
          height: "100vh",
          width: "100vw",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "repeat-y",
        }}
      >
        <Router>
          <Appbar />
          <Routes>
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/login"} element={<Signin />} />
            <Route path={"/addcourse"} element={<Addcourse />} />
            <Route path={"/getcourses"} element={<Getcourses />} />
            <Route path={"/course/:courseId"} element={<Course />} /> {/* Updated course details route */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
