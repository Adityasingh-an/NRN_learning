import { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export const useChat = () => {
  const { pitch, speed, voiceURI } = useAppContext();
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your NRN AI Tutor. What would you like to learn today?", sender: 'ai' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMode, setSpeakingMode] = useState(null); // 'audio' | 'video' | null
  const [speakingText, setSpeakingText] = useState("");

  // Manual Trigger to Play the Explanation
  const playExplanation = useCallback((text, mode = 'video') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      let cleanText = text.replace(/[*_#`\[\]()]/g, '');
      cleanText = cleanText.replace(/\*\*/g, '').replace(/-/g, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.pitch = pitch;
      utterance.rate = speed;
      
      if (voiceURI) {
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(v => v.voiceURI === voiceURI);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      utterance.onstart = () => {
        setSpeakingMode(mode);
        setSpeakingText(text); // We keep the original text so markdown works in the modal
      };
      
      utterance.onend = () => {
        setSpeakingMode(null);
        setSpeakingText("");
      };
      
      utterance.onerror = () => {
        setSpeakingMode(null);
        setSpeakingText("");
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }, [pitch, speed, voiceURI]);

  // Instantly Stop TTS
  const stopExplanation = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMode(null);
    setSpeakingText("");
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        let errorDetail = 'Network response was not ok';
        try {
          const errData = await response.json();
          errorDetail = errData.detail || errorDetail;
        } catch (e) {}
        throw new Error(errorDetail);
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: data.reply, sender: 'ai' }
      ]);
      
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      let displayError = "Sorry! My backend server is currently disconnected.";
      if (error.message !== 'Failed to fetch') {
         displayError = `API Error: ${error.message}`;
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: displayError, sender: 'ai' }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return {
    messages,
    isTyping,
    speakingMode,
    speakingText,
    sendMessage,
    playExplanation,
    stopExplanation
  };
};
