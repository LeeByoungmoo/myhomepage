const Games = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Games</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Interactive experiences coming soon.</p>
      
      <div className="glass-panel" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '4rem', opacity: 0.2, marginBottom: '1rem' }}>🎮</span>
        <h3 style={{ marginBottom: '1rem' }}>No games available yet</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Check back later for new releases.</p>
      </div>
    </div>
  );
};

export default Games;
