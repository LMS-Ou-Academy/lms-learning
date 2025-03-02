import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrolments from './pages/student/MyEnrolments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Dashboard from './pages/educator/Dashboard';
import Educator from './pages/educator/Educator';
import MyCourses from './pages/educator/MyCourses';
import AddCourse from './pages/educator/AddCourse';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Navbar from './components/student/Navbar';
import 'quill/dist/quill.snow.css'

const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='max-h-screen bg-white text-default'>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrolments' element={<MyEnrolments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;