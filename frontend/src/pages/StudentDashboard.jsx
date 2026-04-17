import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { User, Mail, Hash, BookOpen } from 'lucide-react';

export default function StudentDashboard() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    nrn_id: ''
  });

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Fetch data locally since it's stored securely in Phase 7 logic
    setUserData({
      name: localStorage.getItem('nrn_user') || 'Unknown',
      email: localStorage.getItem('nrn_email') || 'Not registered',
      nrn_id: localStorage.getItem('nrn_nrnid') || 'NRN-XXXX'
    });
    
    const enrollments = JSON.parse(localStorage.getItem('nrn_enrollments') || '[]');
    setEnrolledCourses(enrollments);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-primary)' }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Student Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome to your personal NRN Control Center.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="md:col-span-1 border rounded-3xl p-8 shadow-2xl h-fit relative overflow-hidden" style={{ backgroundColor: 'var(--secondary-bg-color)', borderColor: 'rgba(255,255,255,0.05)' }}>
             <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] -z-10" style={{ backgroundColor: 'rgba(255, 107, 82, 0.2)' }}></div>
             
             <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl font-black border" style={{ backgroundColor: 'var(--background-color)', color: 'var(--primary-accent)', borderColor: 'rgba(255,107,82,0.3)' }}>
               {userData.name.charAt(0)}
             </div>
             
             <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
             <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-6 inline-block" style={{ backgroundColor: 'var(--background-color)', color: 'var(--primary-accent)' }}>
                Active Learner
             </span>

             <div className="space-y-4 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
               <div>
                 <p className="text-xs uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Registered Email</p>
                 <div className="flex items-center gap-2 font-mono text-sm">
                   <Mail size={16} style={{ color: 'var(--text-secondary)' }}/> {userData.email}
                 </div>
               </div>
               
               <div>
                 <p className="text-xs uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Secure NRN ID</p>
                 <div className="flex items-center gap-2 font-mono text-sm">
                   <Hash size={16} style={{ color: 'var(--text-secondary)' }}/> {userData.nrn_id}
                 </div>
               </div>
             </div>
          </div>

          {/* Right Column: Active Courses */}
          <div className="md:col-span-2 border rounded-3xl p-8 shadow-2xl" style={{ backgroundColor: 'var(--secondary-bg-color)', borderColor: 'rgba(255,255,255,0.05)' }}>
             <div className="flex items-center gap-3 mb-8">
               <BookOpen size={24} style={{ color: 'var(--primary-accent)' }}/>
               <h3 className="text-2xl font-bold">Enrolled Courses</h3>
             </div>

             <div className="space-y-4">
               {enrolledCourses.length === 0 ? (
                 <div className="py-20 text-center rounded-2xl border border-dashed" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                   <p className="text-lg font-semibold mb-2">No Active Enrollments</p>
                   <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                     You have not selected any courses yet. Navigate to the Course Library to expand your NRN knowledge base.
                   </p>
                 </div>
               ) : (
                 enrolledCourses.map(course => (
                   <div key={course.id} className="p-6 rounded-2xl border flex justify-between items-center transition-all hover:border-red-500/50" style={{ backgroundColor: 'var(--background-color)', borderColor: 'rgba(255,255,255,0.05)' }}>
                      <div>
                        <h4 className="text-xl font-bold">{course.title}</h4>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Status: Active In-Progress</p>
                      </div>
                      <button className="px-5 py-2 rounded-lg font-bold text-sm" style={{ backgroundColor: 'var(--primary-accent)', color: 'var(--text-primary)' }}>
                        Resume Learning
                      </button>
                   </div>
                 ))
               )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
