import { Link } from 'react-router-dom';
import echoesImg from '../assets/echoes.jpg';
import isolationImg from '../assets/isolation.jpg';
import womenDiedImg from '../assets/women_died.jpg';
import liquidationImg from '../assets/liquidation_cover.jpg';
import cellDivisionImg from '../assets/cell_division.jpg';
import atmosphericImg from '../assets/atmospheric_pressure.jpg';

const novelsData = [
  { id: 'atmospheric-pressure', title: 'Atmospheric Pressure', chapters: 20, tags: ['Psychological', 'Thriller'], desc: 'A psychological family thriller in a world where everyone is born with destructive physical power.', cover: atmosphericImg },
  { id: 'echoes-of-the-grid', title: 'Echoes of the Grid', chapters: 20, tags: ['Cyberpunk', 'Action'], desc: 'A cyberpunk thriller set in Neo-Seoul.', cover: echoesImg },
  { id: 'isolation', title: 'Isolation: Predator in the Dark', chapters: 20, tags: ['Deep Space', 'Horror'], desc: 'Deep space horror.', cover: isolationImg },
  { id: 'the-day', title: 'The Day the Women Died', chapters: 20, tags: ['Post-Apocalyptic', 'Survival'], desc: 'Post-apocalyptic survival.', cover: womenDiedImg },
  { id: 'liquidation', title: 'Liquidation', chapters: 30, tags: ['Sci-Fi', 'Thriller'], desc: 'A sci-fi action thriller about a futuristic enforcer.', cover: liquidationImg },
  { id: 'cell-division', title: 'Cell Division and the Universe', chapters: 20, tags: ['Sci-Fi', 'Philosophical'], desc: 'A mind-bending sci-fi exploration of consciousness and cosmic evolution.', cover: cellDivisionImg },
];

const Novels = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>Library</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', padding: '2rem' }}>
        {novelsData.map((novel) => (
          <div key={novel.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link to={`/novels/${novel.id}/1`} className="book-container">
              <div className="book">
                <div className="book-cover">
                  <img src={novel.cover} alt={novel.title} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '10% 1REM 15px 1REM', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.8) 100%)', zIndex: 10, justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <h2 style={{ fontSize: '1.5RE', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontFamily: '"Georgia", serif', textShadow: '0 4px 12px rgba(0,0,0,1)', lineHeight: '1.3', background: 'linear-gradient(to bottom, #ffffff, #bbbbbb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {novel.title}
                      </h2>
                      <div style={{ width: '30px', height: '2px', background: 'var(--accent-cyan)', margin: '14px auto 0 auto', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
                    </div>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <p style={{ margin: 0, fontSize: '0.65REM', textTransform: 'uppercase', letterSpacing: '3px', color: '#aaaaaa', textShadow: '0 2px 4px rgba(0,0,0,0.9)', fontFamily: 'sans-serif' }}>Bluemoon393</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{novel.title}</h3>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {novel.tags && novel.tags.map(tag => (
                  <span key={tag} style={{ background: 'var(--bg-secondary)', color: 'var(--accent-cyan)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(0, 255, 204, 0.2)' }}>{tag}</span>
                ))}
              </div>
              <p style={{ color: 'var(--accent-magenta)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{novel.chapters} Chapters</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '250px' }}>{novel.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: '4rem 0', border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}>About the Author | Bluemoon393</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Bluemoon393 is a visionary writer exploring the dark intersections of humanity, technology, and cosmic horror. 
          From the neon-drenched alleys of neo-Seoul to the cold, unforgiving vacuum of deep space, 
          Bluemoon393\'s works dive deep into dystopias, psychological breakdowns, and the unbreakable human spirit. 
          Welcome to the multiverse of shadows.
        </p>
      </div>
    </div>
  );
};

export default Novels;
