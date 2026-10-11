// Reading / Views statistics management

const BASE_STATS = {
  'cell-division': { total: 1240, today: 48 },
  'atmospheric-pressure': { total: 820, today: 31 },
  'echoes-of-the-grid': { total: 950, today: 39 },
  'isolation': { total: 710, today: 24 },
  'the-day': { total: 630, today: 19 },
  'liquidation': { total: 1110, today: 42 },
};

const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const getNovelStats = (novelId) => {
  const todayKey = getTodayKey();
  const base = BASE_STATS[novelId] || { total: 500, today: 20 };

  const storedTotalAdd = parseInt(localStorage.getItem(`novel_reads_total_${novelId}`) || '0', 10);

  const lastDate = localStorage.getItem(`novel_reads_date_${novelId}`);
  let storedTodayAdd = 0;
  if (lastDate === todayKey) {
    storedTodayAdd = parseInt(localStorage.getItem(`novel_reads_today_${novelId}`) || '0', 10);
  }

  return {
    total: base.total + storedTotalAdd,
    today: base.today + storedTodayAdd,
  };
};

export const recordNovelRead = (novelId) => {
  if (!novelId) return;
  const todayKey = getTodayKey();

  // Total increment
  const currentTotalAdd = parseInt(localStorage.getItem(`novel_reads_total_${novelId}`) || '0', 10);
  localStorage.setItem(`novel_reads_total_${novelId}`, (currentTotalAdd + 1).toString());

  // Today increment
  const lastDate = localStorage.getItem(`novel_reads_date_${novelId}`);
  let currentTodayAdd = 0;
  if (lastDate === todayKey) {
    currentTodayAdd = parseInt(localStorage.getItem(`novel_reads_today_${novelId}`) || '0', 10);
  } else {
    localStorage.setItem(`novel_reads_date_${novelId}`, todayKey);
  }
  localStorage.setItem(`novel_reads_today_${novelId}`, (currentTodayAdd + 1).toString());
};
