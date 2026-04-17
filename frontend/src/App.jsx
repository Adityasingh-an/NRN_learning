import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Tutor from './pages/Tutor';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Courses from './pages/Courses';
import StudentDashboard from './pages/StudentDashboard';
import About from './pages/About';
import Facilities from './pages/Facilities';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/facilities" element={<Facilities />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
