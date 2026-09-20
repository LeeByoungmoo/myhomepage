import { Link } from 'react-router-dom';

const novelsData = [
  { id: 'echoes-of-the-grid', title: 'Echoes of the Grid', chapters: 20, desc: 'A cyberpunk thriller set in Neo-Seoul.', cover: '/src/assets/echoes.jpg' },
  { id: 'isolation', title: 'Isolation: Predator in the Dark', chapters: 20, desc: 'Deep space horror.', cover: '/src/assets/isolation.jpg' },
  { id: 'the-day', title: 'The Day the Women Died', chapters: 20, desc: 'Post-apocalyptic survival.', cover: '/src/assets/women_died.jpg' },
];

const Novels = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>Library</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', padding: '2rem' }}>
        {novelsData.map((novel) => (
          <div key={novel.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link to={`/novels/${novel.id}`} className="book-container">
              <div className="book">
                <div className="book-cover">
                  <img src={novel.cover} alt={novel.title} />
                </div>
              </div>
            </Link>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{novel.title}</h3>
              <p style={{ color: 'var(--accent-magenta)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{novel.chapters} Chapters</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '250px' }}>{novel.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Novels;
