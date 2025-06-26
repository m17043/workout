import { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';
import { saveSession } from '../utils/storage';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

/**
 * @param {number} defaultSec  種目別デフォルト秒数
 * @param {"plank"|"squat"|"pushup"} type
 */
export default function Timer({ defaultSec = 60, type }) {
  const [secLeft, setSecLeft] = useState(defaultSec);
  const [running, setRunning] = useState(false);

  /* 種目が変わったらリセット */
  useEffect(() => {
    setSecLeft(defaultSec);
    setRunning(false);
  }, [type, defaultSec]);

  /* 1 秒おきにカウントダウン */
  useInterval(() => {
    setSecLeft((s) => {
      if (s <= 1) {
        setRunning(false);
        saveSession(defaultSec, type);
        return defaultSec;
      }
      return s - 1;
    });
  }, running ? 1000 : null);

  /* プログレス値（％） */
  const pct = (secLeft / defaultSec) * 100;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 円形プログレスリング */}
      <div style={{ width: 500, height: 500 }}>
        <CircularProgressbar
          value={pct}
          text={`${secLeft}s`}
          styles={buildStyles({
            textSize: '10px',
            pathColor: '#4f46e5',
            trailColor: '#e5e7eb',
            textColor: '#1f2937',
          })}
        />
      </div>

      {/* START / STOP ボタン */}
      <button
        onClick={() => setRunning((v) => !v)}
        className={`w-40 px-6 py-3 rounded-xl font-semibold shadow-lg
          ${running ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}
          text-white transition`}
      >
        {running ? 'STOP' : 'START'}
      </button>
    </div>
  );
}
