import { Image as ImageIcon, X, UploadCloud } from 'lucide-react';
import { useRef } from 'react';

export default function ImageUploader({ isOpen, onClose }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // NOTE: Wiring this to Gemini Multi-Modal backend goes here in the future
      onClose();
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[400px] p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-[0_0_50px_rgba(255,107,82,0.15)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-white flex items-center gap-2">
            <ImageIcon className="text-orange-400" /> Upload Media
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div 
          onClick={handleBrowseFiles}
          className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 flex flex-col items-center justify-center group hover:border-orange-500/50 hover:bg-zinc-800/30 transition-all cursor-pointer"
        >
          <UploadCloud size={48} className="text-zinc-600 group-hover:text-orange-400 transition-colors mb-4" />
          <p className="text-zinc-300 font-medium mb-1">Drag and drop your image here</p>
          <p className="text-zinc-500 text-sm mb-6">or click to browse from your computer</p>
          
          <button className="px-6 py-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors pointer-events-none">
            Browse Files
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,video/*"
          />
        </div>
      </div>
    </div>
  );
}
