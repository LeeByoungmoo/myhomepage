import { Link } from 'react-router-dom';

const novelsData = [
  { id: 'echoes-of-the-grid', title: 'Echoes of the Grid', chapters: 20, desc: 'A cyberpunk thriller set in Neo-Seoul.' },
  { id: 'isolation', title: 'Isolation: Predator in the Dark', chapters: 20, desc: 'Deep space horror.' },
  { id: 'the-day', title: 'The Day the Women Died', chapters: 20, desc: 'Post-apocalyptic survival.' },
];

const Novels = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Library</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {novelsData.map((novel) => (
          <div key={novel.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '150px', background: 'var(--glass-bg)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ opacity: 0.3, fontSize: '3rem' }}>📖</span>
            </div>
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{novel.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>{novel.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-magenta)' }}>{novel.chapters} Chapters</span>
                <Link to={`/novels/${novel.id}`} className="glass-panel" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Read Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Novels;
