import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, ChevronLeft, ChevronRight, Bookmark, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { recordNovelRead } from '../utils/stats';
import NovelContent from '../components/NovelContent';

// Define the maximum chapters for each novel to handle Next button
const NOVELS = {
  'echoes-of-the-grid': { title: 'Memories of the Blade', chapters: 20 },
  'isolation': { title: 'Isolation: Predator in the Dark', chapters: 20 },
  'the-day': { title: 'The Day the Women Died', chapters: 20 },
  'liquidation': { title: 'Liquidation', chapters: 30 },
  'atmospheric-pressure': { title: 'Pressure', chapters: 20 },
  'cell-division': { title: 'Cell Division and the Universe', chapters: 20 },
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
    // Record read statistics
    if (id) {
      recordNovelRead(id);
    }

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
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem 0', position: 'relative' }}>
      
      {/* Floating Side Navigation */}
      {currentChapter > 1 && (
        <button
          onClick={goPrev}
          title={`Previous Chapter (Ch. ${currentChapter - 1})`}
          className="floating-nav-btn floating-prev"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {currentChapter < maxChapters && (
        <button
          onClick={goNext}
          title={`Next Chapter (Ch. ${currentChapter + 1})`}
          className="floating-nav-btn floating-next"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Reader Toolbar (Sticky Header) */}
      <div className="reader-toolbar">
        {/* Left: Back button & Novel Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Link to="/novels" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Library
          </Link>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: '600', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {novelInfo ? novelInfo.title : 'Novel'}
          </span>
        </div>

        {/* Center: Previous / Chapter Counter / Next */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={goPrev}
            disabled={currentChapter <= 1}
            title="Previous Chapter"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.4rem 0.75rem',
              background: currentChapter > 1 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: currentChapter > 1 ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
              cursor: currentChapter > 1 ? 'pointer' : 'not-allowed',
              fontWeight: '600',
              fontSize: '0.82rem',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <span style={{ fontSize: '0.88rem', color: 'var(--accent-blue)', fontWeight: '700', padding: '0 0.5rem', minWidth: '60px', textAlign: 'center' }}>
            Ch. {currentChapter} / {maxChapters}
          </span>

          <button
            onClick={goNext}
            disabled={currentChapter >= maxChapters}
            title="Next Chapter"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.4rem 0.75rem',
              background: currentChapter < maxChapters ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.02)',
              border: 'none',
              borderRadius: '8px',
              color: currentChapter < maxChapters ? '#050508' : 'rgba(255, 255, 255, 0.25)',
              cursor: currentChapter < maxChapters ? 'pointer' : 'not-allowed',
              fontWeight: '700',
              fontSize: '0.82rem',
              boxShadow: currentChapter < maxChapters ? '0 0 12px rgba(0, 240, 255, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        {/* Right: Bookmark & Font Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button 
            onClick={handleBookmark}
            title="Save reading position"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--accent-blue)', padding: '0.4rem 0.8rem', borderRadius: '16px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' }}
          >
            <Bookmark size={14} /> Bookmark
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '8px' }}>
            <button 
              onClick={() => setFontSize(f => Math.max(14, f - 2))}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.9rem', padding: '0 0.3rem' }}
              title="Decrease font size"
            >A-</button>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{fontSize}</span>
            <button 
              onClick={() => setFontSize(f => Math.min(26, f + 2))}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.9rem', padding: '0 0.3rem' }}
              title="Increase font size"
            >A+</button>
          </div>
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
            
            <NovelContent rawText={content} />
            
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
