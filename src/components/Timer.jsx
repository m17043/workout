import { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';
import { saveSession } from '../utils/storage';

/**
 * @param {number} defaultSec  種目別デフォルト秒数
 * @param {"plank"|"squat"|"pushup"} type
 */
export default function Timer({ defaultSec = 60, type }) {
  const [secLeft, setSecLeft] = useState(defaultSec);
  const [running, setRunning] = useState(false);

  // 種目が変わったらタイマーをリセット
  useEffect(() => {
    setSecLeft(defaultSec);
    setRunning(false);
  }, [type, defaultSec]);

  // 1 秒おきに残り秒数を減らす
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

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-7xl font-bold tabular-nums">{secLeft}</span>
      <button
        onClick={() => setRunning((v) => !v)}
        className="px-6 py-2 rounded-lg bg-indigo-600 text-white"
      >
        {running ? 'STOP' : 'START'}
      </button>
    </div>
  );
}
