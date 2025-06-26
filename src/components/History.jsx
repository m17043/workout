import { loadSessions } from '../utils/storage';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale);

export default function History({ type }) {
  // 履歴を種目でフィルタ & 最新 7 日に集計
  const data = useMemo(() => {
    const target = loadSessions().filter((s) => s.type === type);

    const map = new Map();   // date → 合計秒数
    target.forEach((s) => {
      const d = s.date.slice(0, 10); // YYYY-MM-DD
      map.set(d, (map.get(d) ?? 0) + s.duration);
    });

    // 最新順に 7 件だけ取り出し
    const arr = [...map.entries()].sort().slice(-7);
    return {
      labels: arr.map(([d]) => d),
      datasets: [{
        label: '秒数',
        data: arr.map(([, v]) => v),
      }],
    };
  }, [type]);

  return (
    <section className="w-full mt-8">
      <h2 className="font-bold mb-4">履歴（{type}）</h2>
      {data.labels.length === 0
        ? <p className="text-sm text-gray-500">まだ記録がありません</p>
        : <Bar data={data} />}
    </section>
  );
}
