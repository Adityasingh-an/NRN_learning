import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Voice Settings State
  const [pitch, setPitch] = useState(1.5);
  const [speed, setSpeed] = useState(0.85);
  const [voiceURI, setVoiceURI] = useState('');

  return (
    <AppContext.Provider value={{ 
      sidebarOpen, setSidebarOpen,
      pitch, setPitch, 
      speed, setSpeed, 
      voiceURI, setVoiceURI 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
