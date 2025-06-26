import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { Armchair, Accessibility, Dumbbell } from 'lucide-react'; // ← アイコン

export const EX_TYPES = ['plank', 'squat', 'pushup'];

/* ラベルとアイコンをまとめて持つ */
const META = {
  plank:  { label: 'プランク', icon: <Armchair size={16}/>     },
  squat:  { label: 'スクワット', icon: <Accessibility size={16}/> },
  pushup: { label: '腕立て',   icon: <Dumbbell size={16}/>     },
};

export default function ExerciseTabs({ onChange }) {
  const [sel, setSel] = useState(0);

  /* タブ切替時に親へ通知 */
  const handle = (i) => { setSel(i); onChange(EX_TYPES[i]); };

  return (
    <Tab.Group selectedIndex={sel} onChange={handle}>
      <Tab.List className="flex gap-3 mb-6">
        {EX_TYPES.map((t) => (
          <Tab key={t}
            className={({ selected }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
               transition
               ${selected
                 ? 'bg-indigo-600 text-white'
                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {META[t].icon}
            {META[t].label}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
