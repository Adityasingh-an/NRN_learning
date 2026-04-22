import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, ShieldCheck, Loader2, LayoutDashboard, Database, Settings, Plus, Trash2 } from 'lucide-react';

export default function Admin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Control
  const [activeTab, setActiveTab] = useState('users'); // users, courses, settings
  const [isLoading, setIsLoading] = useState(false);

  // Data States
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [aiLanguages, setAiLanguages] = useState('');

  // Forms State
  const [newCatName, setNewCatName] = useState('');
  const [courseForm, setCourseForm] = useState({ title: '', category_id: '', file_url: '', content_type: 'PDF' });
  const [selectedFile, setSelectedFile] = useState(null);

  // -----------------------------------------------------
  // AUTHENTICATION
  // -----------------------------------------------------
  const handleAdminAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        const data = await res.json();
        setAuthError(data.detail || "Invalid Administrative Credentials");
      }
    } catch (err) {
      setAuthError("Could not connect to security server.");
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------------------------
  // DATA FETCHING
  // -----------------------------------------------------
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [usrRes, catRes, crsRes, setRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/categories`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/courses`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/settings/allowed_languages`)
      ]);
      
      if(usrRes.ok) setUsers(await usrRes.json());
      if(catRes.ok) setCategories(await catRes.json());
      if(crsRes.ok) setCourses(await crsRes.json());
      
      if(setRes.ok) {
        const langData = await setRes.json();
        if (langData.value) {
          try {
            const parsed = JSON.parse(langData.value);
            setAiLanguages(parsed.join(', '));
          } catch(e) {
            setAiLanguages("English"); 
          }
        }
      }
    } catch (err) {
      console.error("Database connection error", err);
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------------------------
  // ACTION HANDLERS
  // -----------------------------------------------------
  const createCategory = async (e) => {
    e.preventDefault();
    if (!newCatName) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/categories`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName, description: "System generated" })
      });
      if(res.ok) {
        const created = await res.json();
        setCategories([...categories, created]);
        setNewCatName('');
      }
    } catch (err) { console.error(err); }
  };
  const createCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.category_id) return alert("Fill all fields");
    
    setIsLoading(true);
    let finalFileUrl = courseForm.file_url;

    try {
      // 1. Handle File Upload if present
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/courses/upload`, {
          method: "POST",
          body: formData
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalFileUrl = uploadData.file_url;
        } else {
          alert("File upload failed. Proceeding with provided URL if any.");
        }
      }

      // 2. Create Course record
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/courses`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: courseForm.title, 
          category_id: parseInt(courseForm.category_id),
          file_url: finalFileUrl,
          content_type: courseForm.content_type
        })
      });

      if(res.ok) {
        const created = await res.json();
        setCourses([...courses, created]);
        setCourseForm({ title: '', category_id: '', file_url: '', content_type: 'PDF' });
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('course-file-input');
        if(fileInput) fileInput.value = '';
      }
    } catch (err) { 
      console.error(err); 
      alert("Error creating course.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if(!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/courses/${id}`, {
        method: "DELETE"
      });
      if(res.ok) {
        setCourses(courses.filter(c => c.id !== id));
      }
    } catch (err) { console.error(err); }
  };
  const saveAiSettings = async () => {
    // Convert "English, Hindi, Spanish" to ["English", "Hindi", "Spanish"]
    const langArray = aiLanguages.split(',').map(s => s.trim()).filter(s => s);
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/settings`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "allowed_languages", value: JSON.stringify(langArray) })
      });
      alert("AI Configuration Updated Successfully across the platform!");
    } catch (err) { console.error(err); }
  };

  // -----------------------------------------------------
  // RENDER SECURITY GATE
  // -----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -z-10"></div>
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <img src="/assets/logo.png" alt="NRN Logo" className="w-6 h-6 object-contain" />
          <span className="font-bold tracking-wide">Return Home</span>
        </Link>

        <div className="w-full max-w-md p-10 rounded-[2rem] bg-zinc-900 border border-red-900/50 shadow-2xl relative">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30">
              <ShieldCheck className="text-red-500" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center mb-2">Restricted Access</h2>
          <p className="text-zinc-500 text-center mb-8 text-sm">NRN Smart Learning Command Center</p>

          {authError && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm mb-4 text-center">{authError}</div>}

          <form onSubmit={handleAdminAuth} className="flex flex-col gap-4">
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-black border border-zinc-800 focus:border-red-500 rounded-xl px-4 py-3 text-white focus:outline-none" placeholder="admin@nrn.com" />
            </div>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-black border border-zinc-800 focus:border-red-500 rounded-xl px-4 py-3 text-white focus:outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full mt-4 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)]">Initialize Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // RENDER MULTI-TAB DASHBOARD
  // -----------------------------------------------------
  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <div className="w-72 bg-zinc-950 border-r border-zinc-900 p-6 flex flex-col shadow-2xl z-10">
        <div className="flex items-center gap-3 mb-10 text-red-500">
          <ShieldCheck size={32} />
          <h2 className="text-2xl font-extrabold tracking-tight text-white">NRN <span className="text-red-500">Admin</span></h2>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-zinc-800 text-white font-bold shadow-lg' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'}`}>
            <Users size={18} /> Global Users Panel
          </button>
          <button onClick={() => setActiveTab('courses')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'courses' ? 'bg-zinc-800 text-white font-bold shadow-lg' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'}`}>
            <BookOpen size={18} /> Course Studio
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-zinc-800 text-white font-bold shadow-lg' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'}`}>
            <Settings size={18} /> AI Settings Matrix
          </button>
        </nav>

        <div className="mt-auto">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 transition-colors">
            Exit Control Center
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-zinc-900/50 p-10 overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-transparent pointer-events-none -z-10"></div>
        
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black">{activeTab === 'users' ? 'Global Database Records' : activeTab === 'courses' ? 'Platform Knowledge Arch' : 'Global AI Directives'}</h1>
          <button onClick={fetchAllData} className="px-5 py-2 bg-black border border-zinc-800 hover:border-zinc-600 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-lg">
            {isLoading ? <Loader2 className="animate-spin" size={16}/> : 'Sync Database'}
          </button>
        </div>

        {/* ----------------- USERS TAB ----------------- */}
        {activeTab === 'users' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
               <div className="p-6 rounded-2xl bg-black border border-red-900/30 relative overflow-hidden">
                 <p className="text-zinc-500 font-bold text-xs tracking-wider uppercase">Total Learners</p>
                 <h2 className="text-4xl font-black mt-2">{users.length}</h2>
                 <div className="absolute right-0 bottom-0 text-red-500/10 p-2"><Users size={64}/></div>
               </div>
            </div>

            <div className="bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
                    <th className="p-5 font-bold">SQL ID</th>
                    <th className="p-5 font-bold">Encrypted NRN Token</th>
                    <th className="p-5 font-bold">Full Name</th>
                    <th className="p-5 font-bold">Email</th>
                    <th className="p-5 font-bold">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-zinc-500">No users found in database.</td></tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id} className="border-t border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                        <td className="p-5 text-zinc-500 text-sm">#{user.id}</td>
                        <td className="p-5 font-mono font-bold text-red-400">{user.nrn_id}</td>
                        <td className="p-5 font-semibold text-white">{user.full_name}</td>
                        <td className="p-5 text-zinc-400 text-sm">{user.email || "N/A"}</td>
                        <td className="p-5 text-zinc-500 text-sm">{new Date(user.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------- COURSES & CATEGORIES TAB ----------------- */}
        {activeTab === 'courses' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Categories Engine */}
              <div className="bg-black border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Database className="text-orange-500" size={20}/> Categories Registry</h3>
                <form onSubmit={createCategory} className="flex gap-2 mb-6">
                  <input type="text" value={newCatName} onChange={(e)=>setNewCatName(e.target.value)} placeholder="New Category (e.g. Science)" className="flex-1 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white focus:border-red-500 outline-none" required />
                  <button type="submit" className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-zinc-200 transition-colors flex items-center"><Plus size={16}/></button>
                </form>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {categories.length === 0 && <p className="text-zinc-600 text-sm p-4 text-center">No categories exist yet.</p>}
                  {categories.map(cat => (
                    <div key={cat.id} className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex justify-between items-center text-sm font-semibold">
                      <span>{cat.name}</span>
                      <span className="text-zinc-500 font-mono text-xs">ID:{cat.id}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courses Engine */}
              <div className="bg-black border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen className="text-blue-500" size={20}/> Active Courses</h3>
                <form onSubmit={createCourse} className="flex flex-col gap-3 mb-6">
                  <select value={courseForm.category_id} onChange={(e)=>setCourseForm({...courseForm, category_id: e.target.value})} className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white focus:border-red-500 outline-none" required>
                    <option value="" disabled>Select Category Parent...</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                  <div className="flex flex-col gap-3">
                    <input type="text" value={courseForm.title} onChange={(e)=>setCourseForm({...courseForm, title: e.target.value})} placeholder="Course Name (e.g. Intro to Biology)" className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white focus:border-red-500 outline-none" required />
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-zinc-500 font-bold ml-1">Upload Document (PDF/Img)</label>
                      <input 
                        id="course-file-input"
                        type="file" 
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white focus:border-red-500 outline-none text-sm" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-zinc-500 font-bold ml-1">OR Provide External URL</label>
                      <input type="text" value={courseForm.file_url} onChange={(e)=>setCourseForm({...courseForm, file_url: e.target.value})} placeholder="Book/PDF URL" className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white focus:border-red-500 outline-none" />
                    </div>
                    <select value={courseForm.content_type} onChange={(e)=>setCourseForm({...courseForm, content_type: e.target.value})} className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white focus:border-red-500 outline-none">
                      <option value="PDF">PDF Document</option>
                      <option value="IDP">IDP Book</option>
                      <option value="TEXT">Plain Text</option>
                      <option value="IMAGE">Image File</option>
                    </select>
                    <button type="submit" disabled={isLoading} className="bg-white text-black px-4 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16}/>}
                      {isLoading ? 'Processing...' : 'Create Course Module'}
                    </button>
                  </div>
                </form>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {courses.length === 0 && <p className="text-zinc-600 text-sm p-4 text-center">No courses deployed.</p>}
                  {courses.map(course => {
                    const parentCat = categories.find(c => c.id === course.category_id);
                    return (
                      <div key={course.id} className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold">{course.title}</p>
                          <p className="text-xs text-zinc-500 mt-1">{parentCat ? parentCat.name : 'Unknown Category'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {course.file_url ? (
                            <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded border border-green-500/20 text-[10px] font-bold">MATERIAL ATTACHED</span>
                          ) : (
                            <span className="px-2 py-1 bg-zinc-800 text-zinc-500 rounded border border-zinc-700 text-[10px] font-bold">NO MATERIAL (AI ONLY)</span>
                          )}
                          <button 
                            onClick={() => deleteCourse(course.id)}
                            className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                            title="Delete Course"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- AI SETTINGS TAB ----------------- */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-black border border-zinc-800 rounded-2xl p-8 shadow-2xl max-w-2xl">
              <div className="flex items-start gap-4 mb-8">
                 <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/30">
                    <img src="/assets/logo.png" alt="NRN Logo" className="w-7 h-7 object-contain" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold">Network Directives</h3>
                    <p className="text-zinc-500 mt-1">Configure global constraints for the Video & Audio system.</p>
                 </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-zinc-300 block mb-2">Permitted AI Languages</label>
                  <p className="text-xs text-zinc-500 mb-3">Which languages is the AI legally allowed to explain courses in? Separate by commas.</p>
                  <input 
                    type="text" 
                    value={aiLanguages}
                    onChange={(e) => setAiLanguages(e.target.value)}
                    placeholder="English, Spanish, Hindi, French"
                    className="w-full bg-zinc-900 border border-zinc-700 px-4 py-4 rounded-xl text-white focus:border-red-500 outline-none font-mono tracking-wide"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-800/50 flex justify-end">
                  <button onClick={saveAiSettings} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all">
                    Commit Changes to Database
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
