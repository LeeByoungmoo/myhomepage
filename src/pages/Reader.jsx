import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Reader = () => {
  const { id } = useParams();
  const [fontSize, setFontSize] = useState(18);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem 0' }}>
      
      {/* Reader Toolbar */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 10 }}>
        <Link to="/novels" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={18} /> Back
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setFontSize(f => Math.max(14, f - 2))}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
          >A-</button>
          <button 
            onClick={() => setFontSize(f => Math.min(26, f + 2))}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
          >A+</button>
          <Settings size={18} style={{ color: 'var(--text-secondary)', marginLeft: '1rem' }} />
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '4rem 2rem', fontSize: `${fontSize}px`, lineHeight: '1.8' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '2rem', textAlign: 'center' }}>Chapter 1</h1>
        <p style={{ marginBottom: '1.5em' }}>
          The heavy metallic thud of boots echoed against the pavement. The city of Neo-Seoul was weeping acid rain, washing away the neon reflections that stained the streets.
        </p>
        <p style={{ marginBottom: '1.5em' }}>
          This is a placeholder for the immersive reading experience. Later, we can connect this to Markdown files or a CMS. The reader features adjustable font sizes and a distraction-free dark mode layout.
        </p>
        <p style={{ marginBottom: '1.5em' }}>
          Enjoy the seamless reading experience built perfectly for long-form fiction.
        </p>
      </div>

      {/* Footer Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0', borderTop: '1px solid var(--glass-border)' }}>
        <button className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', background: 'transparent' }}>
          <ChevronLeft size={18} /> Previous
        </button>
        <button className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'white', background: 'var(--glass-bg)' }}>
          Next <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default Reader;
