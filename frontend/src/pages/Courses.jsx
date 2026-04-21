import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { BookOpen, AlertCircle, FileText } from 'lucide-react';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [crsRes, catRes] = await Promise.all([
          fetch("http://localhost:8000/api/admin/courses"),
          fetch("http://localhost:8000/api/admin/categories")
        ]);
        if (crsRes.ok) setCourses(await crsRes.json());
        if (catRes.ok) setCategories(await catRes.json());
      } catch (err) {
        console.error("Failed to load catalog", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-primary)' }}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 border-b pb-6" style={{ borderColor: 'var(--secondary-bg-color)' }}>
          <h1 className="text-4xl font-black tracking-tight mb-3">Course Library</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Explore modules governed by the central NRN Administrative Control System.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-orange-500 animate-pulse">
            <BookOpen size={48} />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-32 rounded-3xl" style={{ backgroundColor: 'var(--secondary-bg-color)' }}>
            <AlertCircle size={48} style={{ color: 'var(--text-secondary)' }} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No Courses Available</h3>
            <p style={{ color: 'var(--text-secondary)' }}>The Administration has not deployed any course modules yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => {
              const category = categories.find(c => c.id === course.category_id);
              return (
                <div key={course.id} className="group rounded-3xl p-8 transition-all hover:-translate-y-2 relative overflow-hidden" style={{ backgroundColor: 'var(--secondary-bg-color)' }}>
                  
                  {/* Accent Highlight */}
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: 'var(--primary-accent)' }}></div>
                  
                  <div className="mb-6 flex justify-between items-start">
                     <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 107, 82, 0.1)', color: 'var(--primary-accent)' }}>
                       {category ? category.name : 'General'}
                     </span>
                     <FileText size={20} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3">{course.title}</h3>
                  <p className="text-sm mb-6 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                    {course.description || "Detailed course documentation and theoretical explanations controlled by NRN Artificial Intelligence parameters."}
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <button className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-80 flex justify-center items-center gap-2" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-primary)' }}>
                      Launch AI Tutor Session
                    </button>
                    <button 
                      onClick={() => {
                        const storedId = localStorage.getItem('nrn_nrnid');
                        const enrollmentsKey = `nrn_enrollments_${storedId && storedId !== 'undefined' ? storedId : 'GUEST'}`;
                        const enrolled = JSON.parse(localStorage.getItem(enrollmentsKey) || '[]');
                        
                        if (!enrolled.find(e => e.id === course.id)) {
                          localStorage.setItem(enrollmentsKey, JSON.stringify([...enrolled, course]));
                          alert(`Enrolled in ${course.title}! Check your dashboard.`);
                        } else {
                          alert("You are already enrolled in this course.");
                        }
                      }}
                      className="w-full py-3 rounded-xl font-bold text-sm border hover:bg-white/5 transition-all mb-2" 
                      style={{ borderColor: 'var(--secondary-bg-color)' }}
                    >
                      Enroll in Course
                    </button>

                    {course.file_url && (
                      <button 
                        onClick={() => window.open(course.file_url, '_blank')}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-orange-500/10 text-orange-500 border border-orange-500/30 hover:bg-orange-500/20 transition-all flex justify-center items-center gap-2"
                      >
                        <FileText size={16} /> Read Material
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
