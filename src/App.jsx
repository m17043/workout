import { useState } from 'react';
import ExerciseTabs, { EX_TYPES } from './components/ExerciseTabs';
import Timer from './components/Timer';
import History from './components/History';

export default function App() {
  const [type, setType] = useState(EX_TYPES[0]);   // "plank"

  const defSec = { plank: 60, squat: 30, pushup: 30 }[type];

  return (
    <main className="max-w-md mx-auto p-6">
      <ExerciseTabs onChange={setType} />
      <Timer type={type} defaultSec={defSec} />
      <History type={type} />
    </main>
  );
}
