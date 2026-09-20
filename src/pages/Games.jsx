import { Link } from 'react-router-dom';

const gamesData = [
  { id: 'rockpaper', title: 'Rock Paper Scissors', desc: 'A classic game of Rock Paper Scissors.', icon: '✌️' },
  { id: 'worldcup', title: 'World Cup', desc: 'Choose your favorites in this bracket-style tournament.', icon: '🏆' },
  { id: 'calc_game', title: 'Calculator Game', desc: 'A brain-teasing number puzzle.', icon: '🧮' },
];

const Games = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>Mini Games</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', padding: '1rem' }}>
        {gamesData.map((game) => (
          <div key={game.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', borderRadius: '16px' }}>
            <div style={{ height: '160px', background: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--glass-border)' }}>
               <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>{game.icon}</span>
            </div>
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{game.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem', flex: 1 }}>{game.desc}</p>
              
              <Link 
                to={`/games/${game.id}`} 
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  background: 'var(--accent-blue)', 
                  color: '#000', 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '30px', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 240, 255, 0.4)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Play Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
