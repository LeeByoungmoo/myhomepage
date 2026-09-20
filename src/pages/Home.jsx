import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Explore the <span className="text-gradient">Unknown</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          Immerse yourself in dark, thrilling cyber-fiction and interactive experiences. 
          Discover a new world of storytelling.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/novels" className="glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
            Read Novels
          </Link>
          <Link to="/games" className="glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-blue)', color: '#000', fontWeight: '600' }}>
            Play Games <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Novels Placeholder */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <h2>Latest Chapters</h2>
          <Link to="/novels" style={{ color: 'var(--accent-magenta)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.9rem' }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map((item) => (
            <div key={item} className="glass-panel" style={{ padding: '2rem', transition: 'transform 0.3s' }} 
                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <h3 style={{ marginBottom: '1rem' }}>Echoes of the Grid</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Episode {item}: A dark descent into the neon-lit underbelly of Neo-Seoul...
              </p>
              <Link to={`/novels/echoes-${item}`} className="text-gradient" style={{ fontWeight: '600' }}>Read Chapter</Link>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default Home;
