import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';

// Define the maximum chapters for each novel to handle Next button
const NOVELS = {
  'echoes-of-the-grid': { title: 'Echoes of the Grid', chapters: 20 },
  'isolation': { title: 'Isolation: Predator in the Dark', chapters: 20 },
  'the-day': { title: 'The Day the Women Died', chapters: 20 },
  'liquidation': { title: 'Liquidation', chapters: 30 },
};

const Reader = () => {
  const { id, chapter } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(18);
  const [showToast, setShowToast] = useState(false);
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentChapter = parseInt(chapter, 10) || 1;
  const novelInfo = NOVELS[id];
  const maxChapters = novelInfo ? novelInfo.chapters : 0;

  useEffect(() => {
    // Fetch chapter content
    setLoading(true);
    setError(null);
    
    // In production, GitHub Pages might need a base path, but since we are using Vite, 
    // files in public are served at root. However, for GitHub pages we use base path.
    const fetchPath = `${import.meta.env.BASE_URL}novels/${id}/${currentChapter}.txt`;
    
    fetch(fetchPath)
      .then(res => {
        if (!res.ok) throw new Error('Chapter not found');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load chapter content.');
        setLoading(false);
      });
  }, [id, currentChapter]);

  // Restore scroll position on load
  useEffect(() => {
    if (!loading) {
      const savedScroll = localStorage.getItem(`bookmark_${id}_${currentChapter}`);
      if (savedScroll) {
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [id, currentChapter, loading]);

  // Handle manual bookmark save
  const handleBookmark = () => {
    localStorage.setItem(`bookmark_${id}_${currentChapter}`, window.scrollY.toString());
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const goPrev = () => {
    if (currentChapter > 1) {
      navigate(`/novels/${id}/${currentChapter - 1}`);
    }
  };

  const goNext = () => {
    if (currentChapter < maxChapters) {
      navigate(`/novels/${id}/${currentChapter + 1}`);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem 0' }}>
      
      {/* Reader Toolbar */}
      <div className="reader-toolbar">
        <Link to="/novels" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={18} /> Back
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={handleBookmark}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--accent-blue)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontWeight: '600' }}
          >
            <Bookmark size={16} /> Save Position
          </button>
          
          <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)', margin: '0 0.5rem' }}></div>
          
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

      {showToast && (
        <div className="bookmark-toast">
          🔖 Bookmark saved! You can resume from here next time.
        </div>
      )}

      {/* Content Area */}
      <div style={{ padding: '4rem 2rem', fontSize: `${fontSize}px`, lineHeight: '1.8' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading chapter...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'var(--accent-magenta)' }}>{error}</div>
        ) : (
          <>
            <h1 style={{ fontSize: '2.5em', marginBottom: '2rem', textAlign: 'center' }}>
              {novelInfo ? novelInfo.title : 'Novel'} - Chapter {currentChapter}
            </h1>
            
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {content}
            </div>
            
            <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            </div>
            <p style={{ marginBottom: '1.5em', textAlign: 'center', color: 'var(--text-secondary)' }}>
              You have reached the end of the chapter.
            </p>
          </>
        )}
      </div>

      {/* Footer Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0', borderTop: '1px solid var(--glass-border)' }}>
        {currentChapter > 1 ? (
          <button onClick={goPrev} className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', background: 'transparent' }}>
            <ChevronLeft size={18} /> Previous
          </button>
        ) : <div />}
        
        {currentChapter < maxChapters ? (
          <button onClick={goNext} className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'white', background: 'var(--glass-bg)' }}>
            Next <ChevronRight size={18} />
          </button>
        ) : <div />}
      </div>

    </div>
  );
};

export default Reader;
