import { useState, useEffect } from 'react';

// Card definitions (simplified representation based on 52 cards)
const CARDS = [
  // January - Pine
  { id: '1_0', month: 1, type: '광', name: '송학 광' },
  { id: '1_1', month: 1, type: '홍단', name: '송학 홍단' },
  { id: '1_2', month: 1, type: '피', name: '송학 피 1' },
  { id: '1_3', month: 1, type: '피', name: '송학 피 2' },
  // February - Plum
  { id: '2_0', month: 2, type: '열끗', name: '매화 열끗' },
  { id: '2_1', month: 2, type: '홍단', name: '매화 홍단' },
  { id: '2_2', month: 2, type: '피', name: '매화 피 1' },
  { id: '2_3', month: 2, type: '피', name: '매화 피 2' },
  // March - Cherry
  { id: '3_0', month: 3, type: '광', name: '벚꽃 광' },
  { id: '3_1', month: 3, type: '홍단', name: '벚꽃 홍단' },
  { id: '3_2', month: 3, type: '피', name: '벚꽃 피 1' },
  { id: '3_3', month: 3, type: '피', name: '벚꽃 피 2' },
  // April - Wisteria
  { id: '4_0', month: 4, type: '열끗', name: '흑싸리 열끗' },
  { id: '4_1', month: 4, type: '초단', name: '흑싸리 초단' },
  { id: '4_2', month: 4, type: '피', name: '흑싸리 피 1' },
  { id: '4_3', month: 4, type: '피', name: '흑싸리 피 2' },
  // May - Iris
  { id: '5_0', month: 5, type: '열끗', name: '난초 열끗' },
  { id: '5_1', month: 5, type: '초단', name: '난초 초단' },
  { id: '5_2', month: 5, type: '피', name: '난초 피 1' },
  { id: '5_3', month: 5, type: '피', name: '난초 피 2' },
  // June - Peony
  { id: '6_0', month: 6, type: '열끗', name: '모란 열끗' },
  { id: '6_1', month: 6, type: '청단', name: '모란 청단' },
  { id: '6_2', month: 6, type: '피', name: '모란 피 1' },
  { id: '6_3', month: 6, type: '피', name: '모란 피 2' },
  // July - Bush Clover
  { id: '7_0', month: 7, type: '열끗', name: '홍싸리 열끗' },
  { id: '7_1', month: 7, type: '초단', name: '홍싸리 초단' },
  { id: '7_2', month: 7, type: '피', name: '홍싸리 피 1' },
  { id: '7_3', month: 7, type: '피', name: '홍싸리 피 2' },
  // August - Moon
  { id: '8_0', month: 8, type: '광', name: '공산 광' },
  { id: '8_1', month: 8, type: '열끗', name: '공산 열끗' },
  { id: '8_2', month: 8, type: '피', name: '공산 피 1' },
  { id: '8_3', month: 8, type: '피', name: '공산 피 2' },
  // September - Chrysanthemum
  { id: '9_0', month: 9, type: '쌍피', name: '국진 쌍피' },
  { id: '9_1', month: 9, type: '청단', name: '국진 청단' },
  { id: '9_2', month: 9, type: '피', name: '국진 피 1' },
  { id: '9_3', month: 9, type: '피', name: '국진 피 2' },
  // October - Maple
  { id: '10_0', month: 10, type: '열끗', name: '단풍 열끗' },
  { id: '10_1', month: 10, type: '청단', name: '단풍 청단' },
  { id: '10_2', month: 10, type: '피', name: '단풍 피 1' },
  { id: '10_3', month: 10, type: '피', name: '단풍 피 2' },
  // November - Paulownia
  { id: '11_0', month: 11, type: '광', name: '오동 광' },
  { id: '11_1', month: 11, type: '쌍피', name: '오동 쌍피' },
  { id: '11_2', month: 11, type: '피', name: '오동 피 1' },
  { id: '11_3', month: 11, type: '피', name: '오동 피 2' },
  // December - Rain
  { id: '12_0', month: 12, type: '광', name: '비 광' },
  { id: '12_1', month: 12, type: '열끗', name: '비 열끗' },
  { id: '12_2', month: 12, type: '띠', name: '비 띠' },
  { id: '12_3', month: 12, type: '쌍피', name: '비 쌍피' },
];

const calculateScore = (inventory) => {
  let score = 0;
  const yakus = [];
  
  let kwangCount = 0;
  let hasBiKwang = false;
  let yeolCount = 0;
  let yeolMonths = [];
  let ttiCount = 0;
  let ttiMonths = [];
  let piCount = 0;

  inventory.forEach(c => {
    if (c.id === '9_0' || c.id === '11_1' || c.id === '12_3' || c.type === '쌍피') {
      piCount += 2;
    } else if (c.type === '광') {
      kwangCount++;
      if (c.month === 12) hasBiKwang = true;
    } else if (c.type === '열끗') {
      yeolCount++; yeolMonths.push(c.month);
    } else if (c.type === '홍단' || c.type === '청단' || c.type === '초단' || c.type === '띠') {
      ttiCount++; ttiMonths.push(c.month);
    } else {
      piCount++;
    }
  });

  // Kwang
  if (kwangCount === 5) { score += 15; yakus.push("오광 (+15)"); }
  else if (kwangCount === 4) { score += 4; yakus.push("사광 (+4)"); }
  else if (kwangCount === 3) {
    if (hasBiKwang) { score += 2; yakus.push("비삼광 (+2)"); }
    else { score += 3; yakus.push("삼광 (+3)"); }
  }

  // Yeol
  if (yeolCount >= 5) { score += (yeolCount - 4); yakus.push(`열끗 ${yeolCount}장`); }
  if (yeolMonths.includes(2) && yeolMonths.includes(4) && yeolMonths.includes(8)) {
    score += 5; yakus.push("고도리 (+5)");
  }

  // Tti
  if (ttiCount >= 5) { score += (ttiCount - 4); yakus.push(`띠 ${ttiCount}장`); }
  if (ttiMonths.includes(1) && ttiMonths.includes(2) && ttiMonths.includes(3)) { score += 3; yakus.push("홍단 (+3)"); }
  if (ttiMonths.includes(6) && ttiMonths.includes(9) && ttiMonths.includes(10)) { score += 3; yakus.push("청단 (+3)"); }
  if (ttiMonths.includes(4) && ttiMonths.includes(5) && ttiMonths.includes(7)) { score += 3; yakus.push("초단 (+3)"); }

  // Pi
  if (piCount >= 10) {
    score += (piCount - 9); yakus.push(`피 ${piCount}장`);
  }

  return { score, yakus };
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const HwatuWeb = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [collected, setCollected] = useState([]);
  const [result, setResult] = useState({ score: 0, yakus: [] });

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = shuffle([...CARDS]);
    setHand(newDeck.splice(0, 10)); // Draw 10 cards for hand
    setDeck(newDeck);
    setCollected([]);
    setResult({ score: 0, yakus: [] });
  };

  const playCard = (card) => {
    const newHand = hand.filter(c => c.id !== card.id);
    const newCollected = [...collected, card];
    
    setHand(newHand);
    setCollected(newCollected);
    setResult(calculateScore(newCollected));
  };

  const getImagePath = (id) => {
    return `/myhomepage/games/hwatugame/assets/images/${id.toUpperCase()}.PNG`;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', background: '#224', minHeight: '100vh', borderRadius: '12px', color: '#fff', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Hwatu Score Simulator (Web Version)</h2>
      
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'space-between', flexDirection: 'column' }}>
        
        {/* Top Side: Hand */}
        <div style={{ flex: 1 }}>
          <h3>Your Hand (Click to play and calculate score)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '1rem', background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
            {hand.map(card => (
              <div 
                key={card.id} 
                onClick={() => playCard(card)}
                style={{ cursor: 'pointer', transition: 'transform 0.1s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
              >
                <img src={getImagePath(card.id)} alt={card.name} style={{ width: '60px', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.5)' }} onError={(e) => { e.target.src = '/myhomepage/games/hwatugame/assets/images/back.png' }} />
              </div>
            ))}
            {hand.length === 0 && <p style={{ color: '#aaa', margin: 0, padding: '1rem' }}>No cards left.</p>}
          </div>
          {hand.length === 0 && (
            <button onClick={startNewGame} style={{ marginTop: '1rem', padding: '10px 20px', background: '#f5a623', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Reset Hand
            </button>
          )}
        </div>

        {/* Bottom Side: Collected & Score */}
        <div style={{ flex: 1 }}>
          <h3>Collected Cards</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '1rem', minHeight: '120px', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
            {collected.map(card => (
              <img key={card.id} src={getImagePath(card.id)} alt={card.name} style={{ width: '50px', borderRadius: '2px' }} onError={(e) => { e.target.src = '/myhomepage/games/hwatugame/assets/images/back.png' }} />
            ))}
            {collected.length === 0 && <p style={{ color: '#aaa', margin: 0, padding: '1rem' }}>Click cards above to collect them.</p>}
          </div>

          <div style={{ marginTop: '2rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px' }}>
            <h2 style={{ color: '#0f0', margin: '0 0 1rem 0' }}>Score: {result.score}</h2>
            <ul style={{ paddingLeft: '1rem', margin: 0, lineHeight: '1.8' }}>
              {result.yakus.map((yaku, idx) => (
                <li key={idx}>{yaku}</li>
              ))}
            </ul>
            {result.yakus.length === 0 && <p style={{ color: '#aaa', margin: 0 }}>No points yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HwatuWeb;
