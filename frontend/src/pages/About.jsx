import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-primary)' }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 mb-20">
        <div className="mb-12 border-b pb-6" style={{ borderColor: 'var(--secondary-bg-color)' }}>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">About NRN Smart Learning</h1>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We are redefining educational paradigms by merging advanced autonomous AI with structured, scalable course architecture. Our platform bridges the gap between static text and interactive, real-time learning.
          </p>
        </div>

        {/* Official Video Section - Using local aboutNRN.mp4 */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-3xl aspect-video rounded-3xl relative overflow-hidden border shadow-2xl" style={{ backgroundColor: 'var(--secondary-bg-color)', borderColor: 'rgba(255,255,255,0.05)' }}>
            <video 
              className="w-full h-full object-contain" 
              controls 
              poster="/assets/logo.png"
            >
              <source src="/assets/AboutNRN.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              NRN Smart Learning is built on a custom python-driven backend logic and an expansive React front-end, entirely orchestrated to ensure students have zero-latency access to the most powerful AI tutoring engines in the world. 
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">The Architecture</h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              From hashed SQL databases routing secure NRN IDs, to a dynamically generated video-illusion rendering engine, NRN isn't just an educational tool; it's a structural software marvel built meticulously component by component.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
