import { Tab } from '@headlessui/react';
import { useState } from 'react';

export const EX_TYPES = ['plank', 'squat', 'pushup'];
const LABEL = { plank: 'プランク', squat: 'スクワット', pushup: '腕立て' };

export default function ExerciseTabs({ onChange }) {
  const [sel, setSel] = useState(0);

  // タブが切り替わったら親 (App) へ通知
  const handle = (index) => {
    setSel(index);
    onChange(EX_TYPES[index]);
  };

  return (
    <Tab.Group selectedIndex={sel} onChange={handle}>
      <Tab.List className="flex gap-3 mb-6">
        {EX_TYPES.map((t) => (
          <Tab key={t} className={({ selected }) =>
              `px-4 py-1.5 rounded-lg text-sm font-medium 
               ${selected ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            {LABEL[t]}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
