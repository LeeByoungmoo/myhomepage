import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';

const gamesMap = {
  'rockpaper': { title: 'Rock Paper Scissors', path: '/myhomepage/games/rockpaper/index.html' },
  'worldcup': { title: 'World Cup', path: '/myhomepage/games/worldcup/index.html' },
  'calc_game': { title: 'Calculator Game', path: '/myhomepage/games/calc_game/index.html' },
};

const GamePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const game = gamesMap[id];

  if (!game) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Game not found</h2>
        <button onClick={() => navigate('/games')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--accent-blue)', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
          Back to Games
        </button>
      </div>
    );
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="animate-fade-in" style={
      isFullscreen 
        ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: '#000', display: 'flex', flexDirection: 'column' }
        : { maxWidth: '1000px', margin: '0 auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }
    }>
      
      {/* Game Toolbar */}
      <div className="reader-toolbar" style={{ borderRadius: isFullscreen ? '0' : '12px 12px 0 0', padding: '1rem 1.5rem' }}>
        <Link to="/games" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={18} /> Back
        </Link>
        
        <h3 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', margin: 0 }}>
          {game.title}
        </h3>

        <button 
          onClick={toggleFullscreen}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          <span style={{ fontSize: '0.9rem' }}>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
        </button>
      </div>

      {/* Iframe Container */}
      <div style={{ flex: 1, background: '#111', borderRadius: isFullscreen ? '0' : '0 0 12px 12px', overflow: 'hidden', border: isFullscreen ? 'none' : '1px solid var(--glass-border)', borderTop: 'none' }}>
        <iframe 
          src={game.path} 
          style={{ width: '100%', height: '100%', border: 'none' }}
          title={game.title}
          allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

    </div>
  );
};

export default GamePlayer;
