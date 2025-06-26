import { useState } from 'react';
import ExerciseTabs, { EX_TYPES } from './components/ExerciseTabs';
import Timer from './components/Timer';
import History from './components/History';

export default function App() {
  // 現在選択中の種目（初期値 = "plank"）
  const [type, setType] = useState(EX_TYPES[0]);

  // 種目ごとのデフォルト秒数
  const defSec = { plank: 60, squat: 30, pushup: 30 }[type];

  return (
    /* 画面を垂直中央寄せし、最大幅 640px に制限 */
    <main className="h-full flex flex-col justify-center max-w-md mx-auto p-6">
      {/* 白半透明カードにタブとタイマーをまとめる */}
      <section className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6">
        <ExerciseTabs onChange={setType} />
        <Timer type={type} defaultSec={defSec} />
      </section>

      {/* 履歴はカードの外（下）に表示 */}
      <History type={type} />
    </main>
  );
}
