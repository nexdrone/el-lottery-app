'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [prize, setPrize] = useState<{ rank: string } | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setPrize(null);

    setTimeout(async () => {
      const response = await fetch('/api/lottery');
      const data = await response.json();
      setPrize(data);
      setLoading(false);
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Lottery</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Spinning...' : 'Spin the Wheel!'}
      </button>
      {prize && (
        <div>
          <h2>Congratulations!</h2>
          <p>You won: {prize.rank}</p>
        </div>
      )}
    </div>
  );
}
