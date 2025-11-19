import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, MessageSquare, Plus, Trash2, LogOut, Edit, Hammer, Save, X, Upload, Home } from 'lucide-react';
import { Project, Service } from '../../types';

const AdminDashboard: React.FC = () => {
  const { 
    settings, updateSettings, 
    adminUsername, adminPassword, updateAdminCredentials,
    projects, addProject, deleteProject, editProject,
    services, addService, deleteService, editService,
    contactSubmissions, logout 
  } = useSite();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'services' | 'settings' | 'messages'>('overview');
  
  // Project Form State
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    category: 'Commercial',
    imageUrl: 'https://picsum.photos/800/600'
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Service Form State
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({
    iconName: 'Building'
  });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Password Change State
  const [credForm, setCredForm] = useState({ username: adminUsername, password: adminPassword });

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'project' | 'service') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'project') {
          setProjectForm(prev => ({ ...prev, imageUrl: result }));
        } else {
          setServiceForm(prev => ({ ...prev, imageUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Project Handlers ---
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectForm.title && projectForm.description && projectForm.location && projectForm.imageUrl && projectForm.category) {
      if (editingProjectId) {
        editProject({
          id: editingProjectId,
          title: projectForm.title,
          description: projectForm.description,
          location: projectForm.location,
          imageUrl: projectForm.imageUrl,
          category: projectForm.category as any
        });
        setEditingProjectId(null);
      } else {
        addProject({
          id: Date.now().toString(),
          title: projectForm.title,
          description: projectForm.description,
          location: projectForm.location,
          imageUrl: projectForm.imageUrl,
          category: projectForm.category as any
        });
      }
      setProjectForm({ title: '', description: '', location: '', category: 'Commercial', imageUrl: 'https://picsum.photos/800/600' });
      alert(editingProjectId ? 'Project updated!' : 'Project added!');
    }
  };

  const startEditProject = (project: Project) => {
    setProjectForm(project);
    setEditingProjectId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProject = () => {
    setProjectForm({ title: '', description: '', location: '', category: 'Commercial', imageUrl: 'https://picsum.photos/800/600' });
    setEditingProjectId(null);
  };

  // --- Service Handlers ---
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceForm.title && serviceForm.shortDescription && serviceForm.fullDescription && serviceForm.iconName) {
      if (editingServiceId) {
        editService({
          id: editingServiceId,
          title: serviceForm.title,
          shortDescription: serviceForm.shortDescription,
          fullDescription: serviceForm.fullDescription,
          iconName: serviceForm.iconName,
          imageUrl: serviceForm.imageUrl
        });
        setEditingServiceId(null);
      } else {
        addService({
          id: Date.now().toString(),
          title: serviceForm.title,
          shortDescription: serviceForm.shortDescription,
          fullDescription: serviceForm.fullDescription,
          iconName: serviceForm.iconName,
          imageUrl: serviceForm.imageUrl
        });
      }
      setServiceForm({ title: '', shortDescription: '', fullDescription: '', iconName: 'Building', imageUrl: '' });
      alert(editingServiceId ? 'Service updated!' : 'Service added!');
    }
  };

  const startEditService = (service: Service) => {
    setServiceForm(service);
    setEditingServiceId(service.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditService = () => {
    setServiceForm({ title: '', shortDescription: '', fullDescription: '', iconName: 'Building', imageUrl: '' });
    setEditingServiceId(null);
  };

  // --- Settings Handler ---
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminCredentials(credForm.username, credForm.password);
    alert('Login credentials updated successfully.');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0">
        <Link to="/" className="p-6 text-xl font-bold border-b border-blue-800 flex items-center gap-2 hover:text-secondary transition cursor-pointer" title="Go to Home Page">
          <Home size={24} />
          <span>Janak Admin</span>
        </Link>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'overview' ? 'bg-secondary text-primary font-bold' : 'hover:bg-white/10'}`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'services' ? 'bg-secondary text-primary font-bold' : 'hover:bg-white/10'}`}
          >
            <Hammer size={20} /> Services
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'projects' ? 'bg-secondary text-primary font-bold' : 'hover:bg-white/10'}`}
          >
            <FileText size={20} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'messages' ? 'bg-secondary text-primary font-bold' : 'hover:bg-white/10'}`}
          >
            <MessageSquare size={20} /> Messages ({contactSubmissions.length})
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'settings' ? 'bg-secondary text-primary font-bold' : 'hover:bg-white/10'}`}
          >
            <Settings size={20} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-gray-400 hover:text-white transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-secondary">
                <h3 className="text-gray-500 mb-2">Total Projects</h3>
                <p className="text-3xl font-bold text-primary">{projects.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-secondary">
                <h3 className="text-gray-500 mb-2">Total Services</h3>
                <p className="text-3xl font-bold text-primary">{services.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-secondary">
                <h3 className="text-gray-500 mb-2">New Messages</h3>
                <p className="text-3xl font-bold text-primary">{contactSubmissions.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Services</h2>
            
            {/* Add/Edit Service Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2 text-primary">
                  {editingServiceId ? <Edit size={18} /> : <Plus size={18} />} 
                  {editingServiceId ? 'Edit Service' : 'Add New Service'}
                </h3>
                {editingServiceId && (
                  <button onClick={cancelEditService} className="text-sm text-red-500 flex items-center gap-1 hover:underline"><X size={14} /> Cancel Edit</button>
                )}
              </div>
              
              <form onSubmit={handleSaveService} className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input 
                    placeholder="Service Title" 
                    className="border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={serviceForm.title || ''}
                    onChange={e => setServiceForm({...serviceForm, title: e.target.value})}
                  />
                  <input 
                    placeholder="Icon Name (e.g. Building, Home, Key)" 
                    className="border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={serviceForm.iconName || ''}
                    onChange={e => setServiceForm({...serviceForm, iconName: e.target.value})}
                  />
                </div>
                
                {/* Service Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Service Image (Optional - Overrides Icon)</label>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                      {serviceForm.imageUrl && (
                          <img src={serviceForm.imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded border bg-gray-100" />
                      )}
                      <div className="flex-1 w-full">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'service')}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload image from device</p>
                      </div>
                  </div>
                </div>

                <input 
                  placeholder="Short Description" 
                  className="border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                  value={serviceForm.shortDescription || ''}
                  onChange={e => setServiceForm({...serviceForm, shortDescription: e.target.value})}
                />
                <textarea 
                  placeholder="Full Description" 
                  rows={3}
                  className="border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                  value={serviceForm.fullDescription || ''}
                  onChange={e => setServiceForm({...serviceForm, fullDescription: e.target.value})}
                />
                <button type="submit" className="bg-secondary text-primary font-bold py-3 rounded hover:bg-yellow-400 transition flex justify-center items-center gap-2">
                  {editingServiceId ? <Save size={18} /> : <Plus size={18} />}
                  {editingServiceId ? 'Update Service' : 'Add Service'}
                </button>
              </form>
            </div>

            {/* Services List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4 hidden md:table-cell">Short Description</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(s => (
                    <tr key={s.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 font-medium flex items-center gap-2">
                        {s.imageUrl ? (
                          <img src={s.imageUrl} alt="" className="w-8 h-8 rounded object-cover border" />
                        ) : (
                          <span className="bg-gray-200 text-xs px-2 py-1 rounded">{s.iconName}</span>
                        )}
                        {s.title}
                      </td>
                      <td className="p-4 text-sm text-gray-600 hidden md:table-cell max-w-md truncate">{s.shortDescription}</td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => startEditService(s)} className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => deleteService(s.id)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Projects</h2>
            
            {/* Add/Edit Project Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2 text-primary">
                  {editingProjectId ? <Edit size={18} /> : <Plus size={18} />} 
                  {editingProjectId ? 'Edit Project' : 'Add New Project'}
                </h3>
                {editingProjectId && (
                  <button onClick={cancelEditProject} className="text-sm text-red-500 flex items-center gap-1 hover:underline"><X size={14} /> Cancel Edit</button>
                )}
              </div>

              <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  placeholder="Project Title" 
                  className="border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                  value={projectForm.title || ''}
                  onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                />
                <select 
                  className="border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                  value={projectForm.category}
                  onChange={e => setProjectForm({...projectForm, category: e.target.value as any})}
                >
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Renovation">Renovation</option>
                </select>
                <input 
                  placeholder="Location" 
                  className="border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                  value={projectForm.location || ''}
                  onChange={e => setProjectForm({...projectForm, location: e.target.value})}
                />
                
                {/* Project Image Upload */}
                <div className="md:col-span-2 space-y-2 border p-4 rounded bg-gray-50">
                  <label className="block text-sm font-bold text-gray-700">Project Image</label>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                      {projectForm.imageUrl && (
                          <img src={projectForm.imageUrl} alt="Preview" className="w-32 h-24 object-cover rounded border bg-white" />
                      )}
                      <div className="flex-1 w-full">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'project')}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 bg-white"
                        />
                        <div className="text-center my-2 text-gray-400 text-xs">- OR -</div>
                        <input 
                          placeholder="Paste Image URL directly" 
                          className="w-full border p-2 rounded text-sm text-gray-600 focus:ring-2 focus:ring-primary outline-none"
                          value={projectForm.imageUrl || ''}
                          onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})}
                        />
                      </div>
                  </div>
                </div>

                <textarea 
                  placeholder="Description" 
                  className="border p-3 rounded md:col-span-2 focus:ring-2 focus:ring-primary outline-none"
                  rows={3}
                  value={projectForm.description || ''}
                  onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                />
                <button type="submit" className="bg-secondary text-primary font-bold py-3 rounded md:col-span-2 hover:bg-yellow-400 transition flex justify-center items-center gap-2">
                   {editingProjectId ? <Save size={18} /> : <Plus size={18} />}
                   {editingProjectId ? 'Update Project' : 'Add Project'}
                </button>
              </form>
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4 hidden md:table-cell">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 font-medium flex items-center gap-2">
                        <img src={p.imageUrl} alt="" className="w-10 h-10 object-cover rounded border" />
                        {p.title}
                      </td>
                      <td className="p-4 text-sm text-gray-600 hidden md:table-cell">
                        <span className="bg-gray-100 px-2 py-1 rounded border">{p.category}</span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => startEditProject(p)} className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => deleteProject(p.id)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
               {/* General Settings */}
               <div className="bg-white p-6 rounded-lg shadow h-fit">
                  <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Site Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
                      <input 
                        value={settings.companyName} 
                        onChange={(e) => updateSettings({...settings, companyName: e.target.value})}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Tagline</label>
                      <input 
                        value={settings.tagline} 
                        onChange={(e) => updateSettings({...settings, tagline: e.target.value})}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                      <input 
                        value={settings.phone} 
                        onChange={(e) => updateSettings({...settings, phone: e.target.value})}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                     <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                      <input 
                        value={settings.address} 
                        onChange={(e) => updateSettings({...settings, address: e.target.value})}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
               </div>

               {/* Admin Security */}
               <div className="bg-white p-6 rounded-lg shadow h-fit">
                  <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Admin Security</h3>
                  <form onSubmit={handleUpdateCredentials} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Admin Username</label>
                      <input 
                        value={credForm.username} 
                        onChange={(e) => setCredForm({...credForm, username: e.target.value})}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                      <input 
                        value={credForm.password} 
                        onChange={(e) => setCredForm({...credForm, password: e.target.value})}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition">
                      Update Login Credentials
                    </button>
                  </form>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Form Submissions</h2>
             {contactSubmissions.length === 0 ? (
               <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500">
                 <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                 <p>No messages received yet.</p>
               </div>
             ) : (
               <div className="space-y-4">
                 {contactSubmissions.map(msg => (
                   <div key={msg.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-primary hover:shadow-md transition">
                     <div className="flex justify-between mb-2">
                       <h4 className="font-bold text-lg">{msg.name} <span className="text-gray-500 text-sm font-normal">&lt;{msg.email}&gt;</span></h4>
                       <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{msg.date}</span>
                     </div>
                     <p className="font-semibold text-sm text-secondary uppercase tracking-wide mb-2">{msg.subject}</p>
                     <div className="bg-gray-50 p-4 rounded text-gray-700 text-sm whitespace-pre-wrap">
                        {msg.message}
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;