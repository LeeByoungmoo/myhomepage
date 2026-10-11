import { Link } from 'react-router-dom';
import { Eye, Calendar, Mail } from 'lucide-react';
import echoesImg from '../assets/echoes.jpg';
import isolationImg from '../assets/isolation.jpg';
import womenDiedImg from '../assets/women_died.jpg';
import liquidationImg from '../assets/liquidation_cover.jpg';
import cellDivisionImg from '../assets/cell_division.jpg';
import atmosphericImg from '../assets/atmospheric_pressure.jpg';
import { getNovelStats } from '../utils/stats';

const novelsData = [
  { id: 'atmospheric-pressure', title: 'Pressure', chapters: 20, tags: ['Psychological Thriller', 'Supernatural'], desc: 'Mornings in the family home begin by weighing the air. A tense psychological thriller in a world where emotion carries lethal physical weight.', cover: atmosphericImg },
  { id: 'echoes-of-the-grid', title: 'Memories of the Blade', chapters: 20, tags: ['Historical Fantasy', 'Action', 'Literary'], desc: 'An ancient bronze blade carries the memories and spirits of its past wielders across two thousand years of Korean and Eurasian history.', cover: echoesImg },
  { id: 'isolation', title: 'Isolation: Predator in the Dark', chapters: 20, tags: ['Psychological Thriller', 'Death Game'], desc: 'Four strangers wake in a pitch-black stone ruin beneath the city subway. One of them is a predator — and she is not the only hunter in the dark.', cover: isolationImg },
  { id: 'the-day', title: 'The Day the Women Died', chapters: 20, tags: ['Post-Apocalyptic', 'Survival', 'Mystery'], desc: 'One morning, every woman on Earth ceases to breathe. In a world plunged into sudden collapse, the survivors must confront what remains.', cover: womenDiedImg },
  { id: 'liquidation', title: 'Liquidation', chapters: 30, tags: ['Dark Satire', 'Survival', 'Dystopian'], desc: 'After ten years in a luxury doomsday bunker, the hundred richest people on Earth step out into a wild Manhattan. Their money is worthless. Their instincts are not.', cover: liquidationImg },
  { id: 'cell-division', title: 'Cell Division and the Universe', chapters: 20, tags: ['Hard Sci-Fi', 'Cosmic Mystery'], desc: 'A mind-bending hard sci-fi thriller following an MIT quantum biologist as the fabric of reality itself begins to duplicate and divide.', cover: cellDivisionImg },
];

const Novels = () => {
  // 전체 누적 및 오늘 총합 계산
  const novelsWithStats = novelsData.map((novel) => {
    const stats = getNovelStats(novel.id);
    return { ...novel, stats };
  });

  const totalAllReads = novelsWithStats.reduce((acc, cur) => acc + cur.stats.total, 0);
  const totalTodayReads = novelsWithStats.reduce((acc, cur) => acc + cur.stats.today, 0);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>Library</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.5rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Eye size={15} color="var(--accent-blue)" /> Total Reads <strong style={{ color: '#ffffff' }}>{totalAllReads.toLocaleString()}</strong>
          </span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00ffaa' }}>
            <Calendar size={15} /> Today's Reads <strong>{totalTodayReads.toLocaleString()}</strong>
          </span>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', padding: '2rem' }}>
        {novelsWithStats.map((novel) => (
          <div key={novel.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link to={`/novels/${novel.id}/1`} className="book-container">
              <div className="book">
                <div className="book-cover">
                  <img src={novel.cover} alt={novel.title} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '10% 1rem 15px 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.8) 100%)', zIndex: 10, justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontFamily: '"Georgia", serif', textShadow: '0 4px 12px rgba(0,0,0,1)', lineHeight: '1.3', background: 'linear-gradient(to bottom, #ffffff, #bbbbbb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {novel.title}
                      </h2>
                      <div style={{ width: '30px', height: '2px', background: 'var(--accent-cyan, #00f0ff)', margin: '14px auto 0 auto', boxShadow: '0 0 10px var(--accent-cyan, #00f0ff)' }}></div>
                    </div>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <p style={{ margin: 0, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#aaaaaa', textShadow: '0 2px 4px rgba(0,0,0,0.9)', fontFamily: 'sans-serif' }}>Bluemoon393</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{novel.title}</h3>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {novel.tags && novel.tags.map(tag => (
                  <span key={tag} style={{ background: 'var(--bg-secondary, rgba(255,255,255,0.05))', color: 'var(--accent-cyan, #00f0ff)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(0, 255, 204, 0.2)' }}>{tag}</span>
                ))}
              </div>
              
              {/* Novel view statistics */}
              <div style={{ display: 'inline-flex', gap: '0.8rem', justifyContent: 'center', alignItems: 'center', margin: '0.4rem 0 0.6rem 0', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.25rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#00f0ff' }}>
                  <Eye size={13} /> {novel.stats.total.toLocaleString()} Reads
                </span>
                <span style={{ opacity: 0.3 }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#00ffaa' }}>
                  <Calendar size={13} /> {novel.stats.today.toLocaleString()} Today
                </span>
              </div>

              <p style={{ color: 'var(--accent-magenta)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{novel.chapters} Chapters</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '250px' }}>{novel.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: '4rem 0', border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem', textAlign: 'center', background: 'var(--bg-secondary, rgba(255,255,255,0.03))', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-cyan, #00f0ff)' }}>About the Author | Bluemoon393</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Bluemoon393 is a visionary storyteller exploring the dark intersections of humanity, psychological suspense, and cosmic mystery. 
          From the deep ruins buried beneath city streets to ancient dynasties and post-apocalyptic survival, 
          Bluemoon393's works dive deep into high-tension thrillers, existential fractures, and the unbreakable human spirit. 
          Welcome to the multiverse of stories.
        </p>

        {/* 저자 이메일 문의 배지 */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <a 
            href="mailto:leebyoungmoo@gmail.com" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              padding: '0.75rem 1.6rem', 
              background: 'rgba(0, 240, 255, 0.08)', 
              border: '1px solid #00f0ff', 
              borderRadius: '30px', 
              color: '#ffffff', 
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <Mail size={18} color="#00f0ff" />
            <span>Author Contact: <strong style={{ color: '#00f0ff' }}>leebyoungmoo@gmail.com</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Novels;
